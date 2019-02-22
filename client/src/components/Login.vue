<template>
  <div class="login">
    <b-form class="login__form">
      <h2 class="login__form__header">Login</h2>
      <b-form-group id="email"
                    label="Email"
                    label-for="email">
        <b-form-input id="email"
                      type="email"
                      class="login-form__input"
                      size="lg">
        </b-form-input>
      </b-form-group>
      <b-form-group id="password"
                    label="Password"
                    label-for="password">
        <b-form-input id="password"
                      type="password"
                      class="login-form__input"
                      size="lg">
        </b-form-input>
      </b-form-group>
      <div style="font-weight: bold; margin: 30px 0; text-align: center">
        <router-link to="/register">Dont have an account? Register from here!</router-link>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="scss">
  @import '../styles/global.scss';
  @import "../styles/components/Login";
</style>
