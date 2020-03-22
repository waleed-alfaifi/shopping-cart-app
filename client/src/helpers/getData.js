export default async url => {
  const response = await fetch(url, {
    headers: { Authorization: localStorage.getItem('token') },
  });
  return await response.json();
};
