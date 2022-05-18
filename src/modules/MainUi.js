import api from './Api.js';

class MainUi {
  setup = async () => {
    await this.showList();
  };

  openComments = async (event) => {
    const { idmeal } = event.target.parentElement.dataset;
    console.log(await api.getMeal(idmeal));
  };

  showItem = async (listElement, item) => {
    const liElement = `<li class="card" data-idmeal="${item.idMeal}">
      <img src="${item.strMealThumb}/preview" alt="${item.strMeal}  image">
      <div class="dish-name">
        <span>${item.strMeal}</span>
        <i class="fa-regular fa-heart"></i>
      </div>
      <div class="likes">n likes</div>
      <button type="button" class="main-button">Coments</button>
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
