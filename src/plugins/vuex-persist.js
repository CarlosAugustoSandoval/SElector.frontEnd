import VuexPersistence from 'vuex-persist'

export default new VuexPersistence({
    key: 'campaniapp',
    storage: window.localStorage,
    modules: [
        'authModule',
        'settingsModule',
        'personsModule'
    ]
})