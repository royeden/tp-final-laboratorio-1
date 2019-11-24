(() => {
  const hadUserStored = !!localStorage.getItem('user');
  let username = localStorage.getItem('user');

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

  const hiddenImageNode = document.getElementById('hidden_image');
  const percentageNode = document.getElementById('percentage');
  const decreaseButtonNode = document.getElementById('decrease');
  const increaseButtonNode = document.getElementById('increase');

  let hiddenImagesTimer = null;
  let hiddenImagesTimerFinished = false;
  let activateHiddenImages = false;
  let thresholdIndex = 0;

  const createTimeout = index => {
    const tempTimeout =
      (Math.floor(Math.random() * 1000) + 1) * 5 * window.thresholds[index];
    hiddenImagesTimer = setTimeout(() => {
      hiddenImagesTimerFinished = true;
      hiddenImageNode.src =
        window.images[Math.floor(Math.random() * window.images.length)];
      hiddenImageNode.style.display = 'block';
      setTimeout(() => (hiddenImageNode.style.display = 'none'), 50);
    }, tempTimeout);
    console.log(tempTimeout / 1000);
  };

  const formatUpdateResponse = ({ percentage }) => {
    const prevActivateHiddenImages = activateHiddenImages;
    const prevThresholdIndex = thresholdIndex;
    thresholdIndex = percentage ? Math.floor((percentage - 1) / 20) : 0;
    percentageNode.textContent = `${window.responseMessage} ${percentage}%`;
    if (!activateHiddenImages) {
      if (!prevActivateHiddenImages && thresholdIndex) {
        activateHiddenImages = true;
        createTimeout(thresholdIndex);
      }
    } else {
      if (!thresholdIndex) {
        activateHiddenImages = false;
        hiddenImagesTimerFinished = false;
        clearTimeout(hiddenImagesTimer);
        hiddenImagesTimer = null;
      }
      if (hiddenImagesTimerFinished) {
        hiddenImagesTimerFinished = false;
        if (thresholdIndex) createTimeout(thresholdIndex);
      }
      if (thresholdIndex !== prevThresholdIndex) {
        clearTimeout(hiddenImagesTimer);
        if (thresholdIndex) createTimeout(thresholdIndex);
      }
    }
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
