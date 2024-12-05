import html from './message.html';
import './message.css';

const elements = [];
let body;
let modal;

export function closeModal() {
  console.log('Closing modal');
  modal.classList.add('hidden');
}

export function openModal() {
  console.log('Opening modal');
  modal = document.getElementsByClassName('js-widget-modal')[0];
  modal.classList.remove('hidden');
  setTimeout(() => {
    body.addEventListener('click', closeModal);
  }, 1000);
}

export function show(text) {
  // convert plain HTML string into DOM elements
  const temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByClassName('js-widget-dialog')[0].textContent = text;

  // append elements to body
  body = document.getElementsByTagName('body')[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  const widgetOverlay = document.getElementsByClassName('js-widget-overlay')[0];
  const widgetDialog = document.getElementsByClassName('js-widget-dialog')[0];

  widgetOverlay.addEventListener('click', openModal);
  widgetDialog.addEventListener('click', openModal);
  widgetOverlay.addEventListener('click', close);
  widgetDialog.addEventListener('click', close);
}

export function close() {
  while (elements.length > 0) {
    elements.pop().remove();
  }
  body.removeEventListener('click', close);
}
