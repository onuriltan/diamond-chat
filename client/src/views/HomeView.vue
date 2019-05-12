<template>
  <div class="home">
    <span class="home__slogan" id="slogans"></span>
    <div class="home__explanation">
      Diamond chat is an real time chat application aims to connect people who shares the same music taste.
    </div>
    <button class="home__spotify-button" v-if="showLoginLink"
            @click="loginWithSpotify" type="button">
      <img src="../assets/spotify-b.png" class="home__spotify-button__image"
           alt="spotify">
      Login with Spotify
    </button>
  </div>

</template>

<script>
import TypeIt from 'typeit'
import {createNamespacedHelpers} from 'vuex'
import authService from '../services/auth.service'

const {mapState} = createNamespacedHelpers('auth')
export default {
    name: "HomeView",
    data() {
        return {
            isLoginScreen: false,
        }
    },
    computed: {
        ...mapState(['isAuthenticated']),
        showLoginLink() {
            if (this.isAuthenticated) {
                return false
            } else return !this.isLoginScreen;
        }
    },
    methods: {
        loginWithSpotify() {
            authService.loginWithSpotify()
        }
    },
    watch: {
        $route(to, from) {
            this.isLoginScreen = to.path === "/login";
        }
    },
    mounted() {
        new TypeIt('#slogans', {
            startDelay: 900,
            strings: ["Chat with people same with your music taste.", "Use music to connect with people."],
            speed: 80,
            loop: true,
            deleteSpeed: 80,
            breakLines: false,
            waitUntilVisible: true
        }).go().pause(700);
    }
}
</script>

<style scoped lang="scss">
  @import "../styles/views/homeview";
  @import "../styles/components/Header";

</style>
