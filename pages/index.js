import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

const updateCounter = () => {
  const allTodos = todosList.querySelectorAll(".todo");
  const completedTodos = todosList.querySelectorAll(".todo__completed:checked");
  counterText.textContent = `Showing ${completedTodos.length} out of ${allTodos.length} completed`;
};

const handleDelete = (id) => {
  const todoElement = document.querySelector(`#todo-${id}`).closest(".todo");
  todoElement.remove();
  updateCounter();
};

const handleToggle = () => {
  updateCounter();
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscape);
};

const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
};

const generateTodo = (data, handleDelete, handleToggle) => {
  const todoInstance = new Todo(data, "#todo-template", handleDelete, handleToggle);
  return todoInstance.getView();
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = crypto.randomUUID();

  const values = { name, date, id };
  const todoElement = generateTodo(values, handleDelete, handleToggle);

  todosList.append(todoElement);
  closeModal(addTodoPopup);

  addTodoForm.reset();
  newTodoValidator.resetValidation();
});

const nameInput = addTodoForm.querySelector("#todo-name");
nameInput.addEventListener("keydown", (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    addTodoForm.dispatchEvent(new Event("submit"));
  }
});

initialTodos.forEach((item) => {
  const todoElement = generateTodo(item, handleDelete, handleToggle);
  todosList.append(todoElement);
});

updateCounter();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();