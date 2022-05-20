import api from './Api.js';
import mealCount from './mealCount.js';
import Modal from './Modal.js';
import { INVOLVEMENT_API_KEY, DEFAULT_CATEGORY } from './environment.js';
import errorImg from '../images/logo.png';

class MainUi {
  setup = async () => {
    await this.showCategory();
    await this.showList(DEFAULT_CATEGORY);
    this.idApp = INVOLVEMENT_API_KEY || (await api.createApp());
    await this.showLikes();
  };

  openComments = async (event) => {
    const idMeal = event.target.closest('li').dataset.mealId;
    const data = await api.getMeal(idMeal);
    const modal = new Modal(data);
    modal.open();
  };

  addLike = async (event) => {
    const likeBtn = event.target;
    const liElement = likeBtn.closest('li').closest('li');
    const { mealId } = liElement.dataset;
    await api.addLike(this.idApp, mealId);
    const likes = await api.getLikes(this.idApp);
    await this.showLike(liElement, likes);
  };

  insertCategory = async (category) => {
    const html = `
        <div class="category-image" style="background-image: url('${category.strCategoryThumb}')">
          <div class="category-content">
            <h3 class="text-lg font-bold">${category.strCategory}</h3>
          </div>
        </div>
    `;

    const catElement = document.createRange().createContextualFragment(html);
    const categories = document.querySelector('#categories');
    categories.appendChild(catElement);
    categories.lastElementChild.addEventListener('click', (e) => {
      const lastElement = e.target.lastElementChild;
      const name = lastElement ? lastElement.textContent : e.target.textContent;
      document.querySelector('#item-list').innerHTML = '';
      this.showList(name);
      this.showLikes();
    });
  };

  showCategory = async () => {
    const categories = await api.getCategories();
    categories.forEach((cat) => {
      this.insertCategory(cat);
    });
  };

  showMealCount = (category) => mealCount(category);

  showItem = async (listElement, item) => {
    const liElementHtml = `<li class="card" data-meal-id="${item.idMeal}">
      <div class="card-content">
        <div class="meal">
          <img src="${item.strMealThumb}/preview" alt="${item.strMeal} image" class="dish-img">
          <div class="description">
            <span class="dish-name">${item.strMeal}</span>
            <span class="likes-row">
              <div class="likes-btn"><i class="fa-regular fa-heart"></i></div>
              <div class="likes">No likes</div>
            </span>
          </div>
        </div>
        <div class="buttons">
          <button type="button" class="main-btn meal-comment">
            Comments &nbsp; <i class="fa-regular fa-comment"></i>
          </button>
          <button type="button" class="main-btn hide-in-mobile" disabled>
            Reservations &nbsp; <i class="fa-regular fa-calendar"></i>
          </button>
        </div>
      </div>
    </li>`;
    listElement.insertAdjacentHTML('beforeend', liElementHtml);
    const liElement = listElement.lastChild;
    const btnElement = liElement.querySelector('button');
    btnElement.addEventListener('click', this.openComments);
    const likeElement = liElement.querySelector('i');
    likeElement.addEventListener('click', this.addLike);
    liElement.querySelector('img').onerror = (error) => {
      error.target.src = errorImg;
      error.target.onerror = null;
    };
  };

  showList = async (category) => {
    const dishes = await api.getByCategory(category);
    const listElement = document.querySelector('#item-list');
    dishes.forEach((dish) => {
      this.showItem(listElement, dish);
    });
    this.showMealCount(category);
  };

  showLike = async (element, likes) => {
    let likeElement = element;
    if (element.nodeName === 'LI') {
      likeElement = element.querySelector('.likes');
    }
    const { mealId } = likeElement.closest('li').dataset;
    const like = likes.find((item) => item.item_id === mealId) || {};
    const count = like.likes || 0;
    likeElement.textContent = `${count} Likes`;
  };

  showLikes = async () => {
    const likes = await api.getLikes(this.idApp);
    const listElement = document.querySelector('#item-list');
    const likesList = listElement.querySelectorAll('.likes');
    likesList.forEach((likeElement) => {
      this.showLike(likeElement, likes);
    });
  };
}

const mainUi = new MainUi();

export default mainUi;
