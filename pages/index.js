import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupSelector = "#add-todo-popup";
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");
const todosListSelector = ".todos__list";
const counterSelector = ".counter__text";

/* ---------- Counter ---------- */
const todoCounter = new TodoCounter(counterSelector, initialTodos);

/* ---------- Handlers ---------- */
const handleDelete = (id, wasCompleted) => {
  const todoElement = document.querySelector(`#todo-${id}`).closest(".todo");
  todoElement.remove();
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
};

const handleToggle = (isCompleted) => {
  todoCounter.updateCompleted(isCompleted);
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

// Helper to toggle a button state based on inputs and config
const toggleButtonState = (inputList, buttonElement, config) => {
  const hasInvalid = inputList.some((input) => !input.validity.valid);
  if (hasInvalid) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

/* ---------- Todo creation ---------- */
const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = new Todo(
      item,
      "#todo-template",
      (id) => handleDelete(id, item.completed),
      (isChecked) => handleToggle(isChecked),
    );
    section.addItem(todo.getView());
  },
  containerSelector: todosListSelector,
});

/* ---------- Events ---------- */

const popupWithForm = new PopupWithForm(addTodoPopupSelector, (inputValues) => {
  const name = inputValues.name;
  const dateInput = inputValues.date;
  // TripleTen style: check if dateInput has a value before creating the Date
  const date = dateInput ? new Date(dateInput) : null;
  if (date) {
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  }
  const id = uuidv4();
  const todoData = { name, date, id, completed: false };
  const todo = new Todo(
    todoData,
    "#todo-template",
    (id) => handleDelete(id, false),
    (isChecked) => handleToggle(isChecked),
  );
  section.addItem(todo.getView());
  todoCounter.updateTotal(true);
  addTodoForm.reset();
  newTodoValidator.resetValidation();
  popupWithForm.close();
});
popupWithForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

/* ---------- Init ---------- */
section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
