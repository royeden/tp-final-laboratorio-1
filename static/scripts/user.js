(() => {
  const userNameRegex = /[\wÑñÁáÉéÍíÓóÚúÜü]+/g
  const hadUserStored = !!localStorage.getItem('user');
  let username = localStorage.getItem('user');

  if (!hadUserStored) {
    while (!username) {
      const tempUsername = prompt(window.promptMessage);
      if (!userNameRegex.test(tempUsername)) username = tempUsername;
    }

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
})()