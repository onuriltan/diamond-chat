<template>


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
          console.log(response)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    computed: {
      ...mapState(['token']),
    }
  }
</script>

<style scoped lang="scss">


</style>