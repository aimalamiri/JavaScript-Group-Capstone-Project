import api from './Api.js';
import Modal from './Modal.js';

class MainUi {
  setup = async () => {
    await this.showList();
  };

  openComments = async (event) => {
    const idMeal = event.target.parentElement.dataset.mealId;
    const data = await api.getMeal(idMeal);
    const modal = new Modal(data);
    modal.open();
  };

  showItem = async (listElement, item) => {
    const liElement = `<li class="card" data-meal-id="${item.idMeal}">
      <img src="${item.strMealThumb}/preview" alt="${item.strMeal}  image">
      <div class="dish-name">
        <span>${item.strMeal}</span>
        <i class="fa-regular fa-heart"></i>
      </div>
      <div class="likes">n likes</div>
      <button type="button" class="main-button meal-comment"">Coments</button>
      <button type="button" class="main-button">Reservations</button>
    </li>`;
    listElement.insertAdjacentHTML('beforeend', liElement);
    const btnElement = listElement.lastChild.querySelector('button');
    btnElement.addEventListener('click', this.openComments);
  };

  showList = async () => {
    const dishes = await api.getByCategory('Chicken');
    const listElement = document.querySelector('#item-list');
    dishes.forEach((dish) => {
      this.showItem(listElement, dish);
    });
  };
}

const mainUi = new MainUi();

export default mainUi;
