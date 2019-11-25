(() => {
  const usernameRegex = /^[\wÑñÁáÉéÍíÓóÚúÜü]+$/;
  const hadUserStored = !!localStorage.getItem('user');
  let username = localStorage.getItem('user');

  if (!hadUserStored) {
    const getUserName = () => {
      username = prompt(window.promptMessage);
      if (!usernameRegex.test(username)) {
        usernameRegex.lastIndex = 0;
        getUserName();
      }
    };
    getUserName();

    // username = username.replace(usernameRegex, '') || 'Anonymous';

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
