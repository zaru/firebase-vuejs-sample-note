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
        console.log('Anonymous account successfully upgraded', user)
        this.$router.push('/')
      }, error => {
        console.log('Error upgrading anonymous account', error)
      })
    }
  }
}
</script>

<style scoped>
</style>
