<template>
  <div class="toptracks">
    <div class="toptracks__header">
      TOP TRACKS
    </div>
    <Carousel :per-page="4" style="width: 80%" :loop="true" v-if="tracks.length>0"
              :speed="1000" :navigationEnabled="true" paginationActiveColor="#1db954"
              :navigationClickTargetSize="20" >
      <Slide v-for="track in tracks" :key="track.id" class="toptracks__track">
        <div class="toptracks__track__container">
          <img :src="track.imageUrl" class="toptracks__track__container__img"
               :class="{'toptracks__track__container__img--clicked' : currentTrack === track.id }"
               :alt="track.trackName">
        </div>
        <div class="toptracks__track__play" :class="{'toptracks__track__play--clicked' : currentTrack === track.id }">
          <img src="../assets/icons/pause-img.svg"
               @click="playMusic(track.trackUrl, track.id)"
               class="toptracks__track__play__img" alt="pause_img" v-if="currentTrack === track.id">
          <img src="../assets/icons/play-img.svg"
               @click="playMusic(track.trackUrl, track.id)"
               class="toptracks__track__play__img" alt="play_img" v-else>
        </div>
        <div class="toptracks__track__name">
          {{track.artistName}} - {{track.trackName}}
        </div>
      </Slide>
    </Carousel>
    <div v-else style="padding-top: 50px">
      <i class="fas fa-sync-alt fa-spin fa-5x" style="color: white"></i>
    </div>
  </div>
</template>

<script>
  import musicService from '../services/music.service'
  import { Carousel, Slide } from 'vue-carousel';
  import { mapState, mapActions } from 'vuex'


  export default {
    name: "TopTracks",
    data() {
      return {
        tracks: [],
        isMusicPlaying: false,
        audio: null,
        currentTrack: null
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
      ...mapActions('auth', [ 'logout', 'setSessionExpired' ]),
      getTopTracks() {
        musicService.getTopTracks(this.token).then(response => {
          this.tracks = response.data;
        }).catch(error => {
          if(error.response.status === 401) {
            this.setSessionExpired(true)
          }
        })
      },
      async playMusic(audioUrl, trackId) {
        if (this.audio == null) {
          this.audio = new Audio(audioUrl);
          this.audio.volume = 0.2;
          this.currentTrack = trackId;
        }
        if (this.isMusicPlaying) {
          await this.audio.pause();
          if (trackId !== this.currentTrack) {
            this.audio = new Audio(audioUrl);
            await this.audio.play();
            this.audio.currentTime = 0;
            this.audio.volume = 0.2;
            this.currentTrack = trackId;
          } else {
            this.audio.currentTime = 0;
            this.audio = null;
            this.isMusicPlaying = false;
            this.currentTrack = null;
          }
        } else {
          await this.audio.play();
          this.isMusicPlaying = true;
          this.currentTrack = trackId;
        }
      }
    },
    computed: {
      ...mapState('auth', {
        token: state => state.token,
      }),
    }
  }
</script>

<style lang="scss">
  @import "../styles/components/TopTracks";
</style>
