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
            localTimeout = parseInt(time, 10);
            const clockInterval = setInterval(() => {
              if (localTimeout > 0) localTimeout -= 1000;
              localStorage.setItem('time', localTimeout);
              displayTimeoutNode.textContent = `${Math.floor(
                localTimeout / 1000
              )}s`;
            }, 1000);
            setTimeout(() => {
              clearInterval(clockInterval);
              window.getCurrentTimeout();
            }, localTimeout + 1000);
          } else {
            localStorage.setItem('time', '');
          }
        });
    };

    timeoutRequestInterval = setInterval(getTimeout, 1000);
  };
})();
