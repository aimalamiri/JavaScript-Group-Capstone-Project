import { FREE_MEALS_URL, FREE_MEALS_API_KEY, INVOLVEMENT_URL, INVOLVEMENT_API_KEY } from './environment.js';

class Api {
  constructor() {
    this.baseUrl = FREE_MEALS_URL + FREE_MEALS_API_KEY;
    this.involvementUrl = INVOLVEMENT_URL;
    this.involvementKey = INVOLVEMENT_API_KEY;
  }

  getCategories = () => fetch(`${this.baseUrl}/categories.php`)
    .then((response) => response.json())
    .then((json) => json.categories)
    .catch((error) => {
      throw error;
    });

  getByCategory = (category) => fetch(`${this.baseUrl}/filter.php?c=${category}`)
    .then((response) => response.json())
    .then((json) => json.meals)
    .catch((error) => {
      throw error;
    });

  getMeal = (idMeal) => fetch(`${this.baseUrl}/lookup.php?i=${idMeal}`)
    .then((response) => response.json())
    .then((json) => json.meals)
    .then((list) => (list.length ? list[0] : {}))
    .catch((error) => {
      throw error;
    });

  createApp = async () => fetch(`${this.involvementUrl}/apps/`, {
    method: 'POST',
    body: '',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.text())
    .catch((error) => {
      throw error;
    });

  addLike = async (idApp, idMeal) => fetch(`${this.involvementUrl}/apps/${idApp}/likes/`, {
    method: 'POST',
    body: JSON.stringify({ item_id: idMeal }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.text())
    .catch((error) => {
      throw error;
    });

  getLikes = (idApp) => fetch(`${this.involvementUrl}/apps/${idApp}/likes/`)
    .then((response) => {
      const responseLength = Number(response.headers.get('content-length'));
      if (responseLength > 0) {
        return response.json();
      }
      return [];
    })
    .catch((error) => {
      throw error;
    });

  getComments = async (mealId) => {
    let result;
    await fetch(`${this.involvementUrl}/apps/${this.involvementKey}/comments?item_id=${mealId}`)
      .then((response) => {
        result = response.json();
        if (!response.ok) {
          result = [];
        }
      })
      .catch((error) => error);
    return result;
  };
  
  addComment = async (mealId, data) => {
    const response = await fetch(`${this.involvementUrl}/apps/${this.involvementKey}/comments/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        item_id: mealId,
        username: data.username,
        comment: data.comment
      })
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => error);
      return response;
  };
}

const api = new Api();

export default api;
