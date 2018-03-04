<template>
  <div class="note container">
    <div class="header">
      {{ this.$route.params.noteId }}
    </div>
    <div class="main">
      <textarea v-model="body" @keyup="sync"></textarea>
    </div>
    <div class="right">
      <ul class="users">
        <li v-for="user in users" :key="user.uid">{{ user.uid }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {db} from '../firebase'

export default {
  name: 'Note',
  data () {
    return {
      body: '',
      users: []
    }
  },
  methods: {
    sync () {
      console.log(this.$route.params.noteId)
      db.collection('notes').doc(this.$route.params.noteId).update({
        body: this.body
      }).then(() => {
        console.log('Document successfully updated!')
      }).catch(error => {
        console.error('Error updating document: ', error)
      })
    }
  },
  beforeMount () {
    if (!this.$route.params.noteId) {
      db.collection('notes').add({
        title: '',
        body: '',
        user_id: this.user.uid
      }).then(docRef => {
        this.$router.push({name: 'Note', params: { noteId: docRef.id }})
      }).catch(error => {
        console.error('Error adding document: ', error)
      })
    }
  },
  mounted () {
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style scoped>
  .container {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-areas: "header header"
    "main right";
    grid-template-columns: 10fr 2fr;
    grid-template-rows: 80px 1fr;
  }
  .container > div {
    border: 1px dashed #888;
  }

  .header {
    grid-area: header;
  }
  .main {
    grid-area: main;
  }
  .right {
    grid-area: right;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border: none;
    padding: 10px;
    font-size: 16px;
  }
</style>
