<template>
  <div class="note container">
    <div class="header">
      {{ this.$route.params.noteId }}
    </div>
    <div class="main">
      <textarea v-model="body" @keyup="sync()"></textarea>
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
import _ from 'lodash'

export default {
  name: 'Note',
  data () {
    return {
      note_id: null,
      body: '',
      users: []
    }
  },
  methods: {
    sync: _.throttle(function () {
      db.collection('notes').doc(this.note_id).update({
        body: this.body
      }).then(() => {
        console.log('Document successfully updated!')
      }).catch(error => {
        console.error('Error updating document: ', error)
      })
    }, 2000)
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
    } else {
      this.note_id = this.$route.params.noteId
      db.collection('notes').doc(this.note_id).get().then(doc => {
        this.body = doc.data().body
      }).catch(error => {
        console.log(error)
      })
    }
  },
  mounted () {
    db.collection('notes').doc(this.$route.params.noteId)
      .onSnapshot(doc => {
        console.log('Current data: ', doc && doc.data())
      })
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
