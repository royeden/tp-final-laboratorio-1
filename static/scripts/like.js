(() => {  
  const username = localStorage.getItem('user');
  
  const dislikeButtonNode = document.getElementById('dislike');
  const dislike = () => {
    fetch('/dislike', {
      method: 'PUT',
      ...window.makeUpdateRequestBody('username', username)
    });
  };
  dislikeButtonNode.addEventListener('click', dislike);

  const likeButtonNode = document.getElementById('like');
  const like = () => {
    fetch('/like', {
      method: 'PUT',
      ...window.makeUpdateRequestBody('username', username)
    });
  };
  likeButtonNode.addEventListener('click', like);
})()