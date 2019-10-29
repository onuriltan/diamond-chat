<template>
  <div class="top-artists">

  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import musicService from '../../services/music.service'

  export default {
    name: "TopArtists",
    methods: {

    },
    mounted() {
      musicService.getTopArtists(this.token).then(response => {

      }).catch(error => {

      })
    },
    computed: {
      ...mapState('auth', {
        token: state => state.token,
      }),
    }
  }
</script>

<style scoped lang="scss">
  @import "TopArtists";
</style>
