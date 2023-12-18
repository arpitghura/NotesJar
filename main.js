const dueDateInput = document.getElementById("dueDate");
const submitBtn = document.getElementById("submitBtn");
const tasksHeading = document.getElementById("heading-tasks");
submitBtn.addEventListener("click", (e) => {
  addItem(e);
});

flatpickr(dueDateInput, {
  enableTime: false,
  dateFormat: "Y-m-d",
});

function addItem(e) {
  e.preventDefault();
  const newTaskTitle = document.getElementById("item").value;
  let dueDate = document.getElementById("dueDate").value;
  const currentDate = new Date();
  const dueDateObj = new Date(dueDate);
  if (!newTaskTitle) {
    return false;
  } else if (dueDateObj < currentDate) {
    return false;
  } else {
    tasksHeading.classList.remove("hidden");
  }

  if (newTaskTitle.trim() === "") return false;
  else {
    document.getElementById("item").value = "";
  }

  const creationDateTime = new Date().toLocaleString();

  createNewTask(newTaskTitle, creationDateTime, dueDate);

  document.getElementById("dueDate").value = "";
}

function createNewTask(taskTitle, createdDate, dueDate) {
  const li = document.createElement("li");
  li.className = `list-group-item card bg-transparent rounded my-2 shadow`;
  const dateTimeParagraph = document.createElement("p");
  dateTimeParagraph.className = "text-muted";
  dateTimeParagraph.style.fontSize = "15px";
  dateTimeParagraph.appendChild(
    document.createTextNode("Created:" + createdDate)
  );
  li.appendChild(document.createTextNode(taskTitle));
  li.appendChild(dateTimeParagraph);

  taskList.appendChild(li);
}
