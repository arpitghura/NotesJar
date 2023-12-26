const addBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");
const noNotesImg = document.querySelector(".no-notes-img");

let getAllNotes=()=>{
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
    return notes
}

const updateLSData = () => {
    let notes = getAllNotes()
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
    var n=getAllNotes();
    var c=n.length;
    noNotesImg.classList.add('d-none');
    const newNote = document.createElement('div');
    newNote.classList.add('note');
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
            n=getAllNotes();
            c=n.length;
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
            let n=getAllNotes();
            let newC=n.length;
            if(newC>c){
                toastMessage("New Note added!!!")
            }
            if(newC==c|| (c==0&&newC!=1))
            {
                toastMessage("Note updated successfully!!!")
            }
            c=getAllNotes().length;
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
        updateLSData();
        c=getAllNotes().length
        toastMessage("Note deleted successfully!!!")
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
    x.innerText=msg;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
addBtn.addEventListener("click", () => addNewNote());

let spans = document.getElementsByClassName("circle");
addBtn.onclick=function(){
    for(span of spans){
        span.classList.add("anim");
    }
    setTimeout(function(){
        for(span of spans){
            span.classList.remove("anim");
        }
    },500)
}