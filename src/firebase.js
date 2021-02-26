import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAxeUNSAjfYxSWcvmZD1FD7gIZOxPVBAWk",
    authDomain: "vetclinic-5e156.firebaseapp.com",
    projectId: "vetclinic-5e156",
    storageBucket: "vetclinic-5e156.appspot.com",
    messagingSenderId: "768358731336",
    appId: "1:768358731336:web:3a749d99e604c2d3cf127d"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig)