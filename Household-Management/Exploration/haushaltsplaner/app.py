from flask import Flask, render_template, request, redirect, url_for, flash
import database

app = Flask(__name__)
app.secret_key = 'entwicklungsschluessel'

database.init_db()

@app.route('/')
def index():
    conn = database.get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    tasks_count = conn.execute('SELECT COUNT(*) FROM tasks WHERE status = "offen"').fetchone()[0]
    shopping_count = conn.execute('SELECT COUNT(*) FROM shopping_items WHERE completed = 0').fetchone()[0]
    conn.close()
    return render_template('index.html', users=users, tasks_count=tasks_count, shopping_count=shopping_count)

# Aufgabenverwaltung
@app.route('/tasks', methods=('GET', 'POST'))
def tasks():
    conn = database.get_db_connection()
    if request.method == 'POST':
        title = request.form['title']
        description = request.form.get('description', '')
        due_date = request.form.get('due_date', '')
        assigned_to = request.form.get('assigned_to')
        
        if not title:
            flash('Titel ist erforderlich!')
        else:
            conn.execute('INSERT INTO tasks (title, description, due_date, assigned_to) VALUES (?, ?, ?, ?)',
                         (title, description, due_date, assigned_to))
            conn.commit()
            flash('Aufgabe erfolgreich erstellt!')
            return redirect(url_for('tasks'))

    tasks = conn.execute('''
        SELECT t.*, u.username 
        FROM tasks t 
        LEFT JOIN users u ON t.assigned_to = u.id 
        ORDER BY due_date IS NULL, due_date''').fetchall()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return render_template('tasks.html', tasks=tasks, users=users)

# Aufgabenstatus ändern
@app.route('/tasks/<int:id>/status', methods=['POST'])
def update_task_status(id):
    new_status = request.form['status']
    conn = database.get_db_connection()
    conn.execute('UPDATE tasks SET status = ? WHERE id = ?', (new_status, id))
    conn.commit()
    conn.close()
    flash('Status aktualisiert!')
    return redirect(url_for('tasks'))

# Einkaufsliste
@app.route('/shopping', methods=('GET', 'POST'))
def shopping():
    conn = database.get_db_connection()
    if request.method == 'POST':
        name = request.form['name']
        quantity = request.form.get('quantity', '')
        added_by = request.form.get('added_by')
        
        if not name:
            flash('Name ist erforderlich!')
        else:
            conn.execute('INSERT INTO shopping_items (name, quantity, added_by) VALUES (?, ?, ?)',
                         (name, quantity, added_by))
            conn.commit()
            flash('Artikel erfolgreich hinzugefügt!')
            return redirect(url_for('shopping'))

    shopping_items = conn.execute('''
        SELECT s.*, u.username 
        FROM shopping_items s 
        LEFT JOIN users u ON s.added_by = u.id 
        ORDER BY s.completed, s.created_at DESC''').fetchall()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return render_template('shopping.html', shopping_items=shopping_items, users=users)

@app.route('/shopping/<int:id>/toggle', methods=['POST'])
def toggle_shopping_item(id):
    conn = database.get_db_connection()
    item = conn.execute('SELECT completed FROM shopping_items WHERE id = ?', (id,)).fetchone()
    new_status = 0 if item['completed'] else 1
    conn.execute('UPDATE shopping_items SET completed = ? WHERE id = ?', (new_status, id))
    conn.commit()
    conn.close()
    return redirect(url_for('shopping'))

if __name__ == '__main__':
    app.run(debug=True)