// import something here

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// "async" is optional
export default async ({ Vue }) => {
  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  firebase.auth().languageCode = 'pt'

  Vue.prototype.$auth = firebase.auth
  Vue.prototype.$database = firebase.database
}




