<template>
  <ul class="giphy">
    <li v-for="giphy in giphys" :key="giphy.id">
      <video loop muted width="150" @mouseenter="play_giphy" @mouseleave="stop_giphy" @click="insert_giphy" :data-url="giphy.images.preview.mp4_url">
        <source :src="giphy.images.preview.mp4_url" type="video/mp4" />
      </video>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import GiphyClient from '@/lib/giphy_client'
import insertAtCursor from '@/lib/insert_at_cursor'

export default {
  name: 'GiphyList',
  data () {
    return {
      giphys: []
    }
  },
  props: ['textarea'],
  methods: {
    play_giphy (e) {
      e.target.play()
      console.log(e)
    },
    stop_giphy (e) {
      e.target.pause()
    },
    insert_giphy (e) {
      console.log(this.textarea)
      const body = insertAtCursor(this.textarea, '# giphy: ' + e.target.dataset.url)
      this.$emit('syncBody', { body: body })
    }
  },
  created () {
    const gphClient = GiphyClient
    gphClient.trending('gifs', {})
      .then((response) => {
        this.giphys = response.data
      })
      .catch((err) => {
        console.log(err)
      })
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
