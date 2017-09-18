import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue'; // 商品展示、会员中心展示页
import user from '../view/user.vue'; // 登录、注册、忘记密码展示页
import storeList from '../view/store/storeList.vue'
import storeIndex from '../view/store/storeIndex.vue'

import services from '../view/list/services.vue'
import sifco from '../view/list/sifco.vue'

import us from '../view/us/us.vue';
import cart from '../view/cart/cart.vue'
// 首页
import index from '../view/index/index'
// 商品详情页
import goods from '../view/goods/goods'

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'Main',
      component: main,
      children: [
        // 首页
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
        // 加盟我们{
        {
          path: '/us',
          name: 'us',
          component: us
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      component: user
    }
  ]
})
