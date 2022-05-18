const mealCount = require('../src/modules/mealCount.js');

const html = `
    <header class="px-16 py-10 bg-gray-200 border-t w-full">
      <h1 class="font-medium text-center">Welcome to Meal Time</h1>
      <div class="main-header">
        <div class="logo"></div>
        <h2 id="meals-count">Meals(0)</h2>
      </div>
    </header>
    <main class="bg-gray-200">
      <ul id="item-list" class="flex flex-wrap justify-around">
        <li class="card" data-idmeal="1">
          <img src="123/preview" alt="chicken image" class="dish-img">
          <div class="dish-name">
            <span>Chiken 1</span>
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="likes">n likes</div>
          <button type="button" class="main-button">Coments</button>
          <button type="button" class="main-button">Reservations</button>
        </li>
        <li class="card" data-idmeal="2">
          <img src="456/preview" alt="chicken image" class="dish-img">
          <div class="dish-name">
            <span>Chiken 2</span>
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="likes">n likes</div>
          <button type="button" class="main-button">Coments</button>
          <button type="button" class="main-button">Reservations</button>
        </li>
      </ul>
    </main>`;

describe ('Homepage test', () => {
  it('should count the number of meals in the menu', () => {
    document.body.innerHTML = html;
    // 
    const count = mealCount();
    expect(count).toBeDefined();
    expect(count).toBe(2);
  })
})