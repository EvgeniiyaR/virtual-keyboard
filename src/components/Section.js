export default class Section {
  constructor({ renderer }, container, lang) {
    this._container = container;
    this._renderer = renderer;
    this._lang = lang;
    this.listBtnLangChange = [];
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((initialBtn) => this._renderer(initialBtn, this._lang));
  }

  addItem(btn) {
    this._container.append(btn);
  }
}
