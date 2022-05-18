function mealCount() {
  const listElement = document.querySelector('#item-list');
  const count = listElement.children.length;
  const countElement = document.querySelector('#meals-count');
  countElement.innerHTML = `Our menu includes <strong>${count}</strong> meals`;
  return count;
}

module.exports = mealCount;