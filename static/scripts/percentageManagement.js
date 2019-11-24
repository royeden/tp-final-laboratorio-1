(() => {
  const username = localStorage.getItem('user');

  const decreaseButtonNode = document.getElementById('decrease');
  const decreasePercentage = () => {
    fetch('/decrease', {
      method: 'PUT',
      ...window.makeUpdateRequestBody(username)
    });
  };
  decreaseButtonNode.addEventListener('click', decreasePercentage);
  
  const increaseButtonNode = document.getElementById('increase');
  const increasePercentage = () => {
    fetch('/increase', {
      method: 'PUT',
      ...window.makeUpdateRequestBody(username)
    });
  };
  increaseButtonNode.addEventListener('click', increasePercentage);
})()