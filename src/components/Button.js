export default class Button {
  constructor(data, lang, isCaps, textarea) {
    this.keys = Object.keys(data);
    this.en = data.en;
    this.ru = data.ru;
    this.keySystem = data.keySystem;
    this.lang = lang;
    this.class = data.class;
    this.isSystem = data.isSystem;
    this.code = data.keyCode;
    this.btn = document.createElement('button');
    this.isCaps = isCaps;
    this.textarea = textarea;
  }

  generateButton() {
    this.btn.className = this.class.join(' ');
    this.keys.forEach((key) => {
      if (this.lang === key) {
        if (key === 'en') {
          if (this.isCaps === 'true' && this.isSystem === false) {
            this.btn.textContent = this.en.toUpperCase();
          } else {
            this.btn.textContent = this.en;
          }
        } else if (key === 'ru') {
          if (this.isCaps === 'true' && this.isSystem === false) {
            this.btn.textContent = this.ru.toUpperCase();
          } else {
            this.btn.textContent = this.ru;
          }
        }
      }
    });

    return this.btn;
  }

  changeLang() {
    if (!this.btn.classList.contains('keyboard__btn_hover') && this.btn.textContent === 'Ctrl') {
      this.btn.classList.add('keyboard__btn_hover');
      localStorage.setItem('keyCtrl', true);
    } else if (!this.btn.classList.contains('keyboard__btn_hover') && this.btn.textContent === 'Alt') {
      this.btn.classList.add('keyboard__btn_hover');
      localStorage.setItem('keyAlt', true);
    } else if (this.btn.classList.contains('keyboard__btn_hover') && this.btn.textContent === 'Ctrl') {
      this.btn.classList.remove('keyboard__btn_hover');
      localStorage.setItem('keyCtrl', false);
    } else if (this.btn.classList.contains('keyboard__btn_hover') && this.btn.textContent === 'Alt') {
      this.btn.classList.remove('keyboard__btn_hover');
      localStorage.setItem('keyAlt', false);
    }

    if (localStorage.getItem('keyCtrl') === 'true' && localStorage.getItem('keyAlt') === 'true') {
      if (localStorage.getItem('language') === 'en') {
        localStorage.setItem('language', 'ru');
      } else {
        localStorage.setItem('language', 'en');
      }
    }
  }

  deleteChar(isDel) {
    let index;
    const text = this.textarea.value.split('');
    if (isDel) {
      index = this.textarea.selectionStart;
    } else {
      index = this.textarea.selectionStart - 1;
    }
    text.splice(index, 1);
    this.textarea.value = text.join('');
    this.textarea.selectionEnd = index;
    this.textarea.selectionStart = index;
  }

  setBtnLogic(char, spaces = 1) {
    const text = this.textarea.value.split('');
    const index = this.textarea.selectionEnd;
    text.splice(index, 0, char);
    this.textarea.value = text.join('');
    this.textarea.selectionEnd = index + spaces;
    this.textarea.selectionStart = index + spaces;
  }

  setMoveRight() {
    this.textarea.selectionStart += 1;
  }

  setMoveLeft() {
    this.textarea.selectionEnd -= 1;
  }

  setCaps() {
    if (!localStorage.getItem('isCaps')) {
      this.btn.classList.add('keyboard__btn_hover');
      localStorage.setItem('isCaps', true);
    } else if (localStorage.getItem('isCaps') === 'true') {
      this.btn.classList.remove('keyboard__btn_hover');
      localStorage.setItem('isCaps', false);
    } else if (localStorage.getItem('isCaps') === 'false') {
      this.btn.classList.add('keyboard__btn_hover');
      localStorage.setItem('isCaps', true);
    }
  }

  setLetterAndShift() {
    this.textarea.focus();
    const char = this.btn.textContent;
    const text = this.textarea.value.split('');
    const index = this.textarea.selectionEnd;
    if (!this.isSystem) {
      if (localStorage.getItem('isShift') === 'true') {
        text.splice(index, 0, char.toUpperCase());
        this.textarea.value = text.join('');
        this.textarea.selectionEnd = index + 1;
        this.textarea.selectionStart = index + 1;
        localStorage.setItem('isShift', 'false');
        document.querySelector('.shift').classList.remove('keyboard__btn_hover');
      } else {
        text.splice(index, 0, char);
        this.textarea.value = text.join('');
        this.textarea.selectionEnd = index + 1;
        this.textarea.selectionStart = index + 1;
      }
    }
  }

  setListeners() {
    let timer = null;

    this.btn.addEventListener('click', () => this.setLetterAndShift());

    this.textarea.addEventListener('keydown', (evt) => {
      evt.preventDefault();
      if (evt.key === this.btn.textContent || this.keySystem === evt.key) {
        this.btn.classList.add('keyboard__animation');
        clearTimeout(timer);
        timer = setTimeout(() => this.btn.classList.remove('keyboard__animation'), 300);
      }
      if (evt.ctrlKey && evt.altKey) this.changeLang();
      if (this.keySystem === evt.key) {
        if (evt.key === 'Backspace') this.deleteChar(false);
        if (evt.key === 'Tab') this.setBtnLogic('    ', 4);
        if (evt.key === 'Enter') this.setBtnLogic('\n');
        if (evt.key === 'Delete') this.deleteChar(true);
        if (evt.key === 'ArrowLeft') this.setMoveLeft();
        if (evt.key === 'ArrowUp') this.setBtnLogic('⮝');
        if (evt.key === 'ArrowRight') this.setMoveRight();
        if (evt.key === 'ArrowDown') this.setBtnLogic('⮟');
        if (evt.key === 'CapsLock') this.setCaps();
        if (evt.key === 'Shift') {
          localStorage.setItem('isShift', 'true');
          document.querySelector('.shift').classList.add('keyboard__btn_hover');
        }
      }
      if (this.keySystem === evt.key && evt.key !== 'Shift') {
        localStorage.setItem('isShift', 'false');
        document.querySelector('.shift').classList.remove('keyboard__btn_hover');
      }
      if (this.keySystem !== evt.key) {
        if (!this.isSystem && evt.code === this.code) this.setLetterAndShift();
      }
    });

    if (this.btn.textContent === 'Backspace') {
      this.btn.addEventListener('click', () => this.deleteChar(false));
    }

    if (this.btn.textContent === 'Tab') {
      this.btn.addEventListener('click', () => this.setBtnLogic('    ', 4));
    }

    if (this.btn.textContent === 'Enter') {
      this.btn.addEventListener('click', () => this.setBtnLogic('\n'));
    }

    if (this.btn.textContent === 'Del') {
      this.btn.addEventListener('click', () => this.deleteChar(true));
    }

    if (this.btn.textContent === '⮜') {
      this.btn.addEventListener('click', () => this.setMoveLeft());
    }

    if (this.btn.textContent === '⮞') {
      this.btn.addEventListener('click', () => this.setMoveRight());
    }

    if (this.btn.textContent === '⮟') {
      this.btn.addEventListener('click', () => this.setBtnLogic('⮟'));
    }

    if (this.btn.textContent === '⮝') {
      this.btn.addEventListener('click', () => this.setBtnLogic('⮝'));
    }

    if (this.btn.textContent === 'Ctrl' || this.btn.textContent === 'Alt') {
      this.btn.addEventListener('click', () => this.changeLang());
    }

    if (this.btn.textContent === 'Caps Lock') {
      this.btn.addEventListener('click', () => this.setCaps());
    }

    if (this.btn.textContent === 'Shift') {
      this.btn.addEventListener('click', () => {
        if (localStorage.getItem('isShift') === 'true') {
          localStorage.setItem('isShift', 'false');
          document.querySelector('.shift').classList.remove('keyboard__btn_hover');
        } else if (localStorage.getItem('isShift') === 'false') {
          localStorage.setItem('isShift', 'true');
          document.querySelector('.shift').classList.add('keyboard__btn_hover');
        }
      });
    }
  }
}
