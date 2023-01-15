export const MOVIES_URL = 'https://api.nomoreparties.co';

export const getMovies = () => {
  return fetch(`${MOVIES_URL}/beatfilm-movies`,
    {
      method: 'GET',
      headers: { 'Content-type': 'application/json', }
    }
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json()
      .then((error) => {
        error.statusCode = res.status;
        return Promise.reject(error);
      });
  });
}