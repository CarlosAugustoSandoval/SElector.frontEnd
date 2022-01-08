import firebase from 'firebase'
const config = {
    apiKey: 'AIzaSyDnou0wvar4bDaB4fGBDwegyt636iP-4lk',
    authDomain: 'versionesapsoft.firebaseapp.com',
    projectId: 'versionesapsoft',
    storageBucket: 'versionesapsoft.appspot.com',
    messagingSenderId: '635155428389',
    appId: '1:635155428389:web:58a87a68d1919d31387bcc',
    measurementId: 'G-ETBB4GH770'
}

firebase.initializeApp(config)

export const db = firebase.firestore()
export const fire = firebase