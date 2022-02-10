import {uuid} from 'vue-uuid'
import moment from 'moment'
import Vue from 'vue'
import db from '@/db/db'

// state
const state = {
}

// getters
const getters = {
}

// actions
const actions = {
    async save(context, intention) {
        const flagEdit = !!intention.uuid
        const user = context.rootState?.authModule?.user || null
        if (user && !intention.user_id) {
            intention.user_id = user.id
            intention.user = {id: user.id, name: user.name, email: user.email}
        }
        if(!intention.uuid) {
            intention.uuid = `intention-${uuid.v1()}`
            intention.created_at = moment().format('YYYY-MM-DD HH:mm:ss')
        } else {
            intention.updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
            intention.sincronizado = 0
        }
        if (navigator.onLine) {
            const saveServer = await context.dispatch('syncServer', intention)
            if(saveServer) intention.sincronizado = 1
        }
        return await db.intentions[flagEdit ? 'put' : 'add'](intention)
            .then(() => {
                context.commit('SET_SNACKBAR', { message: `La intención de voto se ${flagEdit ? 'actualizó' : 'registró'} correctamente.` }, {root: true})
                return true
            })
            .catch(() => {
                context.commit('SET_SNACKBAR', { message: `Error al ${flagEdit ? 'actualizar' : 'registrar'} la intención de voto.` }, {root: true})
                return false
            })
    },
    getUnsyncItems () {
        return db.intentions.filter(intention => !intention.sincronizado).toArray()
    },
    async syncServer(context, intention) {
        return await new Promise(resolve => {
            Vue.axios.post('electores/intencion-voto', intention)
                .then(() => {
                    context.commit('SET_SNACKBAR', {message: `El registro de intención de voto se sincronizó correctamente.`}, {root: true})
                    resolve(true)
                })
                .catch((error) => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: `Error ${error?.response?.status || ''} al sincronizar el registro de intención de voto.` }, { root: true })
                    resolve(false)
                })
        })
    },
    async syncServerLote(context, intentions = []) {
        context.commit('SET_TEXT_LOADING', 'Resolviendo sincronización de intenciones de voto.', {root: true})
        const unsyncItems = intentions.length ? intentions : await context.dispatch('getUnsyncItems')
        if (unsyncItems.length) {
            let rowsFailed = 0
            for (var i = 0; i <= unsyncItems.length - 1; i++) {
                context.commit('SET_TEXT_LOADING', `Sincronizando intención de voto ${i} de ${unsyncItems.length}`, {root: true})
                context.commit('SET_PERCENT_LOADING', (i / unsyncItems.length) * 100, {root: true})
                const unsyncItem = unsyncItems[i]
                const count = await context.dispatch('syncServer', unsyncItem) ? 0 : 1
                if(!count) {
                    unsyncItem.sincronizado = 1
                    await db.intentions['put'](unsyncItem)
                        .catch(() => {
                            unsyncItem.sincronizado = 0
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
    }
}

// mutations
const mutations = {
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
