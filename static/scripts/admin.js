(() => {
  const hadAdminStored = !!localStorage.getItem('password');
  let password = localStorage.getItem('password');

  const getPassword = callback => {
    while (!password) {
      password = prompt(window.adminPromptMessage);
    }
    localStorage.setItem('password', password);
    if (callback) callback();
  };

  if (!hadAdminStored) {
    getPassword();
  }

  const verifyPassword = () =>
    fetch('/password', {
      method: 'POST',
      ...window.makeUpdateRequestBody('password', password)
    })
      .then(res => res.json())
      .then(({ correct }) => {
        if (!correct) {
          password = false;

          alert(window.wrongPassword);
          getPassword(verifyPassword);
        }
      });

  verifyPassword();

  window.getCurrentTimeout();
})();
