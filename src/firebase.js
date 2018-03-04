import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyBGqhmGksHNseOlIgs1SbiBFs51UG7zE7E',
  authDomain: 'fir-sample-note.firebaseapp.com',
  databaseURL: 'https://fir-sample-note.firebaseio.com',
  projectId: 'fir-sample-note',
  storageBucket: 'fir-sample-note.appspot.com',
  messagingSenderId: '41044115429'
}

firebase.initializeApp(config)
export const db = firebase.firestore()
