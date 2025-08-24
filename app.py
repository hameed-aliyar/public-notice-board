from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods = ["GET", "POST"])
def home():
    notes = ["Hello", "Welcome", "First Note!", "No way", "Go away"]

    if request.method == "POST":
        name = request.form.get("name")
        message = request.form.get("message")
        print(f"{name} : {message}.")

    return render_template("index.html", notes = notes)

if __name__ == "__main__":
    app.run(debug=True)