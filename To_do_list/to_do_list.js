document.getElementById('add-btn').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    const selectedDay = document.getElementById('day-select').value;

    if (todoText) {
        // Create a new to-do item
        const newTodoItem = document.createElement('li');
        newTodoItem.textContent = todoText;
        newTodoItem.setAttribute('draggable', 'true');
        newTodoItem.setAttribute('id', 'todo-' + Date.now());

        // Toggle completed status on click
        newTodoItem.addEventListener('click', function() {
            this.classList.toggle('completed');
        });

        // Handle drag start
        newTodoItem.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.id);
        });

        // Append to the selected day
        document.getElementById('todo-list-' + selectedDay).appendChild(newTodoItem);
        todoInput.value = ""; // Clear input field
    } else {
        alert("Please write your to-do list item!");
    }
});

// Enable drag and drop for all day containers
const todoLists = document.querySelectorAll('.todo-list');

todoLists.forEach(list => {
    // Allow drop
    list.addEventListener('dragover', function(e) {
        e.preventDefault();
    });

    // Handle item drop
    list.addEventListener('drop', function(e) {
        const id = e.dataTransfer.getData('text/plain');
        const draggableItem = document.getElementById(id);

        if (draggableItem) {
            e.target.appendChild(draggableItem);
        }
    });
});
