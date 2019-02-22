<template>
  <div id="app">
    <div id="content">
      <Header />
      <router-view/>
    </div>
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
