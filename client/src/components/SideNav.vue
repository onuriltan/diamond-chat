<template>
  <div id="mySidenav" class="sidenav" v-bind:class="{ 'show-sidenav' : show, 'close-sidenav': !show }">
    <div class="sidenav__closebutton" v-on:click="closeSideNav">&times;</div>
    <router-link to="/" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        Home
      </div>
    </router-link>
    <router-link to="/random-chat" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        Random Chat
      </div>
    </router-link>
    <router-link to="/dashboard" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        Dashboard
      </div>
    </router-link>
    <div class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNavAndLogout">
        Logout
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SideNavigation",
      props: {
        show: Boolean,
        logout: Function
      },
    methods: {
      closeSideNav() {
        this.$emit('sideNavClosed', false);
      },
      closeSideNavAndLogout() {
          this.$emit('sideNavClosed', false);
          this.logout();
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/components/SideNav";
</style>
