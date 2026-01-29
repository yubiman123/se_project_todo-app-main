import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseButton = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");
const counterText = document.querySelector(".counter__text");

/* ---------- Counter ---------- */
const updateCounter = () => {
  const allTodos = todosList.querySelectorAll(".todo");
  const completedTodos = todosList.querySelectorAll(
    ".todo__completed:checked"
  );
  counterText.textContent = `Showing ${completedTodos.length} out of ${allTodos.length} completed`;
};

/* ---------- Handlers ---------- */
const handleDelete = (id) => {
  const todoElement = document
    .querySelector(`#todo-${id}`)
    .closest(".todo");
  todoElement.remove();
  updateCounter();
};

const handleToggle = () => {
  updateCounter();
};

/* ---------- Modal helpers ---------- */
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    closeModal(addTodoPopup);
  }
};

const openModal = (modal) => {
  modal.classList.add("popup_visible");
  document.addEventListener("keydown", handleEscape);
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
  document.removeEventListener("keydown", handleEscape);
};

/* ---------- Todo creation ---------- */
const generateTodo = (data, onDelete, onToggle) => {
  const todo = new Todo(data, "#todo-template", onDelete, onToggle);
  return todo.getView();
};

const renderTodo = (item) => {
  const todoElement = generateTodo(item, handleDelete, handleToggle);
  todosList.append(todoElement);
};

/* ---------- Events ---------- */
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseButton.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();

  renderTodo({ name, date, id, completed: false });

  closeModal(addTodoPopup);
  addTodoForm.reset();
  newTodoValidator.resetValidation();
  updateCounter();
});

/* ---------- Init ---------- */
initialTodos.forEach(renderTodo);
updateCounter();

const newTodoValidator = new FormValidator(
  validationConfig,
  addTodoForm
);
newTodoValidator.enableValidation();