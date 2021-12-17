import { uuid } from 'vue-uuid'

// state
const state = {
  persons: []
}

// getters
const getters = {
  persons: state => search => {
    return state.persons.filter(person => [person.nombre1, person.nombre2, person.apellido1, person.apellido2].filter(x => x).join(' ').toLowerCase().search(search.toLowerCase()) !== -1 || person.identificacion.toLowerCase().search(search.toLowerCase()) !== -1)
  }
}

// actions
const actions = {
  async save(context, person) {
    return await new Promise(resolve => {
        context.commit(person.uuid ? 'SET_EDIT_PERSON' : 'SET_ADD_PERSON', person)
        context.commit('SET_SNACKBAR', { message: `El registro de la persona se ${person.uuid ? 'actualizó' : 'registró'} correctamente.`  }, { root: true })
        resolve(true)
    })
  }
}

// mutations
const mutations = {
    SET_EDIT_PERSON(state, person) {
        let index = state.persons.findIndex(x => x.uuid === person.uuid)
        state.persons.splice(index,1, person)
    },
    SET_ADD_PERSON(state, person) {
        person.uuid = `person-${uuid.v1()}`
        state.persons.splice(0,0, person)
    }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
