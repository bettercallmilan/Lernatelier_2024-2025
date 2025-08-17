from flask import Flask, render_template, request, jsonify, redirect, url_for, session, flash, current_app
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from datetime import datetime, timedelta
import os
import pymongo
from dotenv import load_dotenv
from auth import auth_bp, login_required
from werkzeug.security import generate_password_hash, check_password_hash

load_dotenv()

app = Flask(__name__)

app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(days=7)

mongo = PyMongo(app)

app.register_blueprint(auth_bp)

@app.before_request
def before_request():
    current_app.mongo = mongo

def get_current_user_id():
    return session.get('user_id', None)

# main page
@app.route('/')
def index():
    if not get_current_user_id():
        return redirect(url_for('auth.login'))
    return render_template('index.html', username=session.get('username'))

# show all tasks
@app.route('/tasks')
@login_required
def list_tasks():
    tasks = list(mongo.db.tasks.find({}).sort("due_date", 1))
    return render_template('tasks.html', tasks=tasks, username=session.get('username'))

# create task
@app.route('/tasks/create', methods=['POST'])
@login_required
def create_task():
    task = {
        "title": request.form.get('title'),
        "description": request.form.get('description', ''),
        "due_date": request.form.get('due_date'),
        "priority": request.form.get('priority', 'medium'),
        "completed": False,
        "created_by": get_current_user_id(),
        "created_by_username": session.get('username'),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    task_id = mongo.db.tasks.insert_one(task).inserted_id
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        task['_id'] = str(task_id)
        return jsonify({"success": True, "task": task})
    
    return redirect(url_for('list_tasks'))

# show task details
@app.route('/tasks/<task_id>')
@login_required
def get_task(task_id):
    task = mongo.db.tasks.find_one({"_id": ObjectId(task_id)})
    
    if not task:
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({"success": False, "error": "Aufgabe nicht gefunden"}), 404
        return redirect(url_for('list_tasks'))
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        task['_id'] = str(task['_id'])
        return jsonify({"success": True, "task": task})
    
    return render_template('task_detail.html', task=task)

# update task
@app.route('/tasks/<task_id>/update', methods=['POST'])
@login_required
def update_task(task_id):
    update_data = {
        "title": request.form.get('title'),
        "description": request.form.get('description'),
        "due_date": request.form.get('due_date'),
        "priority": request.form.get('priority'),
        "updated_at": datetime.now(),
        "last_updated_by": get_current_user_id(),
        "last_updated_by_username": session.get('username')
    }
    
    update_data = {k: v for k, v in update_data.items() if v is not None}
    
    result = mongo.db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": update_data}
    )
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if result.modified_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Aufgabe konnte nicht aktualisiert werden"}), 400
    
    return redirect(url_for('list_tasks'))

# toggle task status
@app.route('/tasks/<task_id>/toggle', methods=['POST'])
@login_required
def toggle_task(task_id):
    task = mongo.db.tasks.find_one({"_id": ObjectId(task_id)})
    
    if not task:
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({"success": False, "error": "Aufgabe nicht gefunden"}), 404
        return redirect(url_for('list_tasks'))
    
    new_status = not task.get('completed', False)
    result = mongo.db.tasks.update_one(
        {"_id": ObjectId(task_id)},
        {"$set": {
            "completed": new_status, 
            "updated_at": datetime.now(),
            "completed_by": get_current_user_id() if new_status else None,
            "completed_by_username": session.get('username') if new_status else None
        }}
    )
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if result.modified_count > 0:
            return jsonify({"success": True, "completed": new_status})
        else:
            return jsonify({"success": False, "error": "Status konnte nicht geändert werden"}), 400
    
    return redirect(url_for('list_tasks'))

# delete task
@app.route('/tasks/<task_id>/delete', methods=['POST'])
@login_required
def delete_task(task_id):
    result = mongo.db.tasks.delete_one({"_id": ObjectId(task_id)})
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if result.deleted_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Aufgabe konnte nicht gelöscht werden"}), 400
    
    return redirect(url_for('list_tasks'))

# show shopping list
@app.route('/shopping')
@login_required
def list_shopping():
    items = list(mongo.db.shopping.find({}).sort("category", 1))
    return render_template('shopping.html', items=items)

# create shopping list item
@app.route('/shopping/create', methods=['POST'])
@login_required
def create_shopping_item():
    item = {
        "name": request.form.get('name'),
        "quantity": request.form.get('quantity', '1'),
        "category": request.form.get('category', 'Allgemein'),
        "purchased": False,
        "created_by": get_current_user_id(),
        "created_by_username": session.get('username'),
        "created_at": datetime.now(),
        "updated_at": datetime.now()
    }
    
    item_id = mongo.db.shopping.insert_one(item).inserted_id
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        item['_id'] = str(item_id)
        return jsonify({"success": True, "item": item})
    
    return redirect(url_for('list_shopping'))

# show shopping list item details
@app.route('/shopping/category/<category>')
@login_required
def filter_shopping(category):
    items = list(mongo.db.shopping.find({"category": category}).sort("name", 1))
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        for item in items:
            item['_id'] = str(item['_id'])
        return jsonify({"success": True, "items": items})
    
    return render_template('shopping.html', items=items, current_category=category)

# update shopping list item
@app.route('/shopping/<item_id>/update', methods=['POST'])
@login_required
def update_shopping_item(item_id):
    update_data = {
        "name": request.form.get('name'),
        "quantity": request.form.get('quantity'),
        "category": request.form.get('category'),
        "updated_at": datetime.now(),
        "last_updated_by": get_current_user_id(),
        "last_updated_by_username": session.get('username')
    }
    
    update_data = {k: v for k, v in update_data.items() if v is not None}
    
    result = mongo.db.shopping.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": update_data}
    )
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if result.modified_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Item konnte nicht aktualisiert werden"}), 400
    
    return redirect(url_for('list_shopping'))

# toggle shopping list item status
@app.route('/shopping/<item_id>/toggle', methods=['POST'])
@login_required
def toggle_shopping_item(item_id):
    item = mongo.db.shopping.find_one({"_id": ObjectId(item_id)})
    
    if not item:
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({"success": False, "error": "Item nicht gefunden"}), 404
        return redirect(url_for('list_shopping'))
    
    new_status = not item.get('purchased', False)
    result = mongo.db.shopping.update_one(
        {"_id": ObjectId(item_id)},
        {"$set": {
            "purchased": new_status, 
            "updated_at": datetime.now(),
            "purchased_by": get_current_user_id() if new_status else None,
            "purchased_by_username": session.get('username') if new_status else None
        }}
    )
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if result.modified_count > 0:
            return jsonify({"success": True, "purchased": new_status})
        else:
            return jsonify({"success": False, "error": "Status konnte nicht geändert werden"}), 400
    
    return redirect(url_for('list_shopping'))

# delete shopping list item
@app.route('/shopping/<item_id>/delete', methods=['POST'])
@login_required
def delete_shopping_item(item_id):
    result = mongo.db.shopping.delete_one({"_id": ObjectId(item_id)})
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        if result.deleted_count > 0:
            return jsonify({"success": True})
        else:
            return jsonify({"success": False, "error": "Item konnte nicht gelöscht werden"}), 400
    
    return redirect(url_for('list_shopping'))

# clear all purchased items
@app.route('/shopping/clear-purchased', methods=['POST'])
@login_required
def clear_purchased():
    result = mongo.db.shopping.delete_many({"purchased": True})
    
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({"success": True, "deleted_count": result.deleted_count})
    
    return redirect(url_for('list_shopping'))

# notifications
@app.route('/api/due-tasks')
@login_required
def api_due_tasks():
    today = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    tomorrow = today + timedelta(days=1)
    next_week = today + timedelta(days=7)
    
    tasks = list(mongo.db.tasks.find({
        "due_date": {"$gte": today.strftime("%Y-%m-%d"), "$lte": next_week.strftime("%Y-%m-%d")},
        "completed": False
    }).sort("due_date", 1))
    
    formatted_tasks = []
    for task in tasks:
        task_date = datetime.strptime(task["due_date"], "%Y-%m-%d")
        formatted_tasks.append({
            "_id": str(task["_id"]),
            "title": task["title"],
            "due_date": task["due_date"],
            "priority": task["priority"],
            "due_today": task["due_date"] == today.strftime("%Y-%m-%d"),
            "created_by_username": task.get("created_by_username", "Unbekannt")
        })
    
    return jsonify({
        "success": True,
        "tasks": formatted_tasks
    })

# user profile page
@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html', username=session.get('username'))

# change password
@app.route('/profile/change-password', methods=['POST'])
@login_required
def change_password():
    current_password = request.form.get('current_password')
    new_password = request.form.get('new_password')
    confirm_password = request.form.get('confirm_password')
    
    if not all([current_password, new_password, confirm_password]):
        flash('Alle Felder sind erforderlich', 'error')
        return redirect(url_for('profile'))
    
    if new_password != confirm_password:
        flash('Die neuen Passwörter stimmen nicht überein', 'error')
        return redirect(url_for('profile'))
    
    if len(new_password) < 5:
        flash('Das neue Passwort muss mindestens 5 Zeichen lang sein', 'error')
        return redirect(url_for('profile'))
    
    user_id = get_current_user_id()
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    
    if not user or not check_password_hash(user['password'], current_password):
        flash('Das aktuelle Passwort ist falsch', 'error')
        return redirect(url_for('profile'))
    
    hashed_password = generate_password_hash(new_password)
    mongo.db.users.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"password": hashed_password, "updated_at": datetime.now()}}
    )
    
    flash('Passwort erfolgreich geändert', 'success')
    return redirect(url_for('profile'))

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)