(() => {
  window.makeUpdateRequestBody = username => ({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username
    })
  });
})()