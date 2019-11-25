(() => {
  window.makeUpdateRequestBody = (key, value) => ({
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      [key]: value
    })
  });
})()