export default class Section {
  constructor({ renderer }, selectorContainer) {
    this._selectorContainer = document.querySelector(selectorContainer);
    this._renderer = renderer;
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((initialBtn) => this._renderer(initialBtn));
  }
}