import router from '../../../router'
import {
  UPDATE_IS_AUTHENTICATED,
  SET_ACCESS_TOKEN,
  UN_AUTH_USER,
  DELETE_ACCESS_TOKEN,
  CLEAR_USER_INFO,
  SESSION_EXPIRED
} from './auth.types'
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
    [UPDATE_IS_AUTHENTICATED](state, response) {
      if (response.status === 200) {
        state.display_name = response.data.display_name;
        state.email = response.data.email;
        state.sessionExpired = false;
        state.isAuthenticated = true;
        router.push('/dashboard');
      } else {
        state.sessionExpired = true;
        state.isAuthenticated = false;
        setTimeout(() => {
          router.push('/')
        }, 2000)
      }
    },
    [CLEAR_USER_INFO] (state) {
      state.display_name = '';
      state.email = '';
      state.token = null;
      state.isAuthenticated = false;
      state.sessionExpired = false;
    },
    [SET_ACCESS_TOKEN] (state, token) {
      state.token = token;
    },
    [DELETE_ACCESS_TOKEN] (state) {
      state.token = null;
    },
    [UN_AUTH_USER] (state) {
      state.isAuthenticated = false;
    },
    [SESSION_EXPIRED](state, isExpired) {
      state.sessionExpired = isExpired;
    }
  },
  actions: {
    setUserInfo(context, userInfo) {
        context.commit(UPDATE_IS_AUTHENTICATED, userInfo);
    },
    setAccessToken(context, token) {
      context.commit(SET_ACCESS_TOKEN, token);
    },
    logout(context) {
        context.commit(UN_AUTH_USER);
        context.commit(DELETE_ACCESS_TOKEN);
        context.commit(CLEAR_USER_INFO);
        router.push('/');
    },
    setSessionExpired(context, isExpired) {
      context.commit(SESSION_EXPIRED, isExpired);
      setTimeout(() =>  {
        context.commit(CLEAR_USER_INFO);
        router.push('/')
      }, 1500)
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

