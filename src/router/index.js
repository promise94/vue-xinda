import Vue from 'vue';
import Router from 'vue-router';

import main from '@/view/main.vue'; // 商品展示、会员中心展示页
import user from '@/view/user.vue'; // 登录、注册、忘记密码展示页

// 首页
import index from '../view/index/index'
// 商品详情页
import goods from '../view/goods/goods'
import search from '@/view/search/search.vue'; // 搜索结果页
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
  routes: [{
    path: '/',
    name: 'Main',
    component: main,
    children: [ // 首页
      {
        path: '/index',
        name: 'Index',
        alias: '/',
        component: index,
      },
      // 商品详情页
      {
        path: '/goods',
        name: 'Goods',
        component: goods,
      },
      {
        path: '/services',
        name: 'Services',
        component: services
      },
      {
        path: '/sifco',
        name: 'Sifco',
        component: sifco
      },
      {
        path: '/storeList',
        name: 'StoreList',
        component: storeList
      },
      {
        path: '/storeIndex',
        name: 'StoreIndex',
        component: storeIndex
      },
      {
        path: '/us',
        name: 'Us',
        component: us
      },
      {
        path: '/search/:keyword',
        name: 'Search',
        component: search
      }, 
      {
        path: '/cart',
        name: 'Cart',
        component: cart,
        meta: {
          requireAuth: true
        }
      }, 
      {
        path: '/pay',
        name: 'Pay',
        component: pay,
        meta: {
          requireAuth: true
        }
      },
      {
        path: '/member',
        name: 'Member',
        alias: '/member/order',
        component: member,
        meta: {
          requireAuth: true
        },
        children: [{
            path: 'order',
            name: 'Order',
            component: order,
            meta: {
              requireAuth: true
            }
          },
          {
            path: 'evaluntion',
            name: 'Evaluntion',
            component: evaluntion,
            meta: {
              requireAuth: true
            }
          },
          {
            path: 'setting',
            name: 'Setting',
            component: setting,
            meta: {
              requireAuth: true
            }
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
