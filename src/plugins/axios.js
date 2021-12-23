import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL = 'http://localhost:8000/api'
// axios.defaults.baseURL = 'http://179.50.78.197:8000/api'
Vue.use(VueAxios, axios)