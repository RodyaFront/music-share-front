export const state = () => ({
  serverUrl: 'http://localhost:5000',
  $loading: false,
  $error: null,
  $newDesign: true,
})
export const mutations = {
  setLoading(state, payload) {
    state.$loading = payload
  },
  setError(state, payload) {
    state.$error = payload
  },
  setNewDesign(state, payload) {
    state.$newDesign = payload
  },
}
export const actions = {}
export const getters = {
  $loading: (state) => state.$loading,
  $error: (state) => state.$error,
  $newDesign: (state) => state.$newDesign,
}
