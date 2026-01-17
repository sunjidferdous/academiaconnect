useEffect(() => {
  const userId = 1; // ধরছি id = 1
  fetch(`/api/profile?id=${userId}`)
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error(err));
}, []);
