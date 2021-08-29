// select the todo form
const todoForm = document.querySelector(".form");
// select the todo text box
const todoText = document.querySelector(".todo-text");

// select the list with class="todo-items"
const todoList = document.querySelector(".todo-items");

// array which stores every todos
let todos = [];

todoForm.addEventListener("submit", function (event) {
  // prevent the page from reloading when submitting the form
  event.preventDefault();
  createTodo(todoText.value); // call createTodo function with input box current value
});

// function to add todo
function createTodo(item) {
  // check if item is not empty
  if (item !== "") {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false,
    };

    // push it to todos array
    todos.push(todo);
    addTodoItemToLocalStorage(todos); //  store the todo in localStorage

    //reinitialize the todo input
    todoText.value = "";
  }
}

// function to display todos
function displayTodos(todos) {
  // reinitialize the todo list
  todoList.innerHTML = "";

  // loop through each item in the todos
  todos.forEach(function (item) {
    // check if the todo item status is completed or not
    const checked = item.completed ? "checked" : null;

    // create a list element
    const li = document.createElement("li");
    // set attributes for the list items
    li.setAttribute("class", "item");
    li.setAttribute("data-key", item.id);
    // Add class to todo item if it is completed
    if (item.completed === true) {
      li.classList.add("checked");
    }

    li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        <b>${item.name}</b>
        <button class="btn btn-danger delete-button ml-auto">
          <i class="fa fa-trash" aria-hidden="true"></i>
        </button>
          <hr/>
    `;
    // append the <li> list to the <ul> tag
    todoList.append(li);
  });
}

// function to add todos to local storage
function addTodoItemToLocalStorage(todos) {
  // atringify the array
  localStorage.setItem("todos", JSON.stringify(todos));
  // display it to screen
  displayTodos(todos);
}

// fetch from local storage
function getFromLocalStorage() {
  const checkReference = localStorage.getItem("todos");
  // if check if reference exists
  if (checkReference) {
    // converts back to array and store in todos array
    todos = JSON.parse(checkReference);
    displayTodos(todos);
  }
}

// toggle to apecify if a todo is completed or not
function toggle(id) {
  todos.forEach(function (item) {
    if (item.id == id) {
      // negate the value(toggle)
      item.completed = !item.completed;
    }
  });
  addTodoItemToLocalStorage(todos);
}

// deletes a todo from todos array
function deleteTodo(id) {
  todos = todos.filter(function (item) {
    return item.id != id;
  });

  // update the localStorage
  addTodoItemToLocalStorage(todos);
}

// initially fetch items from localStorage
getFromLocalStorage();

todoList.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    // change between the state
    toggle(event.target.parentElement.getAttribute("data-key"));
  }

  // check if that is a delete-button
  if (event.target.classList.contains("delete-button")) {
    deleteTodo(event.target.parentElement.getAttribute("data-key"));
  }
});
