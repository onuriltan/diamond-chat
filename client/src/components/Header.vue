<template>
  <div class="navbar-container">
    <b-navbar class="navbar navbar-container__navbar">
      <router-link to="/" class="navbar-brand navbar-container__navbar__brand">
        <img src="../assets/diamondwhite.svg" width="50" height="50" class="navbar-container__navbar__brand__img"
             alt="diamond">
        DIAMOND CHAT
      </router-link>
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <router-link to="/login">
            <b-button class="navbar-container__navbar__button" v-if="showLoginLink">Login</b-button>
          </router-link>
          <b-button class="navbar-container__navbar__button" v-if="showLogoutLink" @click="logout">Logout</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'
  const {mapState, mapActions} = createNamespacedHelpers('auth')

  export default {
    name: 'Header',
    data() {
      return {
        isLoginScreen: false
      }
    },
    methods: {
      ...mapActions(['logout']),
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
      showLogoutLink() {
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
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../styles/components/Header";
</style>
