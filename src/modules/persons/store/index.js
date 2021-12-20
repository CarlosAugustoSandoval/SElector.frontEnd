import { uuid } from 'vue-uuid'
import moment from "moment";

// state
const state = {
  persons: []
}

// getters
const getters = {
  persons: state => search => {
    // return state.persons.filter(person => (person.nombre_completo.toLowerCase().search(search.toLowerCase()) !== -1 || person.identificacion.toLowerCase().search(search.toLowerCase()) !== -1))
    return state.persons.filter(person => (person.nombre_completo.toLowerCase().search(search.toLowerCase()) !== -1 || person.identificacion.toLowerCase().search(search.toLowerCase()) !== -1) && !person.deleted_at)
  }
}

// actions
const actions = {
  async save(context, person) {
    return await new Promise(resolve => {
        const flagEdit = !!person.uuid
        const user = context.rootState?.authModule?.user || null
        if (user && !person.user_id) {
            person.user_id = user.id
            person.user = { id: user.id, name: user.name, email: user.email }
        }
        person.nombre_completo = [person.nombre1, person.nombre2, person.apellido1, person.apellido2].filter(x => x).join(' ')
        context.commit(person.uuid ? 'SET_EDIT_PERSON' : 'SET_ADD_PERSON', person)
        context.commit('SET_SNACKBAR', { message: `El registro de la persona se ${flagEdit ? 'actualizó' : 'registró'} correctamente.`  }, { root: true })
        resolve(true)
    })
  },
    async delete(context, person) {
    return await new Promise(resolve => {
        context.commit('SET_DELETE_PERSON', person)
        context.commit('SET_SNACKBAR', { message: `El registro de ${person.nombre_completo} se eliminó correctamente.`  }, { root: true })
        resolve(true)
    })
  }
}

// mutations
const mutations = {
    SET_DELETE_PERSON(state, person) {
        const index = state.persons.findIndex(x => x.uuid === person.uuid)
        if(index > -1) {
            person.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            person.deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')
            state.persons.splice(index,1, person)
        }
    },
    SET_EDIT_PERSON(state, person) {
        const index = state.persons.findIndex(x => x.uuid === person.uuid)
        if(index > -1) {
            person.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            state.persons.splice(index,1, person)
        }
    },
    SET_ADD_PERSON(state, person) {
        person.uuid = `person-${uuid.v1()}`
        person.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
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
