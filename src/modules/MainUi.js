import api from './Api.js';

class MainUi {
  setup = async () => {
    await this.showList();
  };

  showItem = async (listElement, item) => {
    //
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
