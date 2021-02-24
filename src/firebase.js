import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCUYpTdrHzK7uzaynTMMogmUmGm8oEFGt8",
    authDomain: "vetclinic-bd32b.firebaseapp.com",
    projectId: "vetclinic-bd32b",
    storageBucket: "vetclinic-bd32b.appspot.com",
    messagingSenderId: "1053074187414",
    appId: "1:1053074187414:web:748aaa9437b664e0b54eb7"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)