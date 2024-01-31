document.addEventListener("DOMContentLoaded", function () {
    // Retrieve tasks from local storage on page load
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    // Add saved tasks to the list
    savedTasks.forEach(function (task) {
        addTaskToDOM(task);
    });

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            const newTask = { text: taskText, id: Date.now() };
            savedTasks.push(newTask);

            // Save tasks to local storage
            localStorage.setItem("tasks", JSON.stringify(savedTasks));

            addTaskToDOM(newTask);

            // Clear input field
            taskInput.value = "";
        }
    };

    // Function to add a task to the DOM
    function addTaskToDOM(task) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(listItem);
    }

    // Function to delete a task
    window.deleteTask = function (taskId) {
        // Remove task from savedTasks array
        const updatedTasks = savedTasks.filter((task) => task.id !== taskId);

        // Update local storage
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));

        // Clear the task list
        taskList.innerHTML = "";

        // Add updated tasks to the list
        updatedTasks.forEach(function (task) {
            addTaskToDOM(task);
        });
    };
});
