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
    async loginWithFacebook(context, params) {
        try {
            let response = await authService.loginWithFacebook(params)
            context.commit('updateIsAuthenticated', response)
            return response
        } catch(error) {
            return resolve(error.response)
        }
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

