import './scss/index.scss';
import mainUi from './modules/MainUi.js';

window.onload = async() => {
  await mainUi.setup();
};

document.querySelector('#close-modal').addEventListener('click', () => {
  document.querySelector('#modal').classList.add('hidden');
});
