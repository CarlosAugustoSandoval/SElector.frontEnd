import {uuid} from 'vue-uuid'
import moment from 'moment'
import Vue from 'vue'
import db from '@/db/db'

// state
const state = {
    complementsFilters: null
}

// getters
const getters = {
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
                context.commit('SET_SNACKBAR', { message: `El elector se ${flagEdit ? 'actualizó' : 'registró'} correctamente.` }, {root: true})
                return true
            })
            .catch(() => {
                context.commit('SET_SNACKBAR', { message: `Error al ${flagEdit ? 'actualizar' : 'registrar'} el elector.` }, {root: true})
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
                context.commit('SET_SNACKBAR', { message: `El registro del elector se eliminó correctamente.` }, {root: true})
                return true
            })
            .catch(() => {
                context.commit('SET_SNACKBAR', { message: `Error al eliminar el registro del elector.` }, {root: true})
                return false
            })
    },
    async syncServer(context, person) {
        return await new Promise(resolve => {
            Vue.axios.post('electores/elector', person)
                .then(() => {
                    context.commit('SET_SNACKBAR', {message: `El registro de ${person.nombre1} ${person.apellido1} se sincronizó correctamente.`}, {root: true})
                    resolve(true)
                })
                .catch((error) => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al sincronizar el registro de ${person.nombre1} ${person.apellido1}.` }, { root: true })
                    resolve(false)
                })
        })
    },
    async syncServerLote(context, persons = []) {
        context.commit('SET_TEXT_LOADING', 'Resolviendo sincronización de electores.', {root: true})
        const unsyncPersons = persons.length ? persons : await context.dispatch('getUnsyncPersons')
        console.log('unsyncPersons', unsyncPersons.length)
        if (unsyncPersons.length) {
            let rowsFailed = 0
            for (var i = 0; i <= unsyncPersons.length - 1; i++) {
                context.commit('SET_TEXT_LOADING', `Sincronizando elector ${i} de ${unsyncPersons.length}`, {root: true})
                context.commit('SET_PERCENT_LOADING', (i / unsyncPersons.length) * 100, {root: true})
                const unsyncPerson = unsyncPersons[i]
                const count = await context.dispatch('syncServer', unsyncPerson) ? 0 : 1
                if(!count) {
                    unsyncPerson.sincronizado = 1
                    await db.persons['put'](unsyncPerson)
                        .catch(() => {
                            unsyncPerson.sincronizado = 0
                            context.commit('SET_SNACKBAR', { color: 'error', message: `Error al actualizar el registro.` }, {root: true})
                        })
                }
                rowsFailed = rowsFailed + count
            }
            context.commit('SET_SNACKBAR',{
                color: rowsFailed ? 'orange' : 'success',
                message: `El proceso de sincronización ha terminado${rowsFailed === 0 ? '' : ` con ${rowsFailed} ${rowsFailed === 1 ? 'error' : 'errores'}`}`
            }, {root: true})
        }
    },
    async getComplementsFilters(context) {
        Vue.axios.get('electores/data-filters')
            .then(response => {
                context.commit('SET_COMPLEMENTS_FILTERS', response.data)
            })
            .catch(error => {
                context.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al recuperar los datos de filtros.`, error: error }, { root: true })
            })
    },
    async searchElectorServer(context, identification) {
        return await new Promise(resolve => {
            Vue.axios.get(`electores/by-identificacion/${identification}`)
                .then(response => {
                    console.log('response elector', response)
                    resolve(response.data || null)
                })
                .catch(error => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al hacer la búsqueda del afiliado.`, error: error }, { root: true })
                    resolve(null)
                })
        })
    }
}

// mutations
const mutations = {
    SET_COMPLEMENTS_FILTERS(state, data) {
        state.complementsFilters = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
