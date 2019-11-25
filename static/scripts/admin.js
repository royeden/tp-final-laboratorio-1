(() => {
  const hadAdminStored = !!localStorage.getItem('password');
  let password = localStorage.getItem('password');

  const getPassword = callback => {
    while (!password) {
      password = prompt(window.promptMessage);
    }
    localStorage.setItem('password', password);
    if (callback) callback();
  };

  if (!hadAdminStored) {
    getPassword();
  }

  const passwordIsCorrect = () =>
    fetch('/password', {
      method: 'POST',
      ...window.makeUpdateRequestBody('password', password)
    })
      .then(res => res.json())
      .then(({ correct }) => {
        if (!correct) {
          password = false;

          alert('Contraseña incorrecta!');
          getPassword(passwordIsCorrect);
        }
      });

  passwordIsCorrect();
})();
