import html from './message.html';
import './message.css';

const elements = [];
let body;
let project;

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
  if (project.isBugReportsEnabled) {
    const modalReportButton = document.getElementById('js-widget-modal-menu-bug-button');
    modalReportButton.addEventListener('click', (_event) => openInnerModalMenu('js-widget-modal-bug-report', 'js-widget-modal-bug-report-close-button'));
    modalReportButton.style.display = 'block';
  }
  if (project.isFeatureRequestsEnabled) {
    const modalFeatureRequestButton = document.getElementById('js-widget-modal-menu-feature-request-button');
    modalFeatureRequestButton.addEventListener('click', (_event) => openInnerModalMenu('js-widget-modal-feature-request', 'js-widget-modal-feature-request-close-button'));
    modalFeatureRequestButton.style.display = 'block';
  }
  if (project.isFeatureFeedbackEnabled) {
    const modalFeatureFeedbackButton = document.getElementById('js-widget-modal-menu-feature-feedback-button');
    modalFeatureFeedbackButton.addEventListener('click', (_event) => openInnerModalMenu('js-widget-modal-feature-feedback', 'js-widget-modal-feature-feedback-close-button'));
    modalFeatureFeedbackButton.style.display = 'block';
  }
}

export function openInnerModalMenu(modalClassName, modalCloseButtonId) {
  closeModalMenu();
  const modal = document.getElementsByClassName(modalClassName)[0]
  modal.style.display = 'block';
  const modalCloseButton = document.getElementById(modalCloseButtonId);
  modalCloseButton.addEventListener('click', closeInnerModalMenu, false);
  modalCloseButton.modalClassName = modalClassName;
}

export function closeInnerModalMenu(event) {
  const modal = document.getElementsByClassName(event.currentTarget.modalClassName)[0];
  modal.style.display = 'none';
  openModalMenu();
}

export function show(params) {
  // convert plain HTML string into DOM elements
  const temporary = document.createElement('div');
  temporary.innerHTML = html;
  temporary.getElementsByClassName('js-widget-dialog')[0].textContent = `Provide Feedback on ${params.project.name}`;

  // append elements to body
  body = document.getElementsByTagName('body')[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  const widgetOverlay = document.getElementsByClassName('js-widget-overlay')[0];
  const widgetDialog = document.getElementsByClassName('js-widget-dialog')[0];

  project = params.project;

  widgetOverlay.addEventListener('click', (_event) => openModalMenu());
  widgetDialog.addEventListener('click', (_event) => openModalMenu());
}
