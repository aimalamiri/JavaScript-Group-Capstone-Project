function loadComments(comments) {
  const commentsCount = document.querySelector('#modal-comments-count');
  const commentsList = document.querySelector('#modal-comments');
  commentsList.innerHTML = '';

  if (comments.length > 0) {
    commentsCount.innerHTML = comments.length;
    comments.forEach((comment) => {
      const li = `
      <li class="comment">
        <span class="text-gray-500 text-xs">${comment.creation_date}</span>
        <span class="text-gray-700 font-bold">${comment.username}:</span>
        <span class="text-gray-900">${comment.comment}</span>
      </li>
      `;
      commentsList.innerHTML += li;
    });
  } else {
    commentsCount.innerHTML = 'No';
  }
}

module.exports = loadComments;
