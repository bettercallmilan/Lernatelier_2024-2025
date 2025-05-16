from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime
from bson.objectid import ObjectId

auth_bp = Blueprint('auth', __name__)

def is_strong_password(password):
    if len(password) < 5:
        return False
    return True

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('auth.login', next=request.url))
        return f(*args, **kwargs)
    return decorated_function

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        if not username or not password or not confirm_password:
            flash('Alle Felder müssen ausgefüllt sein', 'error')
            return render_template('auth/register.html')
            
        if password != confirm_password:
            flash('Passwörter stimmen nicht überein', 'error')
            return render_template('auth/register.html')
        
        if not is_strong_password(password):
            flash('Passwort muss mindestens 5 Zeichen lang sein', 'error')
            return render_template('auth/register.html')
        
        mongo = current_app.mongo
        existing_user = mongo.db.users.find_one({'username': username})
        
        if existing_user:
            flash('Benutzername existiert bereits', 'error')
            return render_template('auth/register.html')
        
        new_user = {
            'username': username,
            'password': generate_password_hash(password, method='pbkdf2:sha256'),
            'created_at': datetime.now(),
            'updated_at': datetime.now(),
            'settings': {
                'notifications_enabled': True
            }
        }
        
        mongo.db.users.insert_one(new_user)
        flash('Registrierung erfolgreich! Sie können sich jetzt anmelden', 'success')
        return redirect(url_for('auth.login'))
        
    return render_template('auth/register.html')

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        if not username or not password:
            flash('Bitte Benutzername und Passwort eingeben', 'error')
            return render_template('auth/login.html')
            
        mongo = current_app.mongo
        user = mongo.db.users.find_one({'username': username})
        
        if not user or not check_password_hash(user['password'], password):
            flash('Ungültiger Benutzername oder Passwort', 'error')
            return render_template('auth/login.html')
            
        session['user_id'] = str(user['_id'])
        session['username'] = user['username']
        
        next_page = request.args.get('next')
        if next_page:
            return redirect(next_page)
        return redirect(url_for('index'))
        
    return render_template('auth/login.html')

@auth_bp.route('/logout')
def logout():
    session.clear()
    flash('Sie wurden erfolgreich abgemeldet', 'success')
    return redirect(url_for('auth.login'))