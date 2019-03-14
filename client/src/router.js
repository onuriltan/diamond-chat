import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const Chat = () => import('./views/ChatView.vue');
const Login = () => import('./views/LoginView.vue');
const NotFound = () => import('./views/NotFoundView.vue');

export default new Router({
  mode: 'history',
  routes: [
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
