import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue';
import user from '../view/user.vue';
import storeList from '../components/store/storeList.vue'
import storeIndex from '../components/store/storeIndex.vue'

import services from '../components/list/services.vue'
import sifco from '../components/list/sifco.vue'

import us from '../components/us/us.vue';
import cart from '../components/cart/cart.vue'



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
    {

      path: '/storeList',
      name: 'storeList',
      component: storeList
    },
    {
      path: '/',
      name: 'Main',
      component: main,
    },
    // 加盟我们{
    {
      path: '/us',
      name: 'us',
      component: us
    },
    // }
    // 购物车{
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    // }
    {
      path: '/user',
      name: 'User',
      component: user
    },
    {
      path: '/storeIndex',
      name: 'storeIndex',
      component: storeIndex
    }
  ]
})
