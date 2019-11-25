(() => {
  const percentageNode = document.getElementById('percentage');

  const formatUpdateResponse = ({ percentage }) => {
    percentageNode.textContent = `${window.responseMessage} ${percentage}%`;
    return percentage;
  };

  const updatePercentage = () => {
    fetch('/update', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(formatUpdateResponse)
      .then(window.handleHiddenImages);
  };

  setInterval(updatePercentage, 1000);
})();
