function loadNotes() {
    fetch("/api/notes")
    .then(res => res.json())
    .then(notes => {
        const ul = document.getElementById("notesList");
        ul.innerHTML = "";
        notes.forEach(note => {
            const li = document.createElement("li");
            li.dataset.id = note.id;

            li.innerHTML = `
                <span class="note-name">${note.name}</span> :
                <span class="note-text">${note.message}</span>
                <span class="note-time">(${note.created_at})</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            li.querySelector(".edit-btn").addEventListener("click", () => startEdit(li));
            li.querySelector(".delete-btn").addEventListener("click", () => deleteNote(note.id));
            ul.appendChild(li);
        });
    });
}

function startEdit(li) {
    const messageSpan = li.querySelector(".note-text");
    const oldMessage = messageSpan.textContent;

    const input = document.createElement("input");
    input.type = "text";
    input.value = oldMessage;
    input.className = "edit-input";

    messageSpan.replaceWith(input);

    const saveBtn = document.createElement("button");
    saveBtn.textContent = "Save";
    saveBtn.className = "save-btn";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.className = "cancel-btn";

    input.after(saveBtn, cancelBtn);

    li.querySelector(".edit-btn").disabled = true;
    li.querySelector(".delete-btn").disabled = true;

    saveBtn.addEventListener("click", () => saveEdit(li.dataset.id, input.value, li));
    cancelBtn.addEventListener("click", () => cancelEdit(li, oldMessage));
}

function saveEdit(id, newMessage, li) {
    fetch(`/notes/${id}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({ message: newMessage })
    })
    .then(res => res.json())
    .then(updated => {
        const input = li.querySelector("input");
        const saveBtn = input.nextSibling;
        const cancelBtn = saveBtn.nextSibling;

        const span = document.createElement("span");
        span.className = "note-text";
        span.textContent = updated.message;

        input.replaceWith(span);
        saveBtn.remove();
        cancelBtn.remove();

        li.querySelector(".edit-btn").disabled = false;
        li.querySelector(".delete-btn").disabled = false;
    });
}

function cancelEdit(li, oldMessage) {
    const input = li.querySelector("input");
    const saveBtn = input.nextSibling;
    const cancelBtn = saveBtn.nextSibling;

    const span = document.createElement("span");
    span.className = "note-text";
    span.textContent = oldMessage;

    input.replaceWith(span);
    saveBtn.remove();
    cancelBtn.remove();

    li.querySelector(".edit-btn").disabled = false;
    li.querySelector(".delete-btn").disabled = false;
}

function deleteNote(id) {
    fetch(`/notes/${id}`, { method: "DELETE" })
    .then(res => res.json())
    .then(() => {
        loadNotes();
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
        loadNotes();

        document.getElementById("noteForm").reset();
    });
});

function rendernotes(notes) {
    const notesList = document.getElementById("notes");
    notesList.innerHTML = "";

    const template = document.getElementById("note-template");

    notes.forEach(note => {
        const clone = template.message.cloneNode(true);
        const li = clone.querySelector(li);

        li.dataset.id = note.id;
        li.querySelector(".note-text").textContent = note.message;

        li.querySelector(".edit-btn").addEventListener("click", () => startEdit(li));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteNote(note.id));
        
        notesList.appendChild(clone);
    });
}

loadNotes();