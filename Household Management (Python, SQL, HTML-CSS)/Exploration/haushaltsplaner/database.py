import sqlite3
import os

def get_db_connection():
    conn = sqlite3.connect('haushaltsplaner.db')
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    if not os.path.exists('haushaltsplaner.db'):
        conn = get_db_connection()
        with open('schema.sql') as f:
            conn.executescript(f.read())
        conn.commit()
        conn.close()
        print("Datenbank initialisiert!")