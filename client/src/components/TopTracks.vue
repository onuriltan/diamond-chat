<template>
  <div class="toptracks">
    <div class="toptracks__header">
      TOP TRACKS
    </div>
    <Carousel :per-page="4" style="width: 80%" pagination-enabled="false" loop="true" speed="800" >
      <Slide v-for="track in tracks" :key="track.id" class="toptracks__track">
          <img :src="track.imageUrl" class="toptracks__track__img" :alt="track.trackName"/>
          <div class="toptracks__track__name">
            {{track.artistName}} - {{track.trackName}}
          </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script>
  import musicService from '../services/music.service'
  import {createNamespacedHelpers} from 'vuex'
  import {Carousel, Slide} from 'vue-carousel';

  const {mapState} = createNamespacedHelpers('auth')

  export default {
    name: "TopTracks",
    data() {
      return {
        tracks: []
      }
    },
    components: {
      Carousel,
      Slide
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