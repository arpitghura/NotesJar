const addBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");

let id = 0;

const updateLSData = (id) => {
    const allNotes = document.querySelectorAll(".note");
    let notes = [];
    let ele = {};

    allNotes.forEach((note) => {
        ele.id = id;
        ele.content = note.querySelector(".noteContent").value;
        ele.title = note.querySelector(".inputHeading").value;
        notes.push(ele);
        ele = {};
    })

    localStorage.setItem("data", JSON.stringify(notes));
}

const addNewNote = (text = '', title = '') => {
    const newNote = document.createElement('div');
    newNote.classList.add('note');

    id++;
    newNote.setAttribute("key", id);

    const htmlData = `
    <div class="titleBar">
        <input placeholder="Add title" value="${title}" name="title" class="inputHeading" ${title ? 'readonly' : ''}/>
        <div class="operations">
            <button class="btn btn-sm card-btn" id="editBtn"><i class="fa fa-edit"></i></button>
            <button class="btn btn-sm card-btn" id="deleteBtn"><i class="fa fa-trash"></i></button>
        </div>
    </div>
    <textarea class="noteContent" ${text ? 'readonly' : ''} placeholder="Write Note here..."></textarea>`;

    newNote.insertAdjacentHTML("afterbegin", htmlData);

    const editBtn = newNote.querySelector("#editBtn");
    const deleteBtn = newNote.querySelector("#deleteBtn");
    const textArea = newNote.querySelector(".noteContent");
    const inputHeading = newNote.querySelector(".inputHeading");

    textArea.value = text;
    inputHeading.value = title;

    const changeIcon = () => {
        if (textArea.attributes.readonly) {
            editBtn.children[0].classList.remove("fa-check");
            editBtn.children[0].classList.add("fa-edit");
        }
        else {
            editBtn.children[0].classList.remove("fa-edit");
            editBtn.children[0].classList.add("fa-check");
        }
    }
    changeIcon();

    editBtn.addEventListener("click", () => {
        textArea.toggleAttribute("readonly");
        inputHeading.toggleAttribute("readonly");
        if (!textArea.attributes.readonly) {
            if (inputHeading.value === " ") {
                inputHeading.value = "";
                inputHeading.style.borderColor = "black ";
            }
        }
        textArea.focus();
        changeIcon();
    })

    textArea.addEventListener("change", (event) => {
        if (inputHeading.value === "") {
            inputHeading.value = " ";
            inputHeading.style.borderColor = "transparent";
        }
        updateLSData(id);
    })

    inputHeading.addEventListener("change", (event) => {
        updateLSData(id);
    })

    const deleteNote = () => {
        newNote.remove();
        updateLSData(id);
    }

    deleteBtn.addEventListener("click", deleteNote);
    notesContainer.append(newNote);

}

if (localStorage.getItem("data")) {
    const data = JSON.parse(localStorage.getItem("data"));
    console.log("data:", data);

    data.forEach((ele) => {
        id = Math.max(id, ele.id);
        addNewNote(ele.content, ele.title);
    })
}

addBtn.addEventListener("click", () => addNewNote());