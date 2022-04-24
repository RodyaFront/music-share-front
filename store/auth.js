import Service from '~/services/service'
import Cookies from 'js-cookie'
import Cookie from 'cookie'

export const state = () => ({
  $token: null,
  $user: null,
})
export const mutations = {
  setUser(state, payload) {
    state.$user = payload
  },
  setToken(state, payload) {
    state.$token = payload
  },
  clearToken(state) {
    state.$token = null
  },
  clearUser(state) {
    state.$user = null
  },
}
export const actions = {
  async register({ commit }, data) {
    try {
      return await Service.post('/api/auth/register', commit, data)
    } catch (e) {
      console.error(e)
    }
  },
  async login({ commit, dispatch }, data) {
    try {
      const response = await Service.post('/api/auth/login', commit, data)
      if (response.ok) {
        const { token, userId } = response
        localStorage.setItem('user-id', userId)

        Cookies.set('jwt-token', token)
        localStorage.setItem('token', token)
        dispatch('setToken', token)
        return true
      }
      return false
    } catch (e) {
      console.error(e)
      return false
    }
  },
  logout({ commit }) {
    commit('clearToken')
    Cookies.remove('jwt-token')
  },
  autoLogin({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie
    const cookies = Cookie.parse(cookieStr || '') || {}
    const token = cookies['jwt-token']
    console.log('Auto login. Token : ', token)
    if (!token) {
      return dispatch('logout')
    }
    dispatch('setToken', token)
  },
  setToken({ commit }, token) {
    commit('setToken', token)
  },
}
export const getters = {
  token: (state) => state.$token,
}
