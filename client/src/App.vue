<template>
  <div id="app" :class="{ applyBackgroundImg }">
    <div id="content">
      <Header />
      <router-view/>
    </div>
    <Particles />
  </div>
</template>

<script>
import Header from './components/Header';
import Particles from './components/Particles';

export default {
  name: 'App',
  components: {
    Particles,
    Header,
  },
  data() {
      return {
          applyBackgroundImg : false
      }
  },
  watch: {
      '$route' (to, from) {
          to.name !== 'dashboard' ? this.applyBackgroundImg = true : this.applyBackgroundImg = false
      }
  }
};
</script>

<style lang="scss">
  .active-page {
    color: white !important;
    background-color: black;
  }
  .applyBackgroundImg {
    background: url('~@/assets/ds1.jpg') no-repeat fixed center black;
  }

  #app {
    min-height: 100vh;
    background-size: contain;
  }
  #content {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
    font-family: 'Capriola', sans-serif;
  }
</style>
