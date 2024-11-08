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
const toggleFiltersButton = document.getElementById("toggle-filters");
const filterOptions = document.getElementById("filter-options");
const showHistoryButton = document.getElementById("show-history");
const historySection = document.getElementById("history-section");
const completedTasksList = document.getElementById("completed-tasks-list");
const tagInput = document.getElementById('task-tag');

// Prevent past dates from being selected
const today = new Date().toISOString().slice(0, 16);
deadlineInput.setAttribute('min', today);

// Toggle filters visibility
toggleFiltersButton.addEventListener("click", () => {
    filterOptions.classList.toggle("filter-options-visible");
});

// Get tasks from local storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

// Save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Format date-time for display
function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleString();
}

// Calculate remaining time for the task
function calculateRemainingTime(deadline) {
    const taskDeadline = new Date(deadline);
    const now = new Date();
    const timeDiff = taskDeadline - now;

    if (timeDiff <= 0) return "Expired";

    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

// Update task list based on filters
function updateTaskList() {
    const tasks = getTasksFromLocalStorage();
    taskList.innerHTML = '';
    completedTasksList.innerHTML = ''; // Clear completed tasks from history

    let filteredTasks = tasks;

    // Apply selected filters
    if (filterFirst.classList.contains('active')) {
        filteredTasks = filteredTasks.filter(task => task.priority === 'first');
    } else if (filterSecond.classList.contains('active')) {
        filteredTasks = filteredTasks.filter(task => task.priority === 'second');
    } else if (filterThird.classList.contains('active')) {
        filteredTasks = filteredTasks.filter(task => task.priority === 'third');
    } else if (filterCompleted.classList.contains('active')) {
        filteredTasks = filteredTasks.filter(task => task.completed);
    } else if (filterPending.classList.contains('active')) {
        filteredTasks = filteredTasks.filter(task => !task.completed);
    }

    filteredTasks.forEach(renderTask);
    updateTaskStats();
}

// Handle adding new task
addTaskButton.addEventListener("click", () => {
    const description = taskInput.value.trim();
    const priority = priorityInput.value;
    const deadline = deadlineInput.value;
    const tags = tagInput.value.trim().split(',').map(tag => tag.trim()).filter(tag => tag !== '');

    if (description === '' || deadline === '') return;

    const task = {
        description,
        priority,
        deadline,
        tags,
        completed: false
    };

    const tasks = getTasksFromLocalStorage();
    tasks.push(task);
    saveTasksToLocalStorage(tasks);
    taskInput.value = '';
    tagInput.value = '';
    updateTaskList();
});

// Handle task completion (move task to completed section)
function handleComplete(task) {
    task.completed = true;
    const tasks = getTasksFromLocalStorage();
    saveTasksToLocalStorage(tasks);
    updateTaskList();
}

// Handle task deletion with confirmation
function handleDelete(taskDescription) {
    const confirmation = confirm("Are you sure you want to delete this task?");
    if (confirmation) {
        const tasks = getTasksFromLocalStorage();
        const filteredTasks = tasks.filter(task => task.description !== taskDescription);
        saveTasksToLocalStorage(filteredTasks);
        updateTaskList();
    }
}

// Render task items in the task list
function renderTask(task) {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task");
    taskItem.dataset.description = task.description;

    // Task completion styling (move completed tasks to completed section)
    if (task.completed) {
        taskItem.classList.add('completed-task-background');
        completedTasksList.appendChild(taskItem); // Append completed task to the completed section
    } else {
        taskItem.innerHTML = `
            <p><strong>Task:</strong> ${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Deadline:</strong> ${formatDateTime(task.deadline)}</p>
            <p><strong>Tags:</strong> ${task.tags.join(', ')}</p>
            <p class="remaining-time"><strong>Time Remaining:</strong> ${calculateRemainingTime(task.deadline)}</p>
            <button class="mark-done">${task.completed ? 'Completed' : 'Mark as Completed'}</button>
            <button class="delete-task">Delete</button>
        `;

        // Mark task as done
        const markDoneButton = taskItem.querySelector('.mark-done');
        markDoneButton.addEventListener('click', () => handleComplete(task));

        // Delete task
        const deleteButton = taskItem.querySelector('.delete-task');
        deleteButton.addEventListener('click', () => handleDelete(task.description));

        taskList.appendChild(taskItem);
    }
}

// Update counts and progress bar
function updateTaskStats() {
    const tasks = getTasksFromLocalStorage();
    const completedTasks = tasks.filter(task => task.completed);
    const totalTasks = tasks.length;

    const completedCount = completedTasks.length;
    const pendingCount = totalTasks - completedCount;
    const progress = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

    document.getElementById('completed-count').textContent = completedCount;
    document.getElementById('pending-count').textContent = pendingCount;
    progressBar.value = progress;
}

// Show/hide task history (completed tasks)
showHistoryButton.addEventListener("click", () => {
    historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
    updateCompletedTasksHistory(); // Display completed tasks in history section
});

// Update the history section with completed tasks
function updateCompletedTasksHistory() {
    const tasks = getTasksFromLocalStorage();
    const completedTasks = tasks.filter(task => task.completed);
    completedTasksList.innerHTML = ''; // Clear previous history
    completedTasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.innerHTML = `
            <p><strong>Task:</strong> ${task.description}</p>
            <p><strong>Deadline:</strong> ${formatDateTime(task.deadline)}</p>
        `;
        completedTasksList.appendChild(taskElement);
    });
}

// Sorting functionality
let sortOrder = {
    name: 'asc',
    deadline: 'asc',
    priority: 'asc'
};

// Sort by name
document.getElementById('sort-by-name').addEventListener('click', () => {
    const tasks = getTasksFromLocalStorage();
    tasks.sort((a, b) => {
        if (sortOrder.name === 'asc') {
            return a.description.localeCompare(b.description);
        } else {
            return b.description.localeCompare(a.description);
        }
    });
    sortOrder.name = sortOrder.name === 'asc' ? 'desc' : 'asc';
    saveTasksToLocalStorage(tasks);
    updateTaskList();
});

// Sort by deadline
document.getElementById('sort-by-deadline').addEventListener('click', () => {
    const tasks = getTasksFromLocalStorage();
    tasks.sort((a, b) => {
        return sortOrder.deadline === 'asc' 
            ? new Date(a.deadline) - new Date(b.deadline)
            : new Date(b.deadline) - new Date(a.deadline);
    });
    sortOrder.deadline = sortOrder.deadline === 'asc' ? 'desc' : 'asc';
    saveTasksToLocalStorage(tasks);
    updateTaskList();
});

// Sort by priority
document.getElementById('sort-by-priority').addEventListener('click', () => {
    const tasks = getTasksFromLocalStorage();
    tasks.sort((a, b) => {
        const priorityOrder = { first: 1, second: 2, third: 3 };
        return sortOrder.priority === 'asc'
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
    });
    sortOrder.priority = sortOrder.priority === 'asc' ? 'desc' : 'asc';
    saveTasksToLocalStorage(tasks);
    updateTaskList();
});

// Filter functionality
filterAll.addEventListener('click', () => {
    toggleFilter('all');
});

filterFirst.addEventListener('click', () => {
    toggleFilter('first');
});

filterSecond.addEventListener('click', () => {
    toggleFilter('second');
});

filterThird.addEventListener('click', () => {
    toggleFilter('third');
});

filterCompleted.addEventListener('click', () => {
    toggleFilter('completed');
});

filterPending.addEventListener('click', () => {
    toggleFilter('pending');
});

// Helper function to toggle filter active states
function toggleFilter(filterType) {
    const allFilters = [filterAll, filterFirst, filterSecond, filterThird, filterCompleted, filterPending];
    allFilters.forEach(filter => filter.classList.remove('active'));

    switch (filterType) {
        case 'all':
            filterAll.classList.add('active');
            break;
        case 'first':
            filterFirst.classList.add('active');
            break;
        case 'second':
            filterSecond.classList.add('active');
            break;
        case 'third':
            filterThird.classList.add('active');
            break;
        case 'completed':
            filterCompleted.classList.add('active');
            break;
        case 'pending':
            filterPending.classList.add('active');
            break;
    }

    updateTaskList(); // Reapply filters
}

// Initial update on load
updateTaskList();
updateTaskStats();
