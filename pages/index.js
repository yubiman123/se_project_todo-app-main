import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

// Update counter function
const updateCounter = () => {
  const allTodos = todosList.querySelectorAll(".todo");
  const completedTodos = todosList.querySelectorAll(".todo__completed:checked");
  counterText.textContent = `Showing ${completedTodos.length} out of ${allTodos.length} completed`;
};

// Open and close modal functions
const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

// Generate a Todo and return its element
const generateTodo = (data) => {
  const todoInstance = new Todo(data, "#todo-template");
  return todoInstance.getView();
};

// Event listeners for opening/closing the add-todo modal
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Form submission to add a new todo
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  // Create new todo object with unique id and default completed state
  const values = { name, date, id };
  const todoElement = generateTodo(values);

  todosList.append(todoElement);
  closeModal(addTodoPopup);

  // Reset form
  addTodoForm.reset();
});

// Load initial todos
initialTodos.forEach((item) => {
  const todoElement = generateTodo(item);
  todosList.append(todoElement);
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();