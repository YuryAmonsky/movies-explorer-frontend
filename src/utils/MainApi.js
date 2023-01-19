import { BEATFILM, MAIN_API } from "./Constants";

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request({
    url,
    method = 'POST',
    data
  }) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers: this._headers, 
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
        image: `${BEATFILM}${card.image.url}`,
        thumbnail: `${BEATFILM}${card.image.formats.thumbnail.url}`,
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
  baseUrl: MAIN_API,
  headers: {
    authorization: '',    
    'Content-Type': 'application/json'
  }
})
