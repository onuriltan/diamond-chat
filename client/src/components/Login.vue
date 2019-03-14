<template>
  <div class="login">
    <div class="login__form">
      <h2 class="login__form__header">Login</h2>
      <button @click="login()" class="login__form__fb-btn">
        Login with Facebook
      </button>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState, mapActions} = createNamespacedHelpers('AuthStore')

  export default {
    name: 'FacebookLogin',
    data() {
      return {
        fbLoginClicked: false
      }
    },
    mounted() {
      let appId = process.env.VUE_APP_FACEBOOK_APP_ID
      window.fbAsyncInit = function () {
        FB.init({
          appId: appId,
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v3.2'
        })
      };
      (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    methods: {
      ...mapActions([
        'loginWithFacebook'
      ]),
      login() {
        this.fbLoginClicked = true
        FB.login(function (response) {
          if (response.authResponse) {
            let {grantedScopes} = response.authResponse;
            grantedScopes = grantedScopes.replace(/user_/g, '')
            grantedScopes = grantedScopes.replace(/public_profile/g, '')
            grantedScopes = grantedScopes.slice(0, -1)
            const {userID, accessToken} = response.authResponse;
            this.loginWithFacebook({userID, grantedScopes, accessToken})
          } else {
            console.log('User cancelled login or did not fully authorize.')
          }
          this.fbLoginClicked = false
        }.bind(this), {
          scope: 'public_profile, email, user_gender, user_age_range, user_birthday, user_photos',
          return_scopes: true
        })
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/components/Login";
</style>
