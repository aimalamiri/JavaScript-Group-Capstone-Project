const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

class Api {
  constructor() {
    this.baseUrl = baseUrl;
  }

  getCategories = () => fetch(`${this.baseUrl}/categories.php`)
    .then((response) => response.json())
    .then((json) => json.categories)
    .catch((error) => {
      throw error;
    });
}

const api = new Api();

export default api;
