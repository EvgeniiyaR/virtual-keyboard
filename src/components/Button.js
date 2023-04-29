export default class Button {
  constructor(data, lang) {
    this._keys = Object.keys(data);
    this._en = data.en;
    this._ru = data.ru;
    this._lang = lang;
    // this._currentLang = 'ru';
    this._class = data.class;
    this._isSystem = data.isSystem;
    this._btn = document.createElement('button');
  }

  generateButton() {
    this._btn.className = this._class.join(' ');
    this._keys.forEach((key) => {
      if (this._lang === key) {
        key === 'en' ? this._btn.textContent = this._en : this._btn.textContent = this._ru;
      }
    })

    return this._btn;
  }

  // changeLang() {
  //   if (this._currentLang === 'ru') {
  //     this._currentLang === 'en'
  //   }
  //   else {
  //     this._currentLang === 'ru'
  //   }
  // }

  setListeners(textarea) {
    this._btn.addEventListener('click', () => {
      if (!this._isSystem) {
        textarea.textContent += this._btn.textContent;
      }
    })
  }
}