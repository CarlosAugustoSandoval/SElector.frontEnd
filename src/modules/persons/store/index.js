import {uuid} from 'vue-uuid'
import moment from 'moment'
import Vue from 'vue'
import db from '@/db/db'

// state
const state = {
    persons: []
}

// getters
const getters = {
    persons: state => search => {
        return state.persons.filter(person => (person.nombre_completo.toLowerCase().search(search.toLowerCase()) !== -1 || person.identificacion.toLowerCase().search(search.toLowerCase()) !== -1) && !person.deleted_at)
    }
}

// actions
const actions = {
    getPersons (context, search = '') {
        let persons = db.persons.filter(person => !person.deleted_at)
        return search
            ? persons
                .and(person => !!(person.nombre_completo.toLowerCase().search(search.toLowerCase()) !== -1 || person.identificacion.toLowerCase().search(search.toLowerCase()) !== -1))
                .toArray()
            : persons
                .toArray()
    },
    getUnsyncPersons () {
        return db.persons.filter(person => !person.sincronizado).toArray()
    },
    async save(context, person) {
        const flagEdit = !!person.uuid
        const user = context.rootState?.authModule?.user || null
        if (user && !person.user_id) {
            person.user_id = user.id
            person.user = {id: user.id, name: user.name, email: user.email}
        }
        person.nombre_completo = [person.nombre1, person.nombre2, person.apellido1, person.apellido2].filter(x => x).join(' ')
        if(!person.uuid) {
            person.uuid = `person-${uuid.v1()}`
            person.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        } else {
            person.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            person.sincronizado = 0
        }
        if (navigator.onLine) {
            const saveServer = await context.dispatch('syncServer', person)
            console.log('saveServer', saveServer)
            if(saveServer) person.sincronizado = 1
        }
        return await db.persons[flagEdit ? 'put' : 'add'](person)
            .then(() => {
                context.commit('SET_SNACKBAR', { message: `La persona se ${flagEdit ? 'actualizó' : 'registró'} correctamente.` }, {root: true})
                return true
            })
            .catch(() => {
                context.commit('SET_SNACKBAR', { message: `Error al ${flagEdit ? 'actualizar' : 'registrar'} la persona.` }, {root: true})
                return false
            })
    },
    async delete(context, person) {
        person.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
        person.deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')
        person.sincronizado = 0
        if (navigator.onLine) {
            const saveServer = await context.dispatch('syncServer', person)
            if(saveServer) person.sincronizado = 1
        }
        return await db.persons['put'](person)
            .then(() => {
                context.commit('SET_SNACKBAR', { message: `El registro de la persona eliminó correctamente.` }, {root: true})
                return true
            })
            .catch(() => {
                context.commit('SET_SNACKBAR', { message: `Error al eliminar el registro de la persona.` }, {root: true})
                return false
            })
    },
    // async save(context, person) {
    //     // eslint-disable-next-line no-async-promise-executor
    //     return await new Promise(async resolve => {
    //         console.log('person 0 ', person)
    //         const flagEdit = !!person.uuid
    //         const user = context.rootState?.authModule?.user || null
    //         if (user && !person.user_id) {
    //             person.user_id = user.id
    //             person.user = {id: user.id, name: user.name, email: user.email}
    //         }
    //         person.nombre_completo = [person.nombre1, person.nombre2, person.apellido1, person.apellido2].filter(x => x).join(' ')
    //         context.commit(person.uuid ? 'SET_EDIT_PERSON' : 'SET_ADD_PERSON', person)
    //         context.commit('SET_SNACKBAR', {message: `El registro de la persona se ${flagEdit ? 'actualizó' : 'registró'} correctamente.`}, {root: true})
    //         console.log('person 1 ', person)
    //         if (navigator.onLine) {
    //             const saveServer = await context.dispatch('syncServer', person)
    //             console.log('saveServer', saveServer)
    //         }
    //         resolve(true)
    //     })
    // },
    async syncServer(context, person) {
        return await new Promise(resolve => {
            Vue.axios.post('electores/elector', person)
                .then(() => {
                    context.commit('SET_SNACKBAR', {message: `El registro de ${person.nombre1} ${person.apellido1} se sincronizó correctamente.`}, {root: true})
                    context.commit('SET_SYNC_PERSON', person)
                    resolve(true)
                })
                .catch((error) => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al sincronizar el registro de ${person.nombre1} ${person.apellido1}.` }, { root: true })
                    resolve(false)
                })
        })
    }
    // async delete(context, person) {
    //     return await new Promise(resolve => {
    //         context.commit('SET_DELETE_PERSON', person)
    //         context.commit('SET_SNACKBAR', {message: `El registro de ${person.nombre_completo} se eliminó correctamente.`}, {root: true})
    //         resolve(true)
    //     })
    // }
}

// mutations
const mutations = {
    SET_SYNC_PERSON(state, person) {
        const index = state.persons.findIndex(x => x.uuid === person.uuid)
        if (index > -1) {
            person.sincronizado = 1
            state.persons.splice(index, 1, person)
        }
    },
    SET_DELETE_PERSON(state, person) {
        const index = state.persons.findIndex(x => x.uuid === person.uuid)
        if (index > -1) {
            person.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            person.deleted_at = moment().format('YYYY-MM-DD HH:mm:ss')
            state.persons.splice(index, 1, person)
        }
    },
    SET_EDIT_PERSON(state, person) {
        const index = state.persons.findIndex(x => x.uuid === person.uuid)
        if (index > -1) {
            person.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            person.sincronizado = 0
            state.persons.splice(index, 1, person)
        }
    },
    SET_ADD_PERSON(state, person) {
        person.uuid = `person-${uuid.v1()}`
        person.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        state.persons.splice(0, 0, person)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
