import {db, fire} from '../plugins/firebase'
// state
const state = {
    versionFirebase: null,
    reloadAplication: false
}

// getters
const getters = {
}

// actions
const actions = {
    async getReloadFirebase (context) {
        db.collection('vSElector').doc('unique').onSnapshot(convo => {
            let source = convo?.data() || null
            context.commit('SET_RELOAD_FIREBASE', source ? source.version : null)
        })
    },
    async setVersionFirebase (context) {
        return await new Promise(resolve => {
            db.collection('vSElector').doc('unique').update({
                version: fire.firestore.FieldValue.increment(1)
            })
                .then(() => {
                    context.commit('SET_SNACKBAR', { color: 'success', message: 'Alerta de cambios lanzada correctamente.' }, { root: true })
                    resolve(true)
                })
                .catch(e => {
                    context.commit('SET_SNACKBAR', { color: 'error', message: 'Error al lanzar la alerta de cambios.', error: e }, { root: true })
                    resolve(false)
                })
        })

    }
}

// mutations
const mutations = {
    SET_RELOAD_FIREBASE (state, version) {
        if (!version || (state.versionFirebase !== version)) {
            state.versionFirebase = version
            state.reloadAplication = true
        }
    },
    SET_OFF_RELOAD_FIREBASE (state) {
        state.reloadAplication = false
        setTimeout(() => {
            location.reload(true)
        }, 1000)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
