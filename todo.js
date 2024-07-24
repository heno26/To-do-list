document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks(tasks);
}

function addTask() {
    const title = document.getElementById("task-title").value;
    const category = document.getElementById("task-category").value;

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newTask = { title, category, completed: false, id: Date.now() };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);

    document.getElementById("task-title").value = "";
    document.getElementById("task-category").value = "Work";
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);
}

function completeTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks(tasks);
}

function filterTasks() {
    const category = document.getElementById("filter-category").value;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (category !== "All") {
        tasks = tasks.filter(task => task.category === category);
    }
    displayTasks(tasks);
}

function displayTasks(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
            ${task.title} - ${task.category}
            <div>
                <button onclick="completeTask(${task.id})">✓</button>
                <button onclick="deleteTask(${task.id})">✗</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}