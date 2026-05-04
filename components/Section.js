class Section {
  constructor({ items = [], renderer, containerSelector }) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(domNode) {
    this._container.append(domNode);
  }
}

export default Section;
