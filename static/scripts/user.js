(() => {
  const usernameRegex = /[^\wÑñÁáÉéÍíÓóÚúÜü]+/g;
  const hadUserStored = !!localStorage.getItem('user');
  let username = localStorage.getItem('user');

  if (!hadUserStored) {
    while (!username) {
      username = prompt(window.promptMessage);
    }

    username = username.replace(usernameRegex, '') || 'Anonymous';

    const getUserId = () =>
      fetch('/id', {
        method: 'POST',
        ...makeUpdateRequestBody('username', username)
      })
        .then(res => res.json())
        .then(({ user_id: id }) => (username = `${id}_${username}`))
        .then(userdata => localStorage.setItem('user', userdata));

    getUserId();
  }
})();
