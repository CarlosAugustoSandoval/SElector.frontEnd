// state
const state = {
  snackbar: null
}

// getters
const getters = {
  snackbar (state) {
    return state.snackbar
  }
}

// mutations
const mutations = {
  SET_SNACKBAR (state, data) {
    const timeout = 6000
    const color = 'success'
    let message = ''
    message = data.message
    state.snackbar = {
      timeout: timeout,
      message: message,
      color: data.color || color
    }
  }
}

export default {
  state,
  getters,
  mutations
}