// import something here

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// "async" is optional
export default async ({ Vue }) => {
  
  let firebaseConfig = {
    apiKey: "AIzaSyAstQdq1CNDNZX-O-voCOadfXUbkJcnkpo",
    authDomain: "clinica-c64b5.firebaseapp.com",
    databaseURL: "https://clinica-c64b5.firebaseio.com",
    projectId: "clinica-c64b5",
    storageBucket: "clinica-c64b5.appspot.com",
    messagingSenderId: "726394542061",
    appId: "1:726394542061:web:836d7e6213b8f2379c79e4",
    measurementId: "G-T1EDQHP7ED"
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

  firebase.auth().languageCode = 'pt'

  Vue.prototype.$auth = firebase.auth
  Vue.prototype.$database = firebase.database
}




