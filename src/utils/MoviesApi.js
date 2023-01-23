import { BEATFILM } from "./Constants";

export const getMovies = () => {
  return fetch(`${BEATFILM}/beatfilm-movies`,
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