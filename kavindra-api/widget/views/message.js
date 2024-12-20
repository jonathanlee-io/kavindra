import html from './message.html';
import './message.css';

const elements = [];
let body;
let project;

export function closeModalMenuCallback(_event) {
  closeModalMenu();
}

export function openModalMenuCallback(_event) {
  openModalMenu();
}

export function closeModalMenu() {
  const modal = document.getElementsByClassName('js-widget-modal-menu')[0];
  modal.style.display = 'none'

  const oldWidgetOverlay = document.getElementsByClassName('js-widget-overlay')[0];
  const oldWidgetDialog = document.getElementsByClassName('js-widget-dialog')[0];
  const widgetOverlay = oldWidgetOverlay.cloneNode(true);
  const widgetDialog = oldWidgetDialog.cloneNode(true);
  widgetOverlay.addEventListener('click', (_event) => openModalMenuCallback(_event));
  widgetDialog.addEventListener('click', (_event) => openModalMenuCallback(_event));
  oldWidgetOverlay.parentNode.replaceChild(widgetOverlay, oldWidgetOverlay);
  oldWidgetDialog.parentNode.replaceChild(widgetDialog, oldWidgetDialog);
}

export function openModalMenu() {
  const modal = document.getElementsByClassName('js-widget-modal-menu')[0];
  const modalContent = document.getElementsByClassName('js-widget-modal-content')[0];
  modal.style.display = 'flex';
  modalContent.style.display = 'flex';
  const modalCloseButton = document.getElementById('js-widget-modal-menu-close-button');
  const widgetOverlay = document.getElementsByClassName('js-widget-overlay')[0];
  const widgetDialog = document.getElementsByClassName('js-widget-dialog')[0];
  setTimeout(() => {
    modalCloseButton.addEventListener('click', closeModalMenu);
    widgetOverlay.addEventListener('click', (_event) => closeModalMenu());
    widgetDialog.addEventListener('click', (_event) => closeModalMenu());
  }, 300);
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
  temporary.getElementsByClassName('js-widget-dialog')[0].textContent = 'Provide Feedback';

  // append elements to body
  body = document.getElementsByTagName('body')[0];
  while (temporary.children.length > 0) {
    elements.push(temporary.children[0]);
    body.appendChild(temporary.children[0]);
  }

  const widgetOverlay = document.getElementsByClassName('js-widget-overlay')[0];
  const widgetDialog = document.getElementsByClassName('js-widget-dialog')[0];

  project = params.project;

  widgetOverlay.addEventListener('click', (_event) => openModalMenuCallback(_event));
  widgetDialog.addEventListener('click', (_event) => openModalMenuCallback(_event));
}
