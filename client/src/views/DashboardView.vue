<template>
  <div class="dashboard">
    <TopTracks/>
  </div>
</template>


<script>
  import TopTracks from '../components/topTracks/TopTracks'
  export default {
    name: 'DashboardView',
    components: {
      TopTracks
    }
  };
</script>


<style scoped lang="scss">
  .dashboard {
    width: 100%;
    height: 100%;
  }
</style>
