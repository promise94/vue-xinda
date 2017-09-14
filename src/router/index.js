import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue';
import user from '../view/user.vue';

import index from '../components/index/index'
Vue.use(Router);

export default new Router({
  routes: [

    {
      path:'/index',
      name:'index',
      component: index,
    },
    {
      path: '/',
      name: 'Main',
      component: main
    },
  ]
})
