"use strict";

titleName("Todo");

function saveTodo() {
  saveDataLocalStore(KEY_USERS_TODO, JSON.stringify(todoArr));
  displayTodo(todoArr);
}

// Hàm thêm và hiển thị
function displayTodo(todoArr) {
  document.getElementById("todo-list").innerHTML = "";

  todoArr.forEach((element, i, arr) => {
    if (element.owner === currentUser.username) {
      const li = document.createElement("li");
      li.innerText = element.task;
      li.addEventListener("click", () => {
        element.isDone = !element.isDone;

        saveTodo(todoArr);
      });

      if (element.isDone === true) {
        li.classList.toggle("checked");
      }

      const x = document.createElement("span");
      x.classList.add("close");
      x.innerText = "x";
      x.addEventListener("click", (event) => {
        event.stopPropagation();

        if (confirm("Do you want to delete?")) {
          arr.splice(i, 1);
          saveTodo(todoArr);
        }
      });

      li.appendChild(x);

      document.getElementById("todo-list").appendChild(li);
    }
  });
}

// Thực hiện Todo
function todo() {
  const inputTask = document.getElementById("input-task");

  if (currentUser !== false) {
    if (inputTask.value.trim()) {
      const currentTodo = new Task(
        inputTask.value.trim(),
        currentUser.username
      );

      todoArr.push(currentTodo);
      saveTodo();
      inputTask.value = "";
    } else {
      alert("Cannot be left blank");
    }
  } else {
    alert("Please log in");
  }
}

// Click add button
document.getElementById("btn-add").addEventListener("click", todo);

displayTodo(todoArr);
