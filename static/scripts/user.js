(() => {
  const hadUserStored = !!localStorage.getItem('user');
  let username = localStorage.getItem('user');

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
})()