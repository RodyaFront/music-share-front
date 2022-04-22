import Cookie from 'cookie'

const serverUrl = 'http://localhost:5000'

export default class Service {
  async postImg(url, commit, formData, isAuthorization = false) {
    const response = await fetch(`${serverUrl}${url}`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    if (data && data.errors && data.errors.message.length) {
      commit('setError', data.errors.message, { root: true })
    }
    return data
  }

  async post(url, commit, formData, isAuthorization = false) {
    const response = await fetch(`${serverUrl}${url}`, {
      method: 'POST',
      headers: isAuthorization
        ? this.authorizationHeaders()
        : this.noAuthorizationHeaders(),
      body: JSON.stringify(formData),
    })
    const data = await response.json()
    if (data && data.errors && data.errors.message.length) {
      commit('setError', data.errors.message, { root: true })
    }
    return data
  }

  async get(url, commit, isAuthorization = false) {
    const response = await fetch(`${serverUrl}${url}`, {
      method: 'GET',
      headers: isAuthorization
        ? this.authorizationHeaders()
        : this.noAuthorizationHeaders(),
    })
    const data = await response.json()
    if (data && data.errors && data.errors.message.length) {
      commit('setError', data.errors.message, { root: true })
    }
    return data
  }

  authorizationHeaders() {
    const token = this.getCookieToken()
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // 'Accept-Language': localStorage.getItem('ln'),
    }
  }

  getCookieToken() {
    const cookieStr = document.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    return cookies['jwt-token']
  }

  noAuthorizationHeaders() {
    // const token = this.getCookieToken()
    return {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${token}`,
    }
  }
}
