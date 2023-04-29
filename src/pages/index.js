import {dataKeyboard} from '../utils/constants.js';
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
text.append(textarea);

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

const btnSection = new Section({
  renderer: (initialBtn, lang) => {
    const btn = new Button(initialBtn, lang);
    const btnElement = btn.generateButton();
    btnSection.addItem(btnElement);
    btn.setListeners(textarea);
  }
}, keyboard, 'en');

btnSection.renderItems(dataKeyboard);

textarea.addEventListener('keydown', (evt) => {
  console.log(evt.key);
})