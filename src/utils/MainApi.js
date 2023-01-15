import { moviesURL } from "./MoviesApi";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request({
    url,
    method = 'POST',
    token,
    data
  }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers: this._headers, //{
        //'Accept': 'application/json',
        //'Content-type': 'application/json',
        //...!!token && { 'authorization': `Bearer ${token}` }
      //},
      ...!!data && { body: JSON.stringify(data) }
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json()
          .then((error) => {
            error.statusCode = res.status;
            return Promise.reject(error);
          })
      });
  }

  setAuthorization(token) {
    this._headers['authorization'] = `Bearer ${token}`;
  }

  login(email, password) {
    return this._request({
      url: '/signin',
      data: { email: email, password: password }
    });
  }

  register(name, email, password) {
    return this._request({
      url: '/signup',
      data: { name: name, email: email, password: password }
    });
  }

  getUserData(){
    return this._request({
      url: '/users/me',
      method: 'GET',
    });
  }
  
  updateUserData(name, email){
    return this._request({
      url: '/users/me',
      method: 'PATCH',
      data: {name:name, email:email},
    });
  }

  getCards(){
    return this._request({
      url:'/movies',
      method: 'GET',
    })
  }

  saveCard(card) {
    return this._request({
      url: '/movies',
      data: {
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
        director: card.director,
        country: card.country,
        year: card.year,
        duration: card.duration,
        description: card.description,
        trailerLink: card.trailerLink,
        image: `${moviesURL}${card.image.url}`,
        thumbnail: `${moviesURL}${card.image.formats.thumbnail.url}`,
      },
    })
  }

  deleteCard(cardId) {
    return this._request({
      url: `/movies/${cardId}`,
      method: 'DELETE',
    })
  }
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3002',//'https://api.amo.movies-explorer.nomoredomains.club',
  headers: {
    authorization: '',
    //'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhiM2I5MjdiNjJmYzI2MGFlMzc4MTciLCJpYXQiOjE2NzM0NjczMzMsImV4cCI6MTY3NDA3MjEzM30.NKz7xFLK82g3LjKl09RWnSR3zyRWyU3UwuIolQMNjDw',
    'Content-Type': 'application/json'
  }
})
