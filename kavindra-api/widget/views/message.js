import html from './message.html';
import './message.css';

const elements = [];
let body;

export function closeModalMenu() {
  const modal = document.getElementsByClassName('js-widget-modal-menu')[0];
  modal.style.display = 'none'
}

export function openModalMenu() {
  const modal = document.getElementsByClassName('js-widget-modal-menu')[0];
  modal.style.display = 'block';
  const modalCloseButton = document.getElementById('js-widget-modal-menu-close-button');
  setTimeout(() => {
    modalCloseButton.addEventListener('click', closeModalMenu);
  }, 500);
  const modalReportButton = document.getElementById('js-widget-modal-menu-bug-button');
  modalReportButton.addEventListener('click', openModalBugReport);
}

export function closeModalBugReport() {
  const modal = document.getElementsByClassName('js-widget-modal-bug-report')[0]
  modal.style.display = 'none';
  openModalMenu()
}

export function openModalBugReport() {
  closeModalMenu();
  const modal = document.getElementsByClassName('js-widget-modal-bug-report')[0]
  modal.style.display = 'block';
  const modalCloseButton = document.getElementById('js-widget-modal-bug-report-close-button');
  modalCloseButton.addEventListener('click', closeModalBugReport);
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

  widgetOverlay.addEventListener('click', openModalMenu);
  widgetDialog.addEventListener('click', openModalMenu);
}
