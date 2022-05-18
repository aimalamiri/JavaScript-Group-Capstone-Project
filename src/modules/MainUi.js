import api from './Api.js';

class MainUi {
  setup = async () => {
    await this.showList();
    this.idApp = await api.createApp(); 
    await this.showLikes();
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

  showLike = async (element, likes) => {
    let likeElement = element;
    if (element.nodeName === 'LI') {
      likeElement = element.querySelector('.likes');
    }
    const { idmeal } = likeElement.parentElement.dataset;
    const like = likes.find((item) => item.item_id === idmeal) || {};
    const count = like.likes || 0;
    likeElement.textContent = `${count} Likes`;
  }

  showLikes = async () => {
    const likes = await api.getLikes(this.idApp);
    const listElement = document.querySelector('#item-list');
    const likesList = listElement.querySelectorAll('.likes');
    likesList.forEach((likeElement) => { this.showLike(likeElement, likes) });
  }
}

const mainUi = new MainUi();

export default mainUi;
