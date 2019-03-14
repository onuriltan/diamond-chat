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
            <b-button class="navbar-container__navbar__button" v-if="showRouterLink">Login</b-button>
          </router-link>
        </b-nav-form>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        showRouterLink: false
      }
    },
    watch:{
      $route (to, from){
        this.showRouterLink = to.path !== "/login";
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../styles/components/Header";
</style>
