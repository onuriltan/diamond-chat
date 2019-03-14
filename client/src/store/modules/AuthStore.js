import authService from '../../services/auth.service'
import router from '../../router'
import jwtDecode from 'jwt-decode'

const AuthStore = {
  namespaced: true,
  state: {
    isAuthenticated: false,
    sessionExpired: false
  },
  mutations: {
    updateIsAuthenticated (state, response) {
      if (response.status === 200) {
        window.localStorage.setItem('token', response.data.token)
        state.isAuthenticated = true
        state.sessionExpired = false
        router.push('/dashboard')
      } else {
        setTimeout(() => { router.push('/login') }, 2000)
      }
    },
    loadUser (state) {
      let token = window.localStorage.getItem('token')
      let unixTimeStamp = new Date().getTime() / 1000
      let expiration = null
      if (token != null) {
        expiration = jwtDecode(token).exp
      }else {
        state.isAuthenticated = false
        state.sessionExpired = true
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
        state.isAuthenticated = true
        state.sessionExpired = false
      }
    }
  },
  actions: {
    async loginWithFacebook(context, params) {
        try {
            let response = await authService.loginWithFacebook(params)
            context.commit('updateIsAuthenticated', response)
            return response
        } catch(error) {
            return error.response
        }
    },
    loadUser (context) {
      context.commit('loadUser')
    },
  },
  getters: {
    isAuthenticated () {
      return this.state.AuthStore.isAuthenticated
    },
    sessionExpired () {
      return this.state.AuthStore.sessionExpired
    }
  }
};

export default AuthStore

