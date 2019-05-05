<template>
  <div class="navbar-container">
    <b-navbar class="navbar navbar-container__navbar">
      <router-link to="/" class="navbar-brand navbar-container__navbar__brand">
        <img src="../assets/diamondwhite.svg" width="50" height="50" class="navbar-container__navbar__brand__img"
             alt="diamond">
        DIAMOND CHAT
      </router-link>
      <div class="navbar navbar-container__navbar__auth-links">
        <router-link to="/random-chat" v-if="showAuthLinks" class="navbar-container__navbar__link">Random Chat
        </router-link>
        <router-link to="/dashboard" v-if="showAuthLinks" class="navbar-container__navbar__link">Dashboard</router-link>
      </div>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <button class="navbar-container__navbar__spotify-button" v-if="showLoginLink"
                  @click="loginWithSpotify" type="button">
            <img src="../assets/spotify-b.png" class="navbar-container__navbar__spotify-button__image"
                 alt="spotify">
            Login with Spotify
          </button>
          <b-button class="navbar-container__navbar__button" v-if="showAuthLinks" @click="logout">Logout</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    import authRes from '../resources/auth.resource'

    const {mapState, mapActions} = createNamespacedHelpers('auth')

    export default {
        name: 'Header',
        data() {
            return {
                isLoginScreen: false
            }
        },
        methods: {
            ...mapActions(['logout', 'setUserInfo', 'setAccessToken']),
            loginWithSpotify() {
                authRes.loginWithSpotify()
            },
            checkIsTokenValid(token) {
                if (token) {
                    this.$router.replace('/');
                    authRes.getUserInfo(token)
                        .then(function (response) {
                            console.log(response)
                            this.setUserInfo(response)
                            this.setAccessToken(token)
                        }.bind(this))
                        .catch(function (error) {
                            console.log(error);
                        }.bind(this));
                }
            }
        },
        computed: {
            ...mapState(['isAuthenticated']),
            showLoginLink() {
                if (this.isAuthenticated) {
                    return false
                } else if (this.isLoginScreen) {
                    return false
                } else {
                    return true
                }
            },
            showAuthLinks() {
                if (this.isAuthenticated) {
                    return true
                } else if (this.isLoginScreen) {
                    return false
                } else {
                    return false
                }
            }
        },
        watch: {
            $route(to, from) {
                this.isLoginScreen = to.path === "/login";
            },
            '$route.query.access_token': function (token) {
                this.checkIsTokenValid(token)
            }
        }
    };
</script>

<style scoped lang="scss">
  @import "../styles/components/Header";
</style>
