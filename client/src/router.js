import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/HomeView.vue';

Vue.use(Router);

const Chat = () => import('./views/ChatView.vue')
const Login = () => import('./views/LoginView.vue')

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', name: 'home', component: Home,
    },
    {
      path: '/login', name: 'login', component: Login,
    },
    {
      path: '/chat', name: 'chat', component: Chat
    },
  ],
});
