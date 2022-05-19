import api from './Api.js';
import loadComments from './commentsLoader.js';

export default class Modal {
  constructor(data) {
    this.data = data;
    this.element = document.querySelector('#modal');
  }

  load() {
    const assignVlaue = (selector, value, attr) => {
      this.element.querySelector(`#modal-${selector}`)[attr ?? 'textContent'] = this.data[value];
    };

    const ingredients = this.element.querySelector('#modal-ingredients');
    ingredients.innerHTML = '';
    for (let i = 1; i <= 20; i += 1) {
      if (this.data[`strIngredient${i}`] !== '') {
        const li = `<li class="badge">${this.data[`strIngredient${i}`]}</li>`;
        ingredients.innerHTML += li;
      }
    }

    this.#fetchAndLoadComments();

    assignVlaue('title', 'strMeal');
    assignVlaue('image', 'strMealThumb', 'src');
    assignVlaue('video', 'strYoutube', 'href');
    assignVlaue('source', 'strSource', 'href');
    assignVlaue('instruction', 'strInstructions');
    assignVlaue('area', 'strArea');
    assignVlaue('category', 'strCategory');

    const commentForm = this.element.querySelector('#modal-comment-form');

    commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let username = this.element.querySelector('#modal-input-name').value || '';
      let message = this.element.querySelector('#modal-input-comment').value || '';
      username = username.trim();
      message = message.trim();
      if (username !== '' && message !== '') {
        await api.addComment(this.data.idMeal, { username, comment: message });
        commentForm.reset();
        this.#fetchAndLoadComments();
      }
    });
  }

  #fetchAndLoadComments = async () => {
    const comments = await api.getComments(this.data.idMeal);
    loadComments(comments);
  };

  open() {
    this.element.classList.remove('hidden');
    this.load();
  }
}
