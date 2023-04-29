export default class Button {
  constructor(data, lang) {
    this._en = data.en;
    this._ru = data.ru;
    this._lang = lang;
    this._class = data.class;
    this._isSystem = data.isSystem;
    this._btn = document.createElement('button');
  }

  generateButton() {
    this._btn.className = this._class.join(' ');
    if (this._lang === this._en) {
      this._btn.textContent = this._en;
    } else {
      this._btn.textContent = this._ru;
    }

    return this._btn;
  }

  setListeners(textarea) {
    this._btn.addEventListener('click', () => {
      if (!item.isSystem) {
        textarea.textContent += this._btn.textContent;
      }
    })
  }
}