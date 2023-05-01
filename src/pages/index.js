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
textarea.setAttribute('placeholder', 'Shift + Alt - смена языка');
text.append(textarea);

localStorage.setItem('keyShift', false);
localStorage.setItem('keyAlt', false);

if (!localStorage.getItem('language')) {
  localStorage.setItem('language', 'en');
  localStorage.setItem('text', '');
}

// dataKeyboard.forEach((item) => {
//   const btn = document.createElement('button');
//   btn.className = item.class.join(' ');
//   btn.textContent = item.en;
//   keyboard.append(btn);
//   btn.addEventListener('click', () => {
//     if (!item.isSystem) {
//       textarea.textContent += btn.textContent;
//     }
//   })
// })

const localStartLang = localStorage.getItem('language');
const localStartIsCaps = localStorage.getItem('isCaps');
localStorage.setItem('isShift', 'false');

textarea.value = localStorage.getItem('text');

const btnSection = new Section({
  renderer: (initialBtn, lang) => {
    const btn = new Button(initialBtn, lang, localStorage.getItem('isCaps'));
    const btnElement = btn.generateButton();
    btnSection.addItem(btnElement);
    btn.setListeners(textarea);
  }
}, keyboard, localStorage.getItem('language'));

btnSection.renderItems(dataKeyboard);

setInterval(() => {
  localStorage.getItem('language');
  localStorage.setItem('text', textarea.value);
  if (localStartLang !== localStorage.getItem('language')) {
    location.reload();
  }
  if (localStartIsCaps !== localStorage.getItem('isCaps')) {
    location.reload();
  }
}, 500)
