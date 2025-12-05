document.addEventListener('DOMContentLoaded', () => {

    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // ------------ LOAD TASKS FROM LOCAL STORAGE ------------
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
        // false = do NOT save again to avoid duplication
    }

    // ------------ ADD A NEW TASK ------------
    function addTask(taskText, save = true) {
        // If taskText is empty (when user clicks button), read from input field
        if (!taskText) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.classList.add('remove-btn');

        // Remove button logic
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        };

        // Append button and task
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input field
        taskInput.value = "";

        // Save task to Local Storage (if allowed)
        if (save) {
            saveTaskToStorage(taskText);
        }
    }

    // ------------ SAVE A TASK TO LOCAL STORAGE ------------
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // ------------ REMOVE TASK FROM LOCAL STORAGE ------------
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // ------------ EVENT LISTENERS ------------
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load saved tasks when page loads
    loadTasks();
});
