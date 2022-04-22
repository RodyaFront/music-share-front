export const state = () => ({
  user: null,
})
export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}
export const actions = {}
export const getters = {
  user: (state) => state.user,
}
