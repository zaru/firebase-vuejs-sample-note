<template>
  <div class="user">
    <h1>{{ user.uid }}</h1>
    <draggable v-model="notes" @start="drag=true" @end="drag=false" @sort="sorted">
      <div class="note-list" v-for="note in notes" :key="note.id">
        <router-link :to="{ name: 'Note', params: { noteId: note.id }}">{{ note.data.title || note.id }}</router-link>
      </div>
    </draggable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DbNote from '../db/note'
import DbUserNote from '../db/user_note'
import draggable from 'vuedraggable'

export default {
  name: 'User',
  components: {
    draggable
  },
  data () {
    return {
      notes: []
    }
  },
  methods: {
    sorted () {
      DbUserNote.updateNoteOrder(this.user.uid, this.notes.map(v => { return v.id }))
    }
  },
  created () {
    DbNote.fetchNotes(this.user.uid, this.notes)
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="scss" scoped>
  .note-list {
    padding: 5px 10px;
    cursor: pointer;
  }
</style>
