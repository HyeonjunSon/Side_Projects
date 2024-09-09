document.getElementById('add-btn').addEventListener('click', function() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();

    if (todoText !== "") {
        const todoList = document.getElementById('todo-list');
        const newTodoItem = document.createElement('li');
        newTodoItem.textContent = todoText;

        // 완료 체크 기능 추가
        newTodoItem.addEventListener('click', function() {
            this.classList.toggle('completed');
        });

        todoList.appendChild(newTodoItem);
        todoInput.value = "";
    } else {
        alert("write ur to do list!");
    }
});
