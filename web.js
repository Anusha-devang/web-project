



let tasks = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-task-btn").addEventListener("click", addTask);
  document.getElementById("filter-all").addEventListener("click", () => filterTasks('all'));
  document.getElementById("filter-completed").addEventListener("click", () => filterTasks('completed'));
  document.getElementById("filter-active").addEventListener("click", () => filterTasks('active'));
});

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    taskInput.value = "";
    renderTasks();
  } else {
    alert("Task cannot be empty!");
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newTaskText = prompt("Edit the task:", tasks[index].text);
  if (newTaskText !== null && newTaskText.trim() !== "") {
    tasks[index].text = newTaskText.trim();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function filterTasks(filter) {
  let filteredTasks;
  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filter === "active") {
    filteredTasks = tasks.filter(task => !task.completed);
  } else {
    filteredTasks = tasks;
  }
  renderTasks(filteredTasks);
}

function renderTasks(filteredTasks = tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  filteredTasks.forEach((task, index) => {
    const taskItem = document.createElement("li");
    taskItem.className = task-item ${task.completed ? "completed" : ""};
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button class="complete-btn" onclick="toggleTask(${index})">${task.completed ? "Undo" : "Complete"}</button>
        <button class="edit-btn" onclick="editTask(${index})">Edit</button>
        <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(taskItem);
  });
}