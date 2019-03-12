<template>
  <div class="login">
    <div class="login__form">
      <h2 class="login__form__header">Login</h2>
      <button @click="loginWithFacebook()" class="login__form__fb-btn">
          Login with Facebook
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    loginWithFacebook() {

    },
  },
};
</script>

<style lang="scss">
  @import "../styles/components/Login";
</style>
