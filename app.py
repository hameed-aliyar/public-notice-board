import sqlite3
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect("notes.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/notes")
def api_notes():
    conn = get_db_connection()
    notes = conn.execute("SELECT * FROM notes ORDER BY created_at DESC").fetchall()
    conn.close()

    notes_list = [dict(note) for note in notes]
    return jsonify(notes_list)

@app.route("/api/add_note", methods=["POST"])
def api_add_note():
        data = request.json
        name = data.get("name")
        message = data.get("message")

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO notes (name, message) VALUES (?, ?)", (name, message))
        # conn.execute("DELETE FROM notes")
        conn.commit()

        note_id = cur.lastrowid
        note = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
        conn.close()

        return jsonify(dict(note))

if __name__ == "__main__":
    app.run(debug=True)