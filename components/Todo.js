class Todo {
  constructor(data, selector, handleDelete, handleToggle) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._todoElement = null;
    this._todoCheckboxEl = null;
    this._todoLabel = null;
    this._handleDelete = handleDelete;
    this._handleToggle = handleToggle;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleToggle(this._data.completed);
    });

    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoDeleteBtn.addEventListener("click", () => {
      this._handleDelete(
        this._todoElement,
        this._data.id,
        this._data.completed,
      );
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;
    if (this._data.date) {
      todoDate.textContent = this._data.date.toLocaleDateString();
    } else {
      todoDate.textContent = "";
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
