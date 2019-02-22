<template>
  <div id="app">
    <Header />
    <router-view/>
    <Particles />
  </div>
</template>

<script>
import Header from './components/Header';
import Particles from './components/Particles'
export default {
  name: 'App',
  components: {
    Particles,
    Header,
  }
};
</script>
<style lang="scss">
  @import './styles/global.scss';
</style>
