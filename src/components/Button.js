export default class Button {
  constructor(data, lang) {
    this._keys = Object.keys(data);
    this._en = data.en;
    this._ru = data.ru;
    this._keySystem = data.keySystem;
    this._lang = lang;
    // this._currentLang = 'ru';
    this._class = data.class;
    this._isSystem = data.isSystem;
    this._case = 'low';
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
      textarea.focus();
      if (!this._isSystem) {
        textarea.value += this._btn.textContent;
      }
    })

    let timer = null;
    textarea.addEventListener('keydown', (evt) => {
      if (evt.key === this._btn.textContent || this._keySystem === evt.key) {
        this._btn.classList.add('keyboard__animation');
        clearTimeout(timer);
        timer = setTimeout(() => this._btn.classList.remove('keyboard__animation'), 300);
      }
    })

    if (this._btn.textContent === 'Backspace') {
      this._btn.addEventListener('click', () => {
        if (textarea.value.length >= 1) {
          textarea.value = textarea.value.slice(0, textarea.value.length - 1);
        }
      })
    }

    if (this._btn.textContent === 'Tab') {
      this._btn.addEventListener('click', () => {
        textarea.value += '	';
      })
    }

    if (this._btn.textContent === 'Enter') {
      this._btn.addEventListener('click', () => {
        textarea.value += '\n';
      })
    }

    if (this._btn.textContent === 'Del') {
      this._btn.addEventListener('click', () => {
        textarea.value = textarea.value.slice(0, textarea.selectionStart);
        // console.log(textarea.value.length);
        // console.log(textarea.selectionStart);
        // console.log(textarea.selectionEnd);
        // textarea.setRangeText('ПРИВЕТ', textarea.selectionStart, textarea.selectionEnd, 'end');
        // textarea.selectionEnd
      })
    }

    if (this._btn.textContent === '⮜') {
      this._btn.addEventListener('click', () => {
        // console.log(textarea.value.length);
        textarea.selectionEnd -= 1;
        // const a = textarea.value.length - textarea.selectionEnd;
        // console.log(a);
      })
    }

    if (this._btn.textContent === '⮞') {
      this._btn.addEventListener('click', () => {
        // console.log(textarea.value.length);
        textarea.selectionStart += 1;
        // const a = textarea.value.length - textarea.selectionStart;
        // console.log(a);
      })
    }

    if (this._btn.textContent === 'Shift' || this._btn.textContent === 'Alt') {
      this._btn.addEventListener('click', () => {
        if (!this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Shift') {
          this._btn.classList.add('keyboard__btn_hover');
          localStorage.setItem('keyShift', true);
        } else if (!this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Alt') {
          this._btn.classList.add('keyboard__btn_hover');
          localStorage.setItem('keyAlt', true);
        } else if (this._btn.classList.contains('keyboard__btn_hover') && this._btn.textContent === 'Shift') {
          this._btn.classList.remove('keyboard__btn_hover');
          localStorage.setItem('keyShift', false);
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
      })
    }
  }
}
