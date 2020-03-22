export default async (url, data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
};
