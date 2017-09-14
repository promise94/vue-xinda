import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue';
import user from '../view/user.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: main
    },
    {
      path: '/user',
      name: 'User',
      component: user
    },
  ]
})
