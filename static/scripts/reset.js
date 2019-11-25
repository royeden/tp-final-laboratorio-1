(() => {
  const password = localStorage.getItem('password');

  const resetButtonNode = document.getElementById('reset');
  const handleReset = () => {
    fetch('/reset', {
      method: 'POST',
      ...window.makeUpdateRequestBody('password', password)
    });
  };
  resetButtonNode.addEventListener('click', handleReset)
})()