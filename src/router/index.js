import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue';
import user from '../view/user.vue';
import storeList from '../view/store/storeList.vue'
import storeIndex from '../view/store/storeIndex.vue'

import services from '../view/list/services.vue'
import sifco from '../view/list/sifco.vue'

import us from '../view/us/us.vue';
import cart from '../view/cart/cart.vue'

import index from '../view/index/index'

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: main,
    children: [{
        path: '/index',
        name: 'index',
        component: index,
      },
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
      // 加盟我们{
      {
        path: '/us',
        name: 'us',
        component: us
      },
      // 购物车
      {
        path: '/cart',
        name: 'cart',
        component: cart
      },
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
  }]
})
