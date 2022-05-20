function mealCount(category) {
  const listElement = document.querySelector('#item-list');
  const count = listElement.children.length;
  const countElement = document.querySelector('#meals-count');
  countElement.innerHTML = `Our <strong>${category}</strong> category has <strong>${count}</strong> options`;
  return count;
}

module.exports = mealCount;
