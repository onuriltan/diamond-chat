import authResource from '../../resources/auth.resource'
import cookieResource from '../../resources/cookie.resource'

import router from '../../router'
import jwtDecode from 'jwt-decode'

const auth = {
  namespaced: true,
  state: {
    isAuthenticated: false,
    sessionExpired: false,
    firstName: '',
    fullName: '',
    age: '',
    email: '',
    gender: ''
  },
  mutations: {
    updateIsAuthenticated(state, response) {
      if (response.status === 200) {
        router.push('/dashboard')
        state.isAuthenticated = true
        state.firstName = response.data.firstName
        state.fullName = response.data.fullName
        state.age = response.data.age
        state.email = response.data.email
        state.gender = response.data.gender
        state.sessionExpired = false
      } else {
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    },
    loadUser(state) {
      let unixTimeStamp = new Date().getTime() / 1000
      let expiration = null
      let token = cookieResource.getCookie(process.env.VUE_APP_JWT_COOKIE_NAME)
      if (token != null) {
        expiration = jwtDecode(token).exp
      } else {
        state.isAuthenticated = false
        state.sessionExpired = true
        this.clearUserInfo()
      }
      if (expiration != null && parseInt(expiration) - unixTimeStamp > 0) {
        state.isAuthenticated = true
        state.sessionExpired = false
      }
    },
    clearUserInfo (state) {
      state.firstName = ''
      state.fullName = ''
      state.age = ''
      state.email = ''
      state.gender = ''
    },
    deleteAccessToken () {
      cookieResource.removeCookie(process.env.VUE_APP_JWT_COOKIE_NAME)
    },
    unAuthUser (state) {
      state.isAuthenticated = false
    },

  },
  actions: {
    async loginWithFacebook(context, params) {
      try {
        let response = await authResource.loginWithFacebook(params)
        context.commit('updateIsAuthenticated', response)
        return response
      } catch (error) {
        return error.response
      }
    },
    async logout(context) {
        context.commit('unAuthUser')
        context.commit('deleteAccessToken')
        context.commit('clearUserInfo')
        router.push('/login')
    },
    loadUser(context) {
      context.commit('loadUser')
    },
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

