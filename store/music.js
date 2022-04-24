import Service from '@/services/service'
import Cookie from 'cookie'

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
      const response = await Service.post('/api/music/add', commit, data, true)
      console.log(response)
    } catch (e) {
      console.error(e)
    }
  },
  async handleFetchTracks({ commit }, data) {
    try {
      const response = await Service.get('/api/music/tracks', commit)
      commit('setTracks', response.items)
    } catch (e) {
      console.error(e)
    }
  },
  async handleDeleteTrack({ commit }, id) {
    try {
      const response = await Service.post(
        `/api/music/delete`,
        commit,
        { id },
        true
      )
      return response
    } catch (e) {
      console.error(e)
    }
  },
  async handleEditTrack({ commit }, formData) {
    try {
      const response = await Service.post(
        `/api/music/edit`,
        commit,
        formData,
        true
      )
      return response
    } catch (e) {
      console.error(e)
    }
  },
}
export const getters = {
  tracks: (state) => state.tracks,
}
