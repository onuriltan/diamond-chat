import Vue from 'vue';
import Router from 'vue-router';
import store from '../src/store/index';

Vue.use(Router);

async function requireAuth(to, from, next) {
  function proceed() {
    if (store.getters["AuthStore/isAuthenticated"]) {
      next();
    } else {
      next('/login');
    }
  }
  await store.dispatch('AuthStore/loadUser')
  proceed()
}

async function alreadyLoggedIn (to, from, next) {
  function proceed () {
    if (store.getters["AuthStore/isAuthenticated"]) {
      next('/')
    } else {
      next('/dashboard')
    }
  }
  await store.dispatch('AuthStore/loadUser')
  proceed()
}

const Home = () => import('./views/HomeView.vue');
const Dashboard = () => import('./views/DashboardView.vue');
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
      path: '/login', name: 'login', component: Login
    },
    {
      path: '/dashboard', name: 'dashboard', component: Dashboard, beforeEnter: requireAuth
    },
    {
      path: '/chat', name: 'chat', component: Chat, beforeEnter: requireAuth
    },
    {
      path: '*', name: 'notfound', component: NotFound,
    },
  ],
});
