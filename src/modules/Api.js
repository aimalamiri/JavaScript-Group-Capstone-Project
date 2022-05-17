const baseUrl = 'https://www.themealdb.com/api/json/v1/1';

class Api {
  constructor() {
    this.baseUrl = baseUrl;
  }
}

const api = new Api();

export default api;
