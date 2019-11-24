(() => {
  const hadUserStored = !!localStorage.getItem('user');
  let username = localStorage.getItem('user');

  const percentageNode = document.getElementById('percentage');
  const decreaseButtonNode = document.getElementById('decrease');
  const increaseButtonNode = document.getElementById('increase');
  const dislikeButtonNode = document.getElementById('dislike');
  const likeButtonNode = document.getElementById('like');
  const finalDislikeButtonNode = document.getElementById('dislike');
  const finalLikeButtonNode = document.getElementById('like');

  const makeUpdateRequestBody = () => ({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username
    })
  });

  if (!hadUserStored) {
    while (!username) username = prompt(window.promptMessage);

    const getUserId = () =>
      fetch('/id', {
        method: 'POST',
        ...makeUpdateRequestBody()
      })
        .then(res => res.json())
        .then(({ user_id: id }) => (username = `${id}_${username}`))
        .then(userdata => localStorage.setItem('user', userdata));

    getUserId();
  }

  if (window.timeout) {
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
      }, 1000);
      setTimeout(() => {
        clearInterval(clockInterval);
        document.getElementById('timeout_modal').className =
          'timeout_modal timeout_modal--visible timeout_modal--show';
      }, localTimeout + 1000);
    } else {
      document.getElementById('timeout_modal').className =
        'timeout_modal timeout_modal--visible';
      timeoutNode.textContent = '0s';
    }
  }

  const formatUpdateResponse = ({ percentage }) => {
    percentageNode.textContent = `${window.responseMessage} ${percentage}%`;
    window.handleHiddenImages(percentage)
  };

  const updatePercentage = () => {
    fetch('/update', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(formatUpdateResponse);
  };

  const increasePercentage = () => {
    fetch('/increase', {
      method: 'PUT',
      ...makeUpdateRequestBody()
    });
  };
  increaseButtonNode.addEventListener('click', increasePercentage);

  const decreasePercentage = () => {
    fetch('/decrease', {
      method: 'PUT',
      ...makeUpdateRequestBody()
    });
  };
  decreaseButtonNode.addEventListener('click', decreasePercentage);

  setInterval(updatePercentage, 1000);

  window.thresholds = window.thresholds
    .split(',')
    .map(threshold => parseInt(threshold, 10));
  window.images = window.images.split(',');
})();
