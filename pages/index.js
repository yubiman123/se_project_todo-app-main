import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForms from "../components/PopupWithForms.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupSelector = "#add-todo-popup";
const addTodoForm = document.querySelector("#add-todo-popup .popup__form");
const todosListSelector = ".todos__list";
const counterSelector = ".counter__text";

const todoCounter = new TodoCounter(counterSelector, initialTodos);

const handleDelete = (id, wasCompleted) => {
  if (!todoElement) {
    return;
  }
  todoElement.remove();
  todoCounter.updateTotal(false);
  if (wasCompleted) {
    todoCounter.updateCompleted(false);
  }
};

const handleToggle = (isCompleted) => {
  todoCounter.updateCompleted(isCompleted);
};

const renderTodo = (todoData) => {
  const todo = new Todo(todoData, "#todo-template", handleDelete, handleToggle);
  section.addItem(todo.getView());
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    renderTodo(item);
  },
  containerSelector: todosListSelector,
});

const popupWithForm = new PopupWithForms(
  addTodoPopupSelector,
  (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;
    const date = dateInput ? new Date(dateInput) : null;
    if (date && !isNaN(date)) {
      date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    }
    const id = uuidv4();
    const todoData = { name, date, id, completed: false };
    renderTodo(todoData);
    todoCounter.updateTotal(true);
    newTodoValidator.resetValidation();
    popupWithForm.close();
  },
);
popupWithForm.setEventListeners();

addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

section.renderItems();

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
