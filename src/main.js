// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import firebase from 'firebase'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueFire)

const config = {
  apiKey: 'AIzaSyBGqhmGksHNseOlIgs1SbiBFs51UG7zE7E',
  authDomain: 'fir-sample-note.firebaseapp.com',
  databaseURL: 'https://fir-sample-note.firebaseio.com',
  projectId: 'fir-sample-note',
  storageBucket: 'fir-sample-note.appspot.com',
  messagingSenderId: '41044115429'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
