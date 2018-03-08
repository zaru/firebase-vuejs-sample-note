<template>
  <div class="note container">
    <div class="header">
      <ul>
        <li>note id: {{ note_id }}</li>
        <li>user id: {{ user }}</li>
      </ul>
      <ul class="header-actions">
        <li>
          <button @click="newDoc">New</button>
        </li>
        <li v-if="user.isAnonymous">
          <router-link to="/sign_up" tag="button">SignUp</router-link>
        </li>
        <li v-if="!user.isAnonymous">
          <router-link to="/" tag="button">LogOut</router-link>
        </li>
      </ul>
      <transition name="fade">
        <div v-if="show_sync_info" class="sync-info">auto saving...</div>
      </transition>
    </div>
    <div class="main">
      <textarea v-model="body" @keyup="sync"></textarea>
    </div>
    <div class="right">
      <ul class="users">
        <li v-for="user in users" :key="user.uid">{{ user.uid }}</li>
      </ul>
      <ul class="note">
        <li v-for="note in note" :key="note.id">
          <router-link :to="{ name: 'Note', params: { noteId: note.id }}">{{ note.id }}</router-link>
        </li>
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
      users: [],
      note: [],
      unsubscribe: null,
      show_sync_info: false
    }
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    sync: _.throttle(function () {
      this.show_sync_info = true
      setTimeout(() => {
        this.show_sync_info = false
      }, 2000)
      db.collection('note').doc(this.note_id).update({
        body: this.body
      }).then(() => {
        console.log('Document successfully updated!')
      }).catch(error => {
        console.error('Error updating document: ', error)
      })
    }, 5000),
    newDoc () {
      db.collection('note').add({
        title: '',
        body: '',
        user_id: this.user.uid
      }).then(docRef => {
        this.$router.push({name: 'Note', params: { noteId: docRef.id }})
        this.body = ''
      }).catch(error => {
        console.error('Error adding document: ', error)
      })
    },
    fetchData () {
      if (this.unsubscribe) {
        this.unsubscribe()
      }
      if (!this.$route.params.noteId) {
        return this.newDoc()
      }
      this.note_id = this.$route.params.noteId
      this.unsubscribe = db.collection('note').doc(this.note_id)
        .onSnapshot(doc => {
          this.body = doc.data().body
        }, () => {
          this.$router.push('/not_found')
        })
    },
    fetchNotes () {
      db.collection('note').where('user_id', '==', this.user.uid).get().then(result => {
        result.forEach(doc => {
          this.note.push({
            id: doc.id
          })
        })
      })
    }
  },
  created () {
    if (!this.$route.params.noteId) {
      this.newDoc()
    } else {
      this.note_id = this.$route.params.noteId
      this.fetchData()
    }
    this.fetchNotes()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="scss" scoped>
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
    position: relative;
  }
  .main {
    grid-area: main;
  }
  .right {
    grid-area: right;
    overflow: scroll;
  }

  .header-actions {
    margin:0;
    padding:0;
    position: absolute;
    top: 10px;
    right: 10px;
    li {
      display: inline;
    }
  }

  .sync-info {
    position: absolute;
    top: 10px;
    right: 150px;
    background: #c3ffd9;
    padding: 2px 5px;
    border-radius: 3px;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1.0s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
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
