import Vue from 'vue';
import Vuex from 'vuex';

// modules
import auth from './modules/auth.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  }
});
