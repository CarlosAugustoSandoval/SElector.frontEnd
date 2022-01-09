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
      window.caches.keys().then(async names => {
        for (let name of names) {
          await window.caches.delete(name)
        }
      })
      console.log('New content is downloading.')
      setTimeout(() => {
        store.commit('firebaseModule/SET_OFF_RELOAD_FIREBASE')
      }, 1000)
    },
    updated (registration) {
      console.log('New content is available; please refresh.', registration)
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
