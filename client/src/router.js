import Vue from 'vue';
import Router from 'vue-router';
import authStore from '../src/store/modules/AuthStore';

Vue.use(Router);

async function requireAuth(to, from, next) {
  function proceed() {
    if (authStore.getters.isAuthenticated()) {
      next();
    } else {
      next('/login');
    }
  }
  await authStore.dispatch('loadUser');
  proceed()
}

const Home = () => import('./views/HomeView.vue');
const Chat = () => import('./views/ChatView.vue');
const Login = () => import('./views/LoginView.vue');
const NotFound = () => import('./views/NotFoundView.vue');

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', name: 'home', component: Home,
    },
    {
      path: '/login', name: 'login', component: Login,
    },
    {
      path: '/chat', name: 'chat', component: Chat,
    },
    {
      path: '*', name: 'notfound', component: NotFound,
    },
  ],
});
