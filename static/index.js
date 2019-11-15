(() => {
  let username = false;

  while (!username) username = prompt(window.promptMessage);

  const makeUpdateRequestBody = () => ({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username
    })
  });

  const getUserId = () =>
    fetch('/id', {
      method: 'POST',
      ...makeUpdateRequestBody()
    })
      .then(res => res.json())
      .then(({ user_id: id }) => (username = `${id}_${username}`));

  getUserId();

  const percentageNode = document.getElementById('percentage');
  const decreaseButtonNode = document.getElementById('decrease');
  const increaseButtonNode = document.getElementById('increase');

  const formatUpdateResponse = ({ percentage }) =>
    (percentageNode.textContent = `${window.responseMessage} ${percentage}%`);

  const updatePercentage = () => {
    fetch('/update', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(formatUpdateResponse);
  };

  const increasePercentage = () => {
    fetch('/increase', {
      method: 'PUT',
      ...makeUpdateRequestBody()
    }).then(updatePercentage);
  };
  increaseButtonNode.addEventListener('click', increasePercentage);

  const decreasePercentage = () => {
    fetch('/decrease', {
      method: 'PUT',
      ...makeUpdateRequestBody()
    }).then(updatePercentage);
  };
  decreaseButtonNode.addEventListener('click', decreasePercentage);

  setInterval(updatePercentage, 1000);
})();
