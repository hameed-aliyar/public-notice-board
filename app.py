from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    notes = ["Hello", "Welcome", "First Note!", "No way"]
    return render_template("index.html", notes = notes)

if __name__ == "__main__":
    app.run(debug=True)