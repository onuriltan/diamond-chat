<template>
  <div class="navbar-container">
    <b-navbar class="navbar navbar-container__navbar">
      <div class="navbar-container__main">
        <i class="navbar-container__navbar__bars fa fa-bars fa-2x" v-if="showAuthLinks" @click="onMenuClick" aria-hidden="true"></i>

        <router-link to="/" class="navbar-brand navbar-container__navbar__brand">
          <img src="../assets/diamondwhite.svg" width="50" height="50" class="navbar-container__navbar__brand__img"
               alt="diamond">
          DIAMOND CHAT
        </router-link>
      </div>
      <div class="navbar-container__elements">

        <div class="navbar navbar-container__navbar__auth-links">
          <router-link to="/random-chat" v-if="showAuthLinks" class="navbar-container__navbar__link">Random Chat
          </router-link>
          <router-link to="/dashboard" v-if="showAuthLinks" class="navbar-container__navbar__link">Dashboard
          </router-link>
        </div>
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button class="navbar-container__navbar__button" v-if="showAuthLinks" @click="logout">Logout</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </div>
    </b-navbar>
    <SideNav :show="showSideNav" @sideNavClosed="showSideNav = $event" :logout="logout" ></SideNav>
  </div>
</template>

<script>
    import authRes from '../services/auth.service'
    import SideNav from './SideNav'
    import {createNamespacedHelpers} from 'vuex'

    const {mapState, mapActions} = createNamespacedHelpers('auth')

    export default {
        name: 'Header',
        data() {
            return {
                isLoginScreen: false,
                showSideNav: false
            }
        },
        components: {
            SideNav
        },
        methods: {
            ...mapActions(['logout', 'setUserInfo', 'setAccessToken']),
            onMenuClick: function () {
                this.showSideNav = !this.showSideNav;
            },
            loginWithSpotify() {
                authRes.loginWithSpotify()
            },
            checkIsTokenValid(token) {
                if (token) {
                    this.$router.replace('/');
                    authRes.getUserInfo(token)
                        .then(response => {
                            console.log(response)
                            this.setUserInfo(response)
                            this.setAccessToken(token)
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        },
        computed: {
            ...mapState(['isAuthenticated']),
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
