import Vue from 'vue';
import Vuex from 'vuex';

// modules
import AuthStore from './modules/AuthStore';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    AuthStore
  }
});
