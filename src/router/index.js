import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue';
import user from '../view/user.vue';
import services from '../components/list/services.vue'
import sifco from '../components/list/sifco.vue'


Vue.use(Router);

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Main',
    //   omponent: main
    // },
    {
      path: '/services',
      name: 'services',
      component: services
    },
    {
      path: '/sifco',
      name: 'sifco',
      component: sifco
    },
  ]
})
