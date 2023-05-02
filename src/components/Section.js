export default class Section {
  constructor({ renderer }, container, lang) {
    this.container = container;
    this.renderer = renderer;
    this.lang = lang;
    this.listBtnLangChange = [];
  }

  renderItems(items) {
    this.items = items;
    this.items.forEach((initialBtn) => this.renderer(initialBtn, this.lang));
  }

  addItem(btn) {
    this.container.append(btn);
  }
}
