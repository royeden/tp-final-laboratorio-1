(() => {
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
})();
