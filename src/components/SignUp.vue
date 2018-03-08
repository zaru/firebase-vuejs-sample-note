<template>
  <div class="user-session">
    <h2>SignUp</h2>
    <dl>
      <dt>Email</dt>
      <dd><input type="text" v-model="email"></dd>
      <dt>Password</dt>
      <dd><input type="password" v-model="password"></dd>
    </dl>
    <button @click="signUp">sign up</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import {db} from '../firebase'

export default {
  name: 'SingUp',
  data () {
    return {
      user: null,
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      const credential = firebase.auth.EmailAuthProvider.credential(this.email, this.password)
      firebase.auth().currentUser.linkWithCredential(credential).then(user => {
        db.collection('user').doc(user.uid).set({
          created_at: Date.now()
        }).then(docRef => {
          this.$router.push('/')
        }).catch(error => {
          console.error('Error adding document: ', error)
        })
      }, error => {
        console.log('Error upgrading anonymous account', error)
      })
    }
  }
}
</script>

<style scoped>
</style>
