import api from './Api.js';

export default class Modal {
  constructor(data) {
    this.data = data;
    this.element = document.querySelector('#modal');
  }

  load() {
    const assignVlaue = (selector, value, attr) => {
      this.element.querySelector(`#modal-${selector}`)[attr ?? 'textContent'] = this.data[value];
    };

    this.element.querySelector('#modal-ingredients').innerHTML += '';
    for (let i = 1; i <= 20; i += 1) {
      if (this.data[`strIngredient${i}`] !== '') {
        const li = `<li class="badge">${this.data[`strIngredient${i}`]}</li>`;
        this.element.querySelector('#modal-ingredients').innerHTML += li;
      }
    }

    this.#loadComments();

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
      const username = this.element.querySelector('#modal-input-name').value;
      const message = this.element.querySelector('#modal-input-comment').value;
      await api.addComment(this.data.idMeal, { username, comment: message });
      commentForm.reset();
      this.#loadComments();
    });
  }

  #loadComments = async () => {
    const comments = await api.getComments(this.data.idMeal);
    const commentsCount = this.element.querySelector('#modal-comments-count');
    const commentsList = this.element.querySelector('#modal-comments');
    commentsList.innerHTML = '';

    if (comments.length > 0) {
      commentsCount.innerHTML = comments.length;
      comments.forEach((comment) => {
        const li = `
      <li class="comment">
        <span class="text-gray-500 text-xs">${comment.creation_date}</span>
        <span class="text-gray-700 font-bold">${comment.username}:</span>
        <span class="text-gray-900">${comment.comment}</span>
      </li>
      `;
        commentsList.innerHTML += li;
      });
    } else {
      commentsCount.innerHTML = 'No';
    }
  }

  open() {
    this.element.classList.remove('hidden');
    this.load();
  }
}
