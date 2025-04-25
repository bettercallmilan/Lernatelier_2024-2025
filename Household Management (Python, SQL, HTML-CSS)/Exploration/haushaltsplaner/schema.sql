DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tasks;
DROP TABLE IF EXISTS shopping_items;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    due_date TIMESTAMP,
    status TEXT DEFAULT 'offen',
    assigned_to INTEGER,
    FOREIGN KEY (assigned_to) REFERENCES users (id)
);

CREATE TABLE shopping_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    quantity TEXT,
    completed BOOLEAN NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    added_by INTEGER,
    FOREIGN KEY (added_by) REFERENCES users (id)
);

INSERT INTO users (username) VALUES ('Anna'), ('Max');
INSERT INTO tasks (title, description, status, assigned_to) 
VALUES ('Müll rausbringen', 'Schwarze Tonne am Dienstag', 'offen', 1),
       ('Bad putzen', 'Wöchentliche Reinigung', 'offen', 2);
INSERT INTO shopping_items (name, quantity, added_by)
VALUES ('Milch', '1 Liter', 1),
       ('Brot', '1 Stück', 2);