<template>
  <div id="mySidenav" class="sidenav" v-bind:class="{ 'show-sidenav' : show, 'close-sidenav': !show }">
    <div class="sidenav__closebutton" v-on:click="closeSideNav">&times;</div>
    <router-link to="/" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        Home
      </div>
    </router-link>
    <router-link to="/about" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        About
      </div>
    </router-link>
    <router-link to="/projects" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        Projects
      </div>
    </router-link>
    <router-link to="/contact" class="sidenav__link">
      <div class="sidenav__link__wrapper" v-on:click="closeSideNav">
        Contact
      </div>
    </router-link>

  </div>
</template>

<script>
  export default {
    name: "SideNavigation",
    props: ['show'],
    methods: {
      closeSideNav() {
        this.$emit('sideNavClosed', false);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/components/SideNav";
</style>
