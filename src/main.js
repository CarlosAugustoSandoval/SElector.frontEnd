import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'
import './plugins/vue-offline'
import './plugins/mixin'
import './plugins/globalComponents'
import './plugins/veeValidate'
import './plugins/axios'
import './plugins/moment'
import './plugins/vue-mask'

store.commit('authModule/SET_DEFAULT_AXIOS')
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
