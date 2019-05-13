<template>
  <div class="toptracks">
    <div class="toptracks__header">
      TOP TRACKS
    </div>
    <Carousel :per-page="4" style="width: 80%" :loop="true"
              :speed="1000" :navigationEnabled="true" paginationActiveColor="#1db954"
              :navigationClickTargetSize="20">
      <Slide v-for="track in tracks" :key="track.id" class="toptracks__track">
        <div class="toptracks__track__container">
          <img :src="track.imageUrl" class="toptracks__track__container__img"
               @click="playMusic(track.trackUrl)" :alt="track.trackName">
        </div>
        <div class="toptracks__track__play">
          <img src="../assets/icons/play-button.svg" class="toptracks__track__play__img" alt="play_button">
        </div>
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
        tracks: [],
        isMusicPlaying: false,
        audio: null
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
        }).catch(error => {
          alert(error)
        })
      },
      async playMusic(audioUrl) {
        if (this.audio == null) {
          this.audio = new Audio(audioUrl);
          this.audio.volume = 0.2;
        }
        if (this.isMusicPlaying) {
          await this.audio.pause();
          this.audio.currentTime = 0;
          this.audio = null;
          this.isMusicPlaying = false
        } else {
          await this.audio.play()
          this.isMusicPlaying = true
        }
      }
  },
  computed: {
  ...
    mapState(['token']),
  }
  }
</script>

<style lang="scss">
  @import "../styles/components/TopTracks";
</style>