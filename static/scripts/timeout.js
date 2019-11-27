(() => {
  const username = localStorage.getItem('user');

  const finalize = () => {
    const finalDislikeButtonNode = document.getElementById('final_dislike');
    const finalize = callback => () => {
      callback();
      const finalDisplayNode = document.getElementById('final_display');
      finalDisplayNode.innerHTML = "<h3>Muchas gracias por participar!</h3>"
    }
    const finalDislike = () => {
      fetch('/final_dislike', {
        method: 'PUT',
        ...window.makeUpdateRequestBody('username', username)
      });
    };
    finalDislikeButtonNode.addEventListener('click', finalize(finalDislike));

    const finalLikeButtonNode = document.getElementById('final_like');
    const finalLike = () => {
      fetch('/final_like', {
        method: 'PUT',
        ...window.makeUpdateRequestBody('username', username)
      });
    };
    finalLikeButtonNode.addEventListener('click', finalize(finalLike));

    window.handleHiddenImages = () => {};
    setInterval(() => {
      fetch('/reset', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(({ reset }) => {
          if (reset) {
            localStorage.clear();
            window.close();
          }
        });
    }, 1000);
  };
  let localTimeout = localStorage.getItem('timeout');
  const timeoutNode = document.getElementById('timeout');
  if (localTimeout !== '0') {
    localTimeout = parseInt(localTimeout || window.timeout, 10);
    timeoutNode.textContent = `${Math.floor(localTimeout / 1000)}s`;
    document.getElementById('timeout_modal').className =
      'timeout_modal timeout_modal--hidden';
    const clockInterval = setInterval(() => {
      if (localTimeout > 0) localTimeout -= 1000;
      localStorage.setItem('timeout', localTimeout);
      timeoutNode.textContent = `${Math.floor(localTimeout / 1000)}s`;
      fetch('/time', {
        method: 'PUT',
        ...window.makeUpdateRequestBody('timeout', localTimeout)
      });
    }, 1000);
    setTimeout(() => {
      clearInterval(clockInterval);
      document.getElementById('timeout_modal').className =
        'timeout_modal timeout_modal--visible timeout_modal--show';
      finalize();
    }, localTimeout + 1000);
  } else {
    document.getElementById('timeout_modal').className =
      'timeout_modal timeout_modal--visible';
    timeoutNode.textContent = '0s';
    finalize();
  }
})();
