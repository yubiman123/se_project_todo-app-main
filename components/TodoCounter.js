class TodoCounter {
  constructor(counterSelector, initialTodos = []) {
    this._counterEl = document.querySelector(counterSelector);
    this._total = initialTodos.length;
    this._completed = initialTodos.filter((todo) => todo.completed).length;
    this._render();
  }

  updateTotal(isAdd) {
    this._total += isAdd ? 1 : -1;
    this._render();
  }

  updateCompleted(isCompleted) {
    this._completed += isCompleted ? 1 : -1;
    this._render();
  }

  _render() {
    this._counterEl.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
