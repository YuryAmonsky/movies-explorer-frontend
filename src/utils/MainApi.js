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
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        ...!!token && { 'authorization': `Bearer ${token}` }
      },
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
}

export const mainApi = new MainApi({
  baseUrl: 'http://localhost:3002',//'https://api.amo.movies-explorer.nomoredomains.club',
  headers: {
    'authorization': '',
    'Content-Type': 'application/json'
  }
})
