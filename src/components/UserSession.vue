<template>
  <div class="user-session">
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'UserSession',
  data () {
    return {
    }
  },
  methods: {
  },
  beforeCreate () {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // 匿名ログイン
        firebase.auth().signInAnonymously().catch(console.error)
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            this.$router.push('/')
          }
        })
      }
    })
  }
}
</script>

<style scoped>
</style>
