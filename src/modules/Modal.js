export default class Modal {
  constructor(data, comments) {
    this.data = data;
    this.comments = comments;
    this.element = document.querySelector('#modal');
  }

  load() {
    const assignVlaue = (selector, value, attr) => {
      this.element.querySelector(`#modal-${selector}`)[attr ?? 'textContent'] = this.data[value];
    };

    for (let i = 1; i <= 20; i += 1) {
      if (this.data[`strIngredient${i}`] !== '') {
        const li = `<li class="badge">${this.data[`strIngredient${i}`]}</li>`;
        this.element.querySelector('#modal-ingredients').innerHTML += li;
      }
    }

    const commentsCount = this.element.querySelector('#modal-comments-count');
    const commentsList = this.element.querySelector('#modal-comments');
    commentsList.innerHTML = '';

    if (this.comments.length > 0) {
      commentsCount.innerHTML = this.comments.length;
      this.comments.forEach((comment) => {
        const li = `
      <li class="flex justify-start items-center gap-2">
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

    assignVlaue('title', 'strMeal');
    assignVlaue('image', 'strMealThumb', 'src');
    assignVlaue('video', 'strYoutube', 'href');
    assignVlaue('source', 'strSource', 'href');
    assignVlaue('instruction', 'strInstructions');
    assignVlaue('area', 'strArea');
    assignVlaue('category', 'strCategory');
  }

  open() {
    this.element.classList.remove('hidden');
    this.load();
  }
}
