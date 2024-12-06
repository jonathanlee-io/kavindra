import html from './message.html';
import './message.css';

const elements = [];
let body;

export function closeModal() {
  console.log('Closing modal');
  body.removeEventListener('click', closeModal);
  const modal = document.getElementsByClassName('js-widget-modal')[0];
  modal.style.visibility = 'hidden';
}

export function openModal() {
  console.log('Opening modal');
  const modal = document.getElementsByClassName('js-widget-modal')[0];
  modal.style.visibility = 'visible';
  const modalCloseButton = document.getElementById('js-widget-modal-close-button');
  modalCloseButton.addEventListener('click', closeModal);
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
}
