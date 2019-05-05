import router from '../../router'
import jwtDecode from 'jwt-decode'

const auth = {
  namespaced: true,
  state: {
    token: null,
    isAuthenticated: false,
    sessionExpired: false,
    display_name: '',
    email: '',
  },
  mutations: {
    updateIsAuthenticated(state, response) {
      if (response.status === 200) {
        router.push('/dashboard')
        state.isAuthenticated = true
        state.display_name = response.data.display_name
        state.email = response.data.email
        state.gender = response.data.gender
        state.sessionExpired = false
      } else {
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    },
    clearUserInfo (state) {
      state.display_name = ''
      state.email = ''
    },
    setAccessToken (state, token) {
      state.token = token
    },
    deleteAccessToken (state) {
      state.token = null
    },
    unAuthUser (state) {
      state.isAuthenticated = false
    },

  },
  actions: {
    setUserInfo(context, userInfo) {
        context.commit('updateIsAuthenticated', userInfo)
    },
    setAccessToken(context, token) {
      context.commit('setAccessToken', token)
    },
    logout(context) {
        context.commit('unAuthUser')
        context.commit('deleteAccessToken')
        context.commit('clearUserInfo')
        router.push('/')
    },
    loadUser(state) {
      let unixTimeStamp = new Date().getTime() / 1000
      let expiration = null
      let token = state.token
      if (token != null) {
        expiration = jwtDecode(token).exp
      } else {
        state.isAuthenticated = false
        state.sessionExpired = true
        this.commit('auth/clearUserInfo')
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
        state.isAuthenticated = true
        state.sessionExpired = false
      }
    }
  },
  getters: {
    isAuthenticated : state =>  {
      return state.isAuthenticated
    },
    sessionExpired: state => {
      return state.sessionExpired
    }
  }
};

export default auth

