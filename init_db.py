import sqlite3

conn = sqlite3.connect("notes.db")

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

print("DB and Table created.")