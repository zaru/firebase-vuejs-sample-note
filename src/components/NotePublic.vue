<template>
  <div class="note_public">
    <h1>{{ title }}</h1>
    <p class="thumbnail"><img :src="image"></p>
    <div class="body" v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import {db} from '../firebase'
import marked from 'marked'

export default {
  name: 'NotePublic',
  data () {
    return {
      note_id: null,
      title: '',
      image: '',
      body: ''
    }
  },
  methods: {
    fetchData () {
      db.collection('note').doc(this.note_id)
        .get().then(doc => {
          this.title = doc.data().title
          this.image = doc.data().image
          this.body = doc.data().body
        }).catch(() => {
          this.$router.push('/not_found')
        })
    }
  },
  created () {
    if (this.$route.query.noteId) {
      this.$router.replace('/@note/' + this.$route.query.noteId)
    }
    this.note_id = this.$route.query.noteId || this.$route.params.noteId
    if (!this.note_id) {
      this.$router.push('/not_found')
    }
    this.fetchData()
  },
  computed: {
    compiledMarkdown () {
      return marked(this.body, { sanitize: true })
    }
  }
}
</script>

<style lang="scss" scoped>
  h1 {
    padding: 20px;
  }
  .thumbnail {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  .thumbnail img {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: auto;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .body {
    padding: 20px;
  }
</style>
