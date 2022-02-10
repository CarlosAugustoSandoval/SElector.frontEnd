// state
import Vue from 'vue'

const state = {
  candidates: []
}

// getters
const getters = {
  candidatosSenado: state => state.candidates.filter(x => x.corporacion === 'SENADO'),
  candidatosCamara: state => state.candidates.filter(x => x.corporacion === 'CAMARA')
}

// actions
const actions = {
  getCandidates(context) {
    Vue.axios.get('electores/candidatos')
        .then(response => {
          context.commit('SET_CANDIDATES', response.data)
        })
        .catch(error => {
          context.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al recuperar los resgistros de los candidatos.`, error: error }, { root: true })
        })
  }
}

// mutations
const mutations = {
  SET_CANDIDATES(state, data) {
    state.candidates = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
