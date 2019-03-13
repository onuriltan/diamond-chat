import authService from '../../services/auth.service'
import router from '../../router'

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
  },
  actions: {
    loginWithFacebook(context, params) {
      return new Promise(resolve => {
        authService.loginWithFacebook(params)
          .then((response) => {
            context.commit('updateIsAuthenticated', response)
            return resolve(response)
          })
          .catch((response) => {
            return resolve(response)
          })
      })
    }
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

