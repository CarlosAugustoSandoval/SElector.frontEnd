/* eslint-disable no-console */
import store from '@/store'
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`,  {
    registrationOptions: {
      updateViaCache: 'all'
    },
    ready () {
      store.commit('firebaseModule/SET_UPDATE_LOADER', false)
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      store.commit('firebaseModule/SET_UPDATE_LOADER')
      console.log('New content is downloading.')
      window.caches.keys().then(async names => {
        for (let name of names) {
          await window.caches.delete(name)
        }
      })
      store.commit('firebaseModule/SET_OFF_RELOAD_FIREBASE', true)
    },
    updated (registration) {
      console.log('New content is available; please refresh.', registration)
      setTimeout(() => {
        if (store.state.firebaseModule.reloadAplication) {
          store.commit('firebaseModule/SET_OFF_RELOAD_FIREBASE')
          store.commit('firebaseModule/SET_UPDATE_LOADER', false)
        }
      }, 5000)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
