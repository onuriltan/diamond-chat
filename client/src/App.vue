<template>
  <div id="app" :class="{ applyBackgroundImg }">
    <div id="content">
      <Header />
      <router-view/>
    </div>
    <Particles />
    <CustomAlert alert-message="Your session is expired" v-if="sessionExpired"/>
  </div>
</template>

<script>
import Header from './components/Header';
import Particles from './components/Particles';
import CustomAlert from "./components/customAlert/CustomAlert";
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    CustomAlert,
    Particles,
    Header,
  },
  data() {
      return {
          applyBackgroundImg : false
      }
  },
  computed: {
    ...mapState('auth', {
        sessionExpired: state => state.sessionExpired,
      }),
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
