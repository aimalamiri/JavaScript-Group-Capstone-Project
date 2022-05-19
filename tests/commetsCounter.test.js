const loadComments = require('../src/modules/commentsLoader.js');

const comments = [
  { creation_date: '2021/1/5', username: 'John', comment: 'Wow I love it!' },
  { creation_date: '2022/3/8', username: 'Mike', comment: 'Yummy!' },
];

describe('Comments test', () => {
  it('Should insert and count the comments', () => {
    document.body.innerHTML = `
      <h3 class="mt-3 text-lg"><span id="modal-comments-count" class="font-bold"></span> comments</h3>
      <ul id="modal-comments"></ul>
    `;
    loadComments(comments);
    const commentsCount = document.querySelector('#modal-comments-count').textContent;
    expect(comments.length).toBe(Number(commentsCount));
  });
});
