(() => {
  const thresholds = window.thresholds
    .split(',')
    .map(threshold => parseInt(threshold, 10));
  const images = window.images.split(',');
  
  const hiddenImageNode = document.getElementById('hidden_image');
  let hiddenImagesTimer = null;
  let hiddenImagesTimerFinished = false;
  let activateHiddenImages = false;
  let thresholdIndex = 0;

  const createHiddenImageTimeout = index => {
    const tempTimeout =
      (Math.floor(Math.random() * 1000) + 1) * 5 * thresholds[index];
    hiddenImagesTimer = setTimeout(() => {
      hiddenImagesTimerFinished = true;
      hiddenImageNode.src =
        images[Math.floor(Math.random() * images.length)];
      hiddenImageNode.style.display = 'block';
      setTimeout(() => (hiddenImageNode.style.display = 'none'), 100);
    }, tempTimeout);
    console.log(tempTimeout / 1000);
  };

  window.handleHiddenImages = percentage => {
    const prevActivateHiddenImages = activateHiddenImages;
    const prevThresholdIndex = thresholdIndex;
    thresholdIndex = percentage ? Math.floor((percentage - 1) / 20) : 0;
    if (!activateHiddenImages) {
      if (!prevActivateHiddenImages && thresholdIndex) {
        activateHiddenImages = true;
        createHiddenImageTimeout(thresholdIndex);
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
        if (thresholdIndex) createHiddenImageTimeout(thresholdIndex);
      }
      if (thresholdIndex !== prevThresholdIndex) {
        clearTimeout(hiddenImagesTimer);
        if (thresholdIndex) createHiddenImageTimeout(thresholdIndex);
      }
    }
  }
})()