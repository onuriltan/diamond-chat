<template>
  <div>
    <Header />
    <router-view/>
  </div>
</template>

<script>
  import Header from '../src/components/Header'
  export default {
    name: 'App',
    components : {
      Header
    }
  }
</script>
<style lang="scss">
  @import './styles/global.scss';
</style>
