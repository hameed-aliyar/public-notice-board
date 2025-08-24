function loadNotes() {
    fetch("/api/notes")
    .then(res => res.json())
    .then(notes => {
        const ul = document.getElementById("notesList");
        ul.innerHTML = "";
        notes.forEach(note => {
            const li = document.createElement("li");
            li.innerHTML = `${note.name} : ${note.message} (${note.created_at})`;
            ul.appendChild(li);
        });
    });
}

document.getElementById("noteForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    fetch("/api/add_note", {
        method : "POST",
        headers : { "Content-Type" : "application/json" },
        body : JSON.stringify({ name, message })
    })
    .then(res => res.json())
    .then(note => {
        const ul = document.getElementById("notesList");
        const li = document.createElement("li");
        li.innerHTML = `${note.name} : ${note.message} (${note.created_at})`;
        ul.prepend(li);

        document.getElementById("noteForm").reset();
    });
});

loadNotes();