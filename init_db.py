import sqlite3
import os
from flask import Flask

app = Flask(__name__)


os.makedirs(app.instance_path, exist_ok=True)


db_path = os.path.join(app.instance_path, "notes.db")


conn = sqlite3.connect(db_path)
c = conn.cursor()


c.execute(
    """
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """
)

conn.commit()
conn.close()

print("DB and Table created at {db_path}")