(() => {
  let username = false;

  while (!username)
    username = prompt("Ingresa el nombre que quieras usar");

  const getUserId = () =>
    fetch("/id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username
      })
    })
      .then(res => res.json())
      .then(({ user_id: id }) => (username = `${id}_${username}`));
  getUserId();

  const percentageNode = document.getElementById("percentage");
  const decreaseButtonNode = document.getElementById("decrease");
  const increaseButtonNode = document.getElementById("increase");

  const formatUpdateResponse = ({ percentage }) =>
    (percentageNode.textContent = `Nivel de violencia ${percentage}%`);

  const updatePercentage = () => {
    percentageNode.textContent = "Cargando...";
    fetch("/update", {
      method: "GET"
    })
      .then(res => res.json())
      .then(formatUpdateResponse);
  };

  const increasePercentage = () => {
    fetch("/increase", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username
      })
    }).then(updatePercentage);
  };
  increaseButtonNode.addEventListener("click", increasePercentage);

  const decreasePercentage = () => {
    fetch("/decrease", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username
      })
    }).then(updatePercentage);
  };
  decreaseButtonNode.addEventListener("click", decreasePercentage);

  setInterval(updatePercentage, 1000);
})();