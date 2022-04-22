import Service from '@/services/service'

const service = new Service()

export const state = () => ({
  tracks: null,
})
export const mutations = {
  setTracks(state, payload) {
    state.tracks = payload
  },
}
export const actions = {
  async handleAddTrack({ commit }, data) {
    try {
      const response = await service.post('/api/music/add-track', commit, data)
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  },
  async handleFetchTracks({ commit }, data) {
    try {
      const response = await service.get('/api/music/tracks', commit)
      commit('setTracks', response.items)
    } catch (e) {
      console.error(e)
    }
  },
}
export const getters = {
  tracks: (state) => state.tracks,
}
