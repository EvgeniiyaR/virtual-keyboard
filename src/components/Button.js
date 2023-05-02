export default class Button {
  constructor(data, lang, isCaps, textarea) {
    this._keys = Object.keys(data);
    this._en = data.en;
    this._ru = data.ru;
    this._keySystem = data.keySystem;
    this._lang = lang;
    this._class = data.class;
    this._isSystem = data.isSystem;
    this._btn = document.createElement('button');
    this._isCaps = isCaps;
    this._textarea = textarea;
  }

  generateButton() {
    this._btn.className = this._class.join(' ');
    this._keys.forEach((key) => {
      if (this._lang === key) {
        if (key === 'en') {
          if (this._isCaps === 'true' && this._isSystem === false) {
            this._btn.textContent = this._en.toUpperCase();
          } else {
            this._btn.textContent = this._en;
          }
        } else if (key === 'ru') {
          if (this._isCaps === 'true' && this._isSystem === false) {
            this._btn.textContent = this._ru.toUpperCase();
          } else {
            this._btn.textContent = this._ru;
          }
        }
      }
    })

    return this._btn;
  }

  _changeLang() {
    if (!this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Shift') {
      this._btn.classList.add('keyboard__btn_hover');
      localStorage.setItem('keyShift', true);
      localStorage.setItem('isShift', true);
    } else if (!this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Alt') {
      this._btn.classList.add('keyboard__btn_hover');
      localStorage.setItem('keyAlt', true);
    } else if (this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Shift') {
      this._btn.classList.remove('keyboard__btn_hover');
      localStorage.setItem('keyShift', false);
      localStorage.setItem('isShift', false);
    } else if (this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Alt') {
      this._btn.classList.remove('keyboard__btn_hover');
      localStorage.setItem('keyAlt', false);
    }

    if (localStorage.getItem('keyShift') === 'true' && localStorage.getItem('keyAlt') === 'true') {
      if (localStorage.getItem('language') === 'en') {
        localStorage.setItem('language', 'ru');
      } else {
        localStorage.setItem('language', 'en');
      }
    }
  }

  setListeners() {
    let timer = null;
    let index;

    this._btn.addEventListener('click', () => {
      this._textarea.focus();
      const char = this._btn.textContent;
      if (!this._isSystem) {
        if (localStorage.getItem('isShift') === 'true') {
          this._textarea.value += char.toUpperCase();
          localStorage.setItem('isShift', 'false');
          document.querySelector('.shift').classList.remove('keyboard__btn_hover');
        } else {
          this._textarea.value += char;
        }
      }
    })

    this._textarea.addEventListener('keydown', (evt) => {
      if (evt.key === this._btn.textContent || this._keySystem === evt.key) {
        this._btn.classList.add('keyboard__animation');
        clearTimeout(timer);
        timer = setTimeout(() => this._btn.classList.remove('keyboard__animation'), 300);
      }
      if (evt.key === 'Shift' || evt.key === 'Alt') this._changeLang();
    })

    if (this._btn.textContent === 'Backspace') {
      this._btn.addEventListener('click', () => {
        if (this._textarea.value.length >= 1) {
          this._textarea.value = this._textarea.value.slice(0, this._textarea.value.length - 1);
        }
      })
    }

    if (this._btn.textContent === 'Tab') {
      this._btn.addEventListener('click', () => {
        this._textarea.value += '	';
      })
    }

    if (this._btn.textContent === 'Enter') {
      this._btn.addEventListener('click', () => {
        this._textarea.value += '\n';
      })
    }

    if (this._btn.textContent === 'Del') {
      this._btn.addEventListener('click', () => {
        const text = this._textarea.value.split('');
        index = this._textarea.selectionStart;
        text.splice(index, 1);
        this._textarea.value = text.join('');
        this._textarea.selectionEnd = index;
        this._textarea.selectionStart = index;
      })
    }

    if (this._btn.textContent === '⮜') {
      this._btn.addEventListener('click', () => {
        this._textarea.selectionEnd -= 1;
      })
    }

    if (this._btn.textContent === '⮞') {
      this._btn.addEventListener('click', () => {
        this._textarea.selectionStart += 1;
      })
    }

    if (this._btn.textContent === '⮝') {
      this._btn.addEventListener('click', () => {
        this._textarea.selectionEnd -= 1;
      })
    }

    if (this._btn.textContent === '⮟') {
      this._btn.addEventListener('click', () => {
        this._textarea.selectionStart += 1;
      })
    }

    if (this._btn.textContent === 'Shift' || this._btn.textContent === 'Alt') {
      this._btn.addEventListener('click', () => this._changeLang());
    }

    if (this._btn.textContent === 'Caps Lock') {
      this._btn.addEventListener('click', () => {
        if (!localStorage.getItem('isCaps')) {
          this._btn.classList.add('keyboard__btn_hover');
          localStorage.setItem('isCaps', true);
        } else if (localStorage.getItem('isCaps') === 'true') {
          this._btn.classList.remove('keyboard__btn_hover');
          localStorage.setItem('isCaps', false);
        } else if (localStorage.getItem('isCaps') === 'false') {
          this._btn.classList.add('keyboard__btn_hover');
          localStorage.setItem('isCaps', true);
        }
      })
    }
  }
}
