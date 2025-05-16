from flask import Blueprint, render_template, request, redirect, url_for, flash, session, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import re
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

def is_valid_email(email):
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def is_strong_password(password):
    if len(password) < 8:
        return False
    if not any(c.isalpha() for c in password):
        return False
    if not any(c.isdigit() for c in password):
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
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')
        
        if not username or not email or not password or not confirm_password:
            flash('Alle Felder müssen ausgefüllt sein', 'error')
            return render_template('auth/register.html')
            
        if password != confirm_password:
            flash('Passwörter stimmen nicht überein', 'error')
            return render_template('auth/register.html')
        
        if not is_valid_email(email):
            flash('Bitte geben Sie eine gültige E-Mail-Adresse ein', 'error')
            return render_template('auth/register.html')
        
        if not is_strong_password(password):
            flash('Passwort muss mindestens 8 Zeichen lang sein und Buchstaben und Zahlen enthalten', 'error')
            return render_template('auth/register.html')
        
        mongo = current_app.mongo
        existing_user = mongo.db.users.find_one({'$or': [{'email': email}, {'username': username}]})
        
        if existing_user:
            flash('Benutzer mit dieser E-Mail oder Benutzername existiert bereits', 'error')
            return render_template('auth/register.html')
        
        new_user = {
            'username': username,
            'email': email,
            'password': generate_password_hash(password, method='pbkdf2:sha256'),  # Secure hashing
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
        email = request.form.get('email')
        password = request.form.get('password')
        
        if not email or not password:
            flash('Bitte E-Mail und Passwort eingeben', 'error')
            return render_template('auth/login.html')
            
        mongo = current_app.mongo
        user = mongo.db.users.find_one({'email': email})
        
        if not user or not check_password_hash(user['password'], password):
            flash('Ungültige E-Mail oder Passwort', 'error')
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

@auth_bp.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    mongo = current_app.mongo
    user = mongo.db.users.find_one({'_id': ObjectId(session['user_id'])})
    
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        new_password = request.form.get('new_password')
        current_password = request.form.get('current_password')
        notifications_enabled = 'notifications_enabled' in request.form
        
        update_data = {
            'username': username,
            'email': email,
            'settings.notifications_enabled': notifications_enabled,
            'updated_at': datetime.now()
        }
        
        if new_password:
            if not current_password or not check_password_hash(user['password'], current_password):
                flash('Aktuelles Passwort ist falsch', 'error')
                return render_template('auth/profile.html', user=user)
                
            if not is_strong_password(new_password):
                flash('Neues Passwort muss mindestens 8 Zeichen lang sein und Buchstaben und Zahlen enthalten', 'error')
                return render_template('auth/profile.html', user=user)
                
            update_data['password'] = generate_password_hash(new_password, method='pbkdf2:sha256')
        
        mongo.db.users.update_one(
            {'_id': ObjectId(session['user_id'])},
            {'$set': update_data}
        )
        
        flash('Profil erfolgreich aktualisiert', 'success')
        return redirect(url_for('auth.profile'))
        
    return render_template('auth/profile.html', user=user)