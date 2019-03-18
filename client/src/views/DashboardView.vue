<template>


</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('auth')
  export default {
    name: 'DashboardView',
    computed: {
      ...mapState(['isAuthenticated'])  // assuming you are using namespaced modules
    },
  };
</script>
