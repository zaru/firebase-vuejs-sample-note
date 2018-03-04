<template>
  <div class="user-session">
    <h2>サインアップ</h2>
    <dl>
      <dt>Email</dt>
      <dd><input type="text" v-model="email"></dd>
      <dt>Password</dt>
      <dd><input type="password" v-model="password"></dd>
    </dl>
    <button @click="signUp">submit</button>
    <h2>サインイン・サインアップ</h2>
    <dl>
      <dt>Email</dt>
      <dd><input type="text" v-model="email"></dd>
      <dt>Password</dt>
      <dd><input type="password" v-model="password"></dd>
    </dl>
    <button @click="signIn">submit</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UserSession',
  data () {
    return {
      user: null,
      email: '',
      password: ''
    }
  },
  methods: {
    signUp () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        user => {
          console.log(user)
        },
        err => {
          alert(err.message)
        }
      )
    },
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          console.log(user)
          this.$router.push('/')
        },
        err => {
          alert(err.message)
        }
      )
    }
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user
      } else {
        // 匿名ログイン
        // firebase.auth().signInAnonymously().catch(console.error)
      }
    })
  }
}
</script>

<style scoped>
</style>
