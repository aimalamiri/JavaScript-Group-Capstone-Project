export default class Modal {
  constructor(data) {
    this.data = data;
    this.element = document.querySelector('#modal');
  }

  load() {
    console.log(this.data);
    const assignVlaue = (selector, value, attr) => {
      this.element.querySelector(`#modal-${selector}`)[attr ?? 'textContent'] = this.data[value];
    }
    assignVlaue('title', 'strMeal');
    assignVlaue('image', 'strMealThumb', 'src');
    assignVlaue('video', 'strYoutube', 'href');
    assignVlaue('instruction', 'strInstructions');
    assignVlaue('area', 'strArea');
    assignVlaue('category', 'strCategory');
  }

  open() {
    this.element.classList.remove('hidden');
    this.load();
  }
}