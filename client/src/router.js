import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Chat = () => import('./views/ChatView.vue');
const Login = () => import('./views/LoginView.vue');

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login', name: 'login', component: Login,
    },
    {
      path: '/chat', name: 'chat', component: Chat,
    },
  ],
});
