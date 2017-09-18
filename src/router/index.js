import Vue from 'vue';
import Router from 'vue-router';

import main from '@/view/main.vue'; // 商品展示、会员中心展示页
import user from '@/view/user.vue'; // 登录、注册、忘记密码展示页

import search from '@/view/search/search.vue'; // 搜索结果页

import index from '@/view/index/index';

import services from '@/view/list/services.vue';
import sifco from '@/view/list/sifco.vue';
import us from '@/view/us/us.vue'; // 加盟我们
import storeList from '@/view/store/storeList.vue';
import storeIndex from '@/view/store/storeIndex.vue';

import cart from '@/view/cart/cart.vue'; // 购物车
import pay from '@/view/pay/pay.vue';// 支付首页

/**
 * 登录、注册、忘记密码
 */
import login from '@/view/user/login.vue';
import register from '@/view/user/register.vue';
import forget from '@/view/user/forget.vue';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'Main',
    component: main,
    children: [{
      path: '/index',
      name: 'index',
      alias: '/',
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
    {
      path: '/storeIndex',
      name: 'storeIndex',
      component: storeIndex
    },
    {
      path: '/us',
      name: 'us',
      component: us
    },
    {
      path: '/search/:keyword',
      name: 'search',
      component: search
    }, {
      path: '/cart',
      name: 'Cart',
      component: cart,
    }, {
      path: '/pay',
      name: 'Pay',
      component: pay
    }]
  },
  {
    path: '/user',
    name: 'User',
    component: user,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: login
      },
      {
        path: 'register',
        name: 'Register',
        component: register
      },
      {
        path: 'forget',
        name: 'Forget',
        component: forget
      }
    ]
  }
  ]
})
