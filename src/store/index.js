import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },
  getters: {
    user: (state) => state.user
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    init ({ commit }) {
      return new Promise((resolve) => {
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user)
          console.log('onAuthStateChanged callback')
          let profile = {
            auth: false,
            uid: '',
            email: '',
            isAnonymous: false
          }
          if (user) {
            profile = {
              auth: true,
              uid: user.uid,
              email: user.email,
              isAnonymous: user.isAnonymous
            }
          }
          commit('setUser', profile)
          resolve()
        })
      })
    }
  }
})

export default store
