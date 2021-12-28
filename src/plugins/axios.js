import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from '../router'
import store from '../store'

axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}:8000/api`
// axios.defaults.baseURL = 'http://localhost:8000/api'
// axios.defaults.baseURL = 'http://179.50.78.197:8000/api'
Vue.use(VueAxios, axios)

axios.interceptors.response.use(undefined, error => {
    if (error.response.status === 401) {
        store.commit('authModule/SET_LOGOUT')
        store.commit('SET_SNACKBAR', {color: 'warning', message: `Los datos de la sesión han expirado, inicie sesión nuevamente.`})
        router.replace({name: 'Login'})
    }
    return Promise.reject(error)
})