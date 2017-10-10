import Vue from 'vue';
import Router from 'vue-router';

import main from '@/view/main.vue'; // 商品展示、会员中心展示页
import user from '@/view/user.vue'; // 登录、注册、忘记密码展示页


import index from '../view/index/index'; // 首页

import goods from '../view/goods/goods'; // 商品详情页
import search from '@/view/search/search.vue'; // 搜索结果页
import services from '@/view/list/services.vue'; // 服务
import sifco from '@/view/list/sifco.vue'; // 公司工商
import us from '@/view/us/us.vue'; // 加盟我们
import storeList from '@/view/store/storeList.vue'; // 店铺列表
import storeIndex from '@/view/store/storeIndex.vue'; // 店铺首页


import member from '@/view/vip/member.vue'; // 会员中心
import order from '@/view/vip/order.vue'; // 我的订单
import setting from '@/view/vip/setting.vue'; // 用户设置
import evaluntion from '@/view/vip/evaluntion.vue'; // 用户评价
import grade from '../view/vip/orderGrade.vue'; // 评价订单


import cart from '@/view/cart/cart.vue'; // 购物车
import pay from '@/view/pay/pay.vue'; // 支付首页
import yinlian from '@/view/pay/yinlian.vue'; // 银联支付


/**
 * 登录、注册、忘记密码
 */
import login from '@/view/user/login.vue';
import register from '@/view/user/register.vue';
import forget from '@/view/user/forget.vue';

// import yinlian from '@/view/pay/yinlian.vue';

/**
 * M 版页面引入
 */
import mMain from '@/mobile/main.vue';  // 手机端展示页
import mIndex from '@/mobile/index.vue'; //手机首页
import mList from '@/mobile/list.vue';//手机端列表
import mGoods from '@/mobile/mGoods.vue'; //手机商品详情
import mStorelist from '@/mobile/storelist.vue';//手机端店铺列表
import mStoreindex from '@/mobile/storeindex.vue';//手机端店铺详情
import mCart from '@/mobile/cart.vue'; // 手机购物车
import mRegister from '@/mobile/register.vue'; // 手机注册
import mLogin from '@/mobile/login.vue'; //手机登录
import mForget from '@/mobile/forget.vue'; //手机忘记密码

import my from '@/mobile/my.vue'; // 我的中间页
import center from '@/mobile/center.vue';  // 手机我的
import morder from '@/mobile/m-order.vue'; // 我的订单
import msetting from '../mobile/m-setting.vue'; // 账户设置
import mproduct from '@/mobile/product.vue' //手机产品分类
Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'Main',
        component: main,
        children: [ // 首页
            { path: '/index', name: 'Index', alias: '/', component: index },
            // 商品详情页
            { path: '/goods', name: 'Goods', component: goods },
            { path: '/services', name: 'Services', component: services },
            { path: '/sifco', name: 'Sifco', component: sifco },
            { path: '/storeList', name: 'StoreList', component: storeList },
            { path: '/storeIndex', name: 'StoreIndex', component: storeIndex },
            { path: '/us', name: 'Us', component: us },
            { path: '/search/:keyword', name: 'Search', component: search },
            { path: '/cart', name: 'Cart', component: cart, meta: { requireAuth: true } },
            { path: '/pay', name: 'Pay', component: pay, meta: { requireAuth: true } },
            { path: '/yinlian', name: 'yinlian', component: yinlian, },
            {
                path: '/member',
                name: 'Member',
                alias: '/member/order',
                component: member,
                meta: {
                    requireAuth: true,
                },
                children: [
                    { path: 'order', name: 'Order', component: order, meta: { requireAuth: true } },
                    { path: 'evaluntion', name: 'Evaluntion', component: evaluntion, meta: { requireAuth: true } },
                    { path: 'setting', name: 'Setting', component: setting, meta: { requireAuth: true } },
                    { path: 'grade', name: 'Grade', component: grade, meta: { requireAuth: true } }
                ]
            }
        ]
    },
    {
        path: '/user',
        name: 'User',
        component: user,
        children: [
            { path: 'login', name: 'Login', component: login },
            { path: 'register', name: 'Register', component: register },
            { path: 'forget', name: 'Forget', component: forget }
        ]
    },
    {
        // 移动端路由
        path: '/m',
        name: 'Mobile',
        component: mMain,
        children: [
            // 手机端首页
            { path: 'index', name: 'Index', alias: '/m', component: mIndex },
            { path: 'cart', component: mCart, meta: { MobileRequireAuth: true } },
            {
                path: 'goods',
                name: 'goods',
                component: mGoods,
            },
            {
                path: 'list',
                name: 'list',
                component: mList,
            },
            {

                path: 'storelist',
                name: 'storelist',
                component: mStorelist,
            },
            {
                path: 'storeindex',
                name: 'storeindex',
                component: mStoreindex,
            },
            { //手机产品分类
                path: 'product',
                name: 'product',
                component: mproduct,
            },
            {
                path: 'center',
                name: 'Center',
                component: center,
                path: 'my',
                name: 'My',
                component: my,
                children: [
                    { path: 'center', name: 'Center', alias: '/m/my', component: center },
                    { path: 'order', name: 'Order', component: morder, meta: { MobileRequireAuth: true } },
                    { path: 'set', name: 'Set', component: msetting, meta: { MobileRequireAuth: true } },
                    { path: 'register', component: mRegister },
                    { path: 'login', component: mLogin },
                    { path: 'forget', component: mForget },
                ]
            }
        ]
    }
    ]
})