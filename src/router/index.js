import Vue from 'vue';
import Router from 'vue-router';

import main from '@/view/main.vue'; // 商品展示、会员中心展示页
import user from '@/view/user.vue'; // 登录、注册、忘记密码展示页

// 首页
import index from '../view/index/index'
// 商品详情页
import goods from '../view/goods/goods'
import search from '@/view/search/search.vue'; // 搜索结果页

import index from '@/view/index/index';

import services from '@/view/list/services.vue';//纳税服务
import sifco from '@/view/list/sifco.vue';//公司工商
import us from '@/view/us/us.vue';
import storeList from '@/view/store/storeList.vue';
import storeIndex from '@/view/store/storeIndex.vue';
import services from '@/view/list/services.vue';
import sifco from '@/view/list/sifco.vue';
import us from '@/view/us/us.vue'; // 加盟我们
import storeList from '@/view/store/storeList.vue';//店铺列表
import storeIndex from '@/view/store/storeIndex.vue';//店铺首页


import member from '@/view/vip/member.vue';//会员中心
import order from '@/view/vip/order.vue';
import setting from '@/view/vip/setting.vue';
import evaluntion from '@/view/vip/evaluntion.vue';


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
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [{
<<<<<<< HEAD
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
=======
    path: '/',
    name: 'Main',
    component: main,
    children: [ // 首页
      {
        path: '/index',
        name: 'index',
        alias: '/',
        component: index,
      },
      // 商品详情页
      {
        path: '/goods',
        name: 'goods',
>>>>>>> 8dac4bc0abe53851d69cbff6c318fc0ea9e97b33

        component: goods,
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
      }, 
      {
        path: '/cart',
        name: 'Cart',
        component: cart,
      }, 
      {
        path: '/pay',
        name: 'Pay',
        component: pay
      },
      {
        path: '/member',
        name: 'member',
        component: member,
        children: [{
            path: 'order',
            name: 'order',
            alias: '/member',
            component: order
          },
          {
            path: 'evaluntion',
            name: 'evaluntion',
            component: evaluntion
          },
          {
            path: 'setting',
            name: 'setting',
            component: setting
          }
        ]
      }
    ]
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
  }]
})
