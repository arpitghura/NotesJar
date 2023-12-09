const addBtn = document.getElementById("addNote");
const notesContainer = document.getElementById("notesContainer");
const noNotesImg = document.querySelector(".no-notes-img");
var modal = document.getElementById("myModal");
var msg = document.getElementById("msg");
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

  
  // When the user clicks anywhere outside of the message box, close it
  window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.opacity = 0;
        modal.style.visibility = 'hidden';
    }
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
                modal.style.opacity = 1;
                modal.style.visibility = 'visible';
                msg.innerHTML="New Note added!!!"
                setTimeout(()=>{
                    modal.style.opacity = 0;
                    modal.style.visibility = 'hidden';
                },1300)

            }
            if(newC==c)
            {
                modal.style.opacity = 1;
                modal.style.visibility = 'visible';
                msg.innerHTML="Note updated successfully!!!"
                setTimeout(()=>{
                    modal.style.opacity = 0;
                    modal.style.visibility = 'hidden';
                },1300)
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
            modal.style.visibility = 'visible';
            modal.style.opacity = 1;
            msg.innerHTML="Note deleted successfully!!!"
            setTimeout(()=>{
                modal.style.opacity = 0;
                modal.style.visibility = 'hidden';
            },1000)
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

addBtn.addEventListener("click", () => addNewNote());