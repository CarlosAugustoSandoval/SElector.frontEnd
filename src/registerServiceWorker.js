/* eslint-disable no-console */
import store from '@/store'
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`,  {
    registrationOptions: {
      updateViaCache: 'all'
    },
    ready () {
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
      console.log('New content is downloading.')
      console.log('cargando cambios.')
      window.caches.keys().then(async names => {
        for (let name of names) {
          console.log('cargando cambios.')
          await window.caches.delete(name)
        }
      })
      console.log('cargando cambios.')
      store.commit('firebaseModule/SET_OFF_RELOAD_FIREBASE', true)
      console.log('cargando cambios.')
    },
    updated (registration) {
      console.log('New content is available; please refresh.', registration)
      setTimeout(() => {
        console.log('cargando cambios extra.')
      }, 5000)
      if (store.state.firebaseModule.reloadAplication)
        store.commit('firebaseModule/SET_OFF_RELOAD_FIREBASE')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
