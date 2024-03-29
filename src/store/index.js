import Vue from 'vue'
import Vuex from 'vuex'
import persist from '@/plugins/vuex-persist'
import dataModule from '@/data/store'
import authModule from '@/modules/auth/store'
import settingsModule from '@/modules/settings/store'
import personsModule from '@/modules/persons/store'
import firebaseModule from '@/modules/firebase/store'
import intentionModule from '@/modules/forms/intention/store'
import snackbar from '@/components/snackbar/store'
import loading from '@/components/globalComponents/loading/store'

import dedicatesModule from '@/data/store/dedicates'

import dataRowsModule from '@/components/globalComponents/cDataRows/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dataModule,
    authModule,
    settingsModule,
    personsModule,
    snackbar,
    loading,
    dataRowsModule,
    firebaseModule,
    intentionModule,
    dedicatesModule
  },
  plugins: [persist.plugin]
})
