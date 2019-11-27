(() => {
  window.getCurrentTimeout = () => {
    let timeoutRequestInterval;

    const getTimeout = () => {
      fetch('/time', {
        method: 'GET'
      })
        .then(res => res.json())
        .then(({ time }) => {
          if (time !== null) {
            clearInterval(timeoutRequestInterval);
            const displayTimeoutNode = document.getElementById(
              'display_timeout'
            );
            const timeout = parseInt(time, 10);
            if (timeout >= 0) {
              setTimeout(getTimeout, 1000);
              displayTimeoutNode.textContent = `${Math.floor(
                timeout / 1000
              )}s`;
            } else {
              setTimeout(() => {
                window.getCurrentTimeout();
              }, 1000);
            }
          }
        });
    };

    timeoutRequestInterval = setInterval(getTimeout, 1000);
  };
})();
