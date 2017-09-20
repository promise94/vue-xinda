import Vue from 'vue';
import Router from 'vue-router';
import main from '@/view/main.vue'; // 商品展示、会员中心展示页
import user from '@/view/user.vue'; // 登录、注册、忘记密码展示页

import search from '@/view/search/search.vue'; // 搜索结果页

import index from '@/view/index/index';

import services from '@/view/list/services.vue';
import sifco from '@/view/list/sifco.vue';
import us from '@/view/us/us.vue';
import storeList from '@/view/store/storeList.vue';
import storeIndex from '@/view/store/storeIndex.vue';

import member from '@/view/vip/member.vue';
import order from '@/view/vip/order.vue';
import setting from '@/view/vip/setting.vue';
import evaluntion from '@/view/vip/evaluntion.vue';

import cart from '@/view/cart/cart.vue';

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
        // 加盟我们{
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
          path: '/member',
          name: 'member',
          component: member,
          children: [{
              path: '/order',
              name: 'order',
              component: order
            },
            {
              path: '/evaluntion',
              name: 'evaluntion',
              component: evaluntion
            },
            {
              path: '/setting',
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
    }
  ]
})
