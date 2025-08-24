import sqlite3
from flask import Flask, render_template, request

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect("notes.db")
    conn.row_factory = sqlite3.Row
    return conn

@app.route("/", methods = ["GET", "POST"])
def home():

    if request.method == "POST":
        name = request.form.get("name")
        message = request.form.get("message")

        conn = get_db_connection()
        conn.execute("INSERT INTO notes (name, message) VALUES (?, ?)", (name, message))
        # conn.execute("DELETE FROM notes")
        conn.commit()
        conn.close()


    conn = get_db_connection()
    notes = conn.execute("SELECT * FROM notes ORDER BY created_at DESC").fetchall()
    conn.close()

    return render_template("index.html", notes = notes)

if __name__ == "__main__":
    app.run(debug=True)