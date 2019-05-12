<template>
  <div class="toptracks">
    <div class="toptracks__header">
      TOP TRACKS
    </div>
    <div class="toptracks__container">
      <div class="toptracks__container__track" v-for="track in tracks" :key="track.id">
        <img :src="track.imageUrl" class="toptracks__container__track__img"/>
        <div class="toptracks__container__track__name">
          {{track.artistName}} - {{track.trackName}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import musicService from '../services/music.service'
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('auth')

  export default {
    name: "TopTracks",
    data() {
      return {
        tracks: []
      }
    },
    mounted() {
      this.getTopTracks()
    },
    methods: {
      getTopTracks() {
        musicService.getTopTracks(this.token).then(response => {
          this.tracks = response.data;
          console.log(this.tracks)
        }).catch(error => {
          alert(error)
        })
      }
    },
    computed: {
      ...mapState(['token']),
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/components/TopTracks";
</style>