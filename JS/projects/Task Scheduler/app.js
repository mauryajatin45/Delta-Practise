const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const filterAll = document.getElementById("filter-all");
const filterFirst = document.getElementById("filter-first");
const filterSecond = document.getElementById("filter-second");
const filterThird = document.getElementById("filter-third");
const filterCompleted = document.getElementById("filter-completed");
const filterPending = document.getElementById("filter-pending");
const searchInput = document.getElementById("search");
const progressBar = document.getElementById("progress-bar");

// Prevent past dates from being selected
const today = new Date().toISOString().slice(0, 16);
deadlineInput.setAttribute("min", today);

// Helper functions
function formatDateTime(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleString(undefined, options);
}

function calculateRemainingTime(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeDifference = deadlineDate - now;

    if (timeDifference <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
}

function getTasksFromLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render Task with animations, countdown, and editable options
function renderTask(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.dataset.priority = task.priority;
    taskItem.dataset.deadline = task.deadline;
    taskItem.dataset.description = task.description;
    taskItem.dataset.completed = task.completed;

    const taskText = task.completed ? `<s>${task.description}</s>` : task.description;
    const priorityText = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);
    const countdownText = !task.completed ? `${calculateRemainingTime(task.deadline).hours}h ${calculateRemainingTime(task.deadline).minutes}m ${calculateRemainingTime(task.deadline).seconds}s` : "";

    taskItem.innerHTML = `
        <div>
            <p><strong>Task:</strong> ${taskText}</p>
            <p><strong>Priority:</strong> ${priorityText} Priority</p>
            <p><strong>Deadline:</strong> ${formatDateTime(task.deadline)}</p>
            <p><strong>Time Left:</strong> <span class="countdown">${countdownText}</span></p>
        </div>
        <div class="buttons">
            <button class="mark-done" ${task.completed ? "disabled" : ""}>Mark Done</button>
            <button class="delete-task">Delete</button>
            <button class="edit-task">Edit</button>
        </div>
    `;

    taskList.appendChild(taskItem);
    startCountdown(taskItem, task);
    updateStats();
}

// Start countdown timer for each task
function startCountdown(taskItem, task) {
    const countdownElement = taskItem.querySelector(".countdown");
    const interval = setInterval(() => {
        const remainingTime = calculateRemainingTime(task.deadline);
        countdownElement.textContent = `${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;

        if (remainingTime.hours <= 0 && remainingTime.minutes <= 0 && remainingTime.seconds <= 0) {
            clearInterval(interval);
            task.completed = true;
            saveTasksToLocalStorage(getTasksFromLocalStorage());
            taskItem.querySelector(".mark-done").disabled = true;
            taskItem.querySelector("p:nth-child(1)").innerHTML = `<s>${task.description}</s>`;
            updateStats(); // Update stats when the task is completed
        }
    }, 1000);
}

// Add new task
addTaskButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;

    if (task === "" || deadline === "") {
        alert("Please enter a task and select a deadline.");
        return;
    }

    const selectedDate = new Date(deadline);
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
        alert("Please select a future date and time for the deadline.");
        return;
    }

    const newTask = {
        description: task,
        priority: priority,
        deadline: deadline,
        completed: false
    };

    const tasks = getTasksFromLocalStorage();
    tasks.push(newTask);
    saveTasksToLocalStorage(tasks);

    renderTask(newTask);
    taskInput.value = "";
    priorityInput.value = "first";
    deadlineInput.value = "";
});

// Mark a task as completed
taskList.addEventListener("click", (event) => {
    if (event.target.classList.contains("mark-done")) {
        const taskItem = event.target.parentElement.parentElement;
        const taskDescription = taskItem.dataset.description;

        const tasks = getTasksFromLocalStorage();
        const task = tasks.find(t => t.description === taskDescription);
        task.completed = true;

        saveTasksToLocalStorage(tasks);
        taskItem.dataset.completed = task.completed;
        taskItem.querySelector("p").innerHTML = `<s>${task.description}</s>`;
        event.target.disabled = true;
        updateStats();
    }

    if (event.target.classList.contains("delete-task")) {
        const taskItem = event.target.parentElement.parentElement;
        const taskDescription = taskItem.dataset.description;

        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task.description !== taskDescription);
        saveTasksToLocalStorage(tasks);

        taskList.removeChild(taskItem);
        updateStats(); // Update stats after task deletion
    }

    if (event.target.classList.contains("edit-task")) {
        const taskItem = event.target.parentElement.parentElement;
        const taskDescription = taskItem.dataset.description;

        let tasks = getTasksFromLocalStorage();
        const task = tasks.find(t => t.description === taskDescription);
        
        taskInput.value = task.description;
        priorityInput.value = task.priority;
        deadlineInput.value = task.deadline;

        tasks = tasks.filter(t => t.description !== taskDescription);
        saveTasksToLocalStorage(tasks);
        taskList.removeChild(taskItem);
    }
});

// Update statistics: completed, pending, and progress bar
function updateStats() {
    const tasks = getTasksFromLocalStorage();
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;

    document.getElementById("completed-count").textContent = completedTasks;
    document.getElementById("pending-count").textContent = pendingTasks;
    progressBar.value = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0; // Avoid division by zero
}

// Filter tasks
function filterTasks(filterType) {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = "";

    let filteredTasks;
    if (filterType === "all") filteredTasks = tasks;
    else if (filterType === "completed") filteredTasks = tasks.filter(task => task.completed);
    else if (filterType === "pending") filteredTasks = tasks.filter(task => !task.completed);
    else filteredTasks = tasks.filter(task => task.priority === filterType);

    filteredTasks.forEach(task => renderTask(task));
}

// Search functionality
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = "";
    const filteredTasks = tasks.filter(task => task.description.toLowerCase().includes(query));
    filteredTasks.forEach(task => renderTask(task));
});

// Load tasks from localStorage when page loads
document.addEventListener("DOMContentLoaded", () => {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => renderTask(task));
    updateStats();
});
