const addBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");
const noNotesImg = document.querySelector(".no-notes-img");

let currentItemCount=()=>{
    const allNotes = document.querySelectorAll(".note");
    let notes = [];
    let ele = {};

    allNotes.forEach((note) => {
        ele.content = note.querySelector(".noteContent").value;
        ele.title = note.querySelector(".inputHeading").value;
        if (!(ele.content === "" && ele.title === "" || ele.content === " " && ele.title === " ")) {
            notes.push(ele);
        }
        ele = {};
    })

    return notes.length
}

const updateLSData = () => {
    const allNotes = document.querySelectorAll(".note");
    let notes = [];
    let ele = {};

    allNotes.forEach((note) => {
        ele.content = note.querySelector(".noteContent").value;
        ele.title = note.querySelector(".inputHeading").value;
        if (!(ele.content === "" && ele.title === "" || ele.content === " " && ele.title === " ")) {
            notes.push(ele);
        }
        ele = {};
    })

    localStorage.setItem("data", JSON.stringify(notes));
    if (notes.length == 0) {
        noNotesImg.classList.remove('d-none');
        noNotesImg.classList.add('d-inline');
    }
    else {
        noNotesImg.classList.remove('d-inline');
        noNotesImg.classList.add('d-none');
    }
}

const addNewNote = (text = '', title = '') => {
    noNotesImg.classList.add('d-none');
    const newNote = document.createElement('div');
    newNote.classList.add('note');
    let c=currentItemCount();
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
        }else{
            let newC=currentItemCount();
            if(newC>c){
                toastMessage("New Note added!!!")
            }
            if(newC==c)
            {
                toastMessage("Note updated successfully!!!")
            }
            c=currentItemCount();
        }
        textArea.focus();
        changeIcon();
    })

    textArea.addEventListener("change", (event) => {
        if (inputHeading.value === "") {
            inputHeading.value = " ";
            inputHeading.style.borderColor = "transparent";
        }
        updateLSData();
    })

    inputHeading.addEventListener("change", (event) => {
        updateLSData();
    })

    const deleteNote = () => {
        newNote.remove();
        let newC=currentItemCount();
        updateLSData();
        if(newC<c){
            toastMessage("Note deleted successfully!!!")

        }else{
            toastMessage("Note deleted successfully!!!")
        }
        c=currentItemCount()
    }

    deleteBtn.addEventListener("click", deleteNote);
    notesContainer.append(newNote);

}
const getData = () => {
    if (localStorage.getItem("data")) {
        const data = JSON.parse(localStorage.getItem("data"));
        console.log(data);
        if (data === undefined || data.length == 0) {
            console.log("no data found")
            noNotesImg.classList.add('d-inline');
        }
        else {
            noNotesImg.classList.add('d-none');

            data.forEach((ele) => {
                addNewNote(ele.content, ele.title);
            })
        }
    }
    else {
        localStorage.setItem("data", undefined);
    }
}
getData();

function toastMessage(msg) {
    var x = document.getElementById("snackbar");
    x.className = "show";
    x.innerHTML=msg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
addBtn.addEventListener("click", () => addNewNote());