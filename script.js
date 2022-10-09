//variables
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos); //to check if content is loaded in the page
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

//Functions

// function for adding the todos
function addTodo(e) {
  //Prevent natural behaviour / form from submitting
  e.preventDefault();

  //Create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create list LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  if(todoInput.value === ''){
    alert("You must add a task!");
  }
  else{
  //adding todo to local storage
  saveLocalTodos(todoInput.value);
  
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  todoInput.value = "";

  //Create Completed Button / check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);  //appending to the div

  //Create trash/delete button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);    //appending to the div

  //attach final Todo / append to list
  todoList.appendChild(todoDiv);
  }
}

// function for deleting the todos
function deleteTodo(e) {
  const item = e.target;

  //delete
  if (item.classList[0] === "trash-btn") {

    // e.target.parentElement.remove();
    const todo = item.parentElement;

    //animation
    todo.classList.add("fall");

    //at the end
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", e => {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

// function to filter our todos (all, completed, uncompleted)
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

//implementing local storage to save our todos
function saveLocalTodos(todo) {

  //check if there is already a todo there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //parsing back into the array
    todos = JSON.parse(localStorage.getItem("todos"));  
  }
  todos.push(todo);  
  //pushing to the todo
  localStorage.setItem("todos", JSON.stringify(todos));  
}


function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  //looping over the todo
  todos.forEach(function(todo) {

    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create list
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoInput.value = "";

    //Create Completed Button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //attach final Todo
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}


//to clear the local storage
//localStorage.clear();