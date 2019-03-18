import Vue from 'vue';
import Router from 'vue-router';
import store from '../src/store/index';

Vue.use(Router);

async function requireAuth(to, from, next) {
  function proceed() {
    if (store.getters["auth/isAuthenticated"]) {
      next();
    } else {
      next(from.path)
    }
  }
  await store.dispatch('auth/loadUser')
  proceed()
}

/*async function alreadyLoggedIn (to, from, next) {
  function proceed () {
    if (store.getters["auth/isAuthenticated"]) {
      next('/dashboard')
    } else {
      next('/login')
    }
  }
  await store.dispatch('auth/loadUser')
  proceed()
}*/

const Home = () => import('./views/HomeView.vue');
const Dashboard = () => import('./views/DashboardView.vue');
const Chat = () => import('./views/ChatView.vue');
const Login = () => import('./views/LoginView.vue');
const NotFound = () => import('./views/NotFoundView.vue');

export default new Router({
  mode: 'history',
  linkActiveClass: 'active-page',
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
