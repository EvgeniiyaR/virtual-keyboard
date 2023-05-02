import dataKeyboard from '../utils/constants.js';
import Button from '../components/Button.js';
import Section from '../components/Section.js';

const body = document.querySelector('.body');
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
body.append(wrapper);

const text = document.createElement('form');
text.className = 'text';
wrapper.append(text);

const keyboard = document.createElement('section');
keyboard.className = 'keyboard';
keyboard.ariaLabel = 'virtual keyboard';
wrapper.append(keyboard);

const textarea = document.createElement('textarea');
textarea.rows = '5';
textarea.cols = '85';
textarea.setAttribute('autofocus', 'true');
textarea.setAttribute('placeholder', 'Ctrl + Alt - смена языка, Windows 10');
text.append(textarea);

localStorage.setItem('keyCtrl', false);
localStorage.setItem('keyAlt', false);
localStorage.setItem('isShift', false);

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
  localStorage.setItem('text', '');
}

const localStartLang = localStorage.getItem('language');
const localStartIsCaps = localStorage.getItem('isCaps');

textarea.value = localStorage.getItem('text');

const btnSection = new Section({
  renderer: (initialBtn, lang) => {
    const btn = new Button(initialBtn, lang, localStorage.getItem('isCaps'), textarea);
    const btnElement = btn.generateButton();
    btnSection.addItem(btnElement);
    btn.setListeners();
  },
}, keyboard, localStorage.getItem('language'));

btnSection.renderItems(dataKeyboard);

setInterval(() => {
  localStorage.getItem('language');
  localStorage.setItem('text', textarea.value);
  if (localStartLang !== localStorage.getItem('language')) {
    window.location.reload();
  }
  if (localStartIsCaps !== localStorage.getItem('isCaps')) {
    window.location.reload();
  }
}, 500);
