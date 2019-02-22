<template>
  <div class="navbar-container">
    <nav class="navbar navbar-container__navbar">
      <router-link to="/" class="navbar-brand navbar-container__navbar__brand">
        <img src="../assets/diamondwhite.svg" width="50" height="50" class="navbar-container__navbar__brand__img" alt="diamond">
        DIAMOND CHAT
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped lang="scss">
@import "../styles/components/Header";
</style>
