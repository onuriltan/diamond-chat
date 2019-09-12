import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

// modules
import auth from './modules/auth.store';
import chat from './modules/chat.store';

Vue.use(Vuex);

const store = new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  modules: {
    auth,
    chat
  }
});

export default store;
