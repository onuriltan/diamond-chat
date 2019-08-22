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
      '$route' (to) {
          to.name !== 'dashboard' ? this.applyBackgroundImg = true : this.applyBackgroundImg = false
      }
  }
};
</script>

<style scoped lang="scss">
  @import "./styles/components/App";
</style>
