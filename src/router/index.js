import Vue from 'vue';
import Router from 'vue-router';
import main from '../view/main.vue';
import user from '../view/user.vue';
import us from '../components/us/us.vue';
import cart from '../components/cart/cart.vue'


Vue.use(Router);

export default new Router({
  routes: [
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
  ]
})
