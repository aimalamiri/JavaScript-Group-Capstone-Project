export default class Modal {
  constructor(data) {
    this.data = data;
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
