import Vue from 'vue';
import Router from 'vue-router';

// 商品展示、会员中心展示页
const main = resolve => require.ensure([], () => resolve(require('@/view/main.vue')), 'pc');
// 登录、注册、忘记密码展示页
const user = resolve => require.ensure([], () => resolve(require('@/view/user.vue')), 'pc');
// 首页
const index = resolve => require.ensure([], () => resolve(require('@/view/index/index')), 'pc');
// 商品详情页
const goods = resolve => require.ensure([], () => resolve(require('@/view/goods/goods')), 'pc');
// 搜索结果页
const search = resolve => require.ensure([], () => resolve(require('@/view/search/search.vue')), 'pc');
// 服务
const services = resolve => require.ensure([], () => resolve(require('@/view/list/services.vue')), 'pc');
// 公司工商
const sifco = resolve => require.ensure([], () => resolve(require('@/view/list/sifco.vue')), 'pc');
// 加盟我们
const us = resolve => require.ensure([], () => resolve(require('@/view/us/us.vue')), 'pc');
// 店铺列表
const storeList = resolve => require.ensure([], () => resolve(require('@/view/store/storeList.vue')), 'pc');
// 店铺首页
const storeIndex = resolve => require.ensure([], () => resolve(require('@/view/store/storeIndex.vue')), 'pc');
// 会员中心
const member = resolve => require.ensure([], () => resolve(require('@/view/vip/member.vue')), 'pc');
// 我的订单
const order = resolve => require.ensure([], () => resolve(require('@/view/vip/order.vue')), 'pc');
// 用户设置
const setting = resolve => require.ensure([], () => resolve(require('@/view/vip/setting.vue')), 'pc');
// 用户评价
const evaluntion = resolve => require.ensure([], () => resolve(require('@/view/vip/evaluntion.vue')), 'pc');
// 评价订单
const grade = resolve => require.ensure([], () => resolve(require('@/view/vip/orderGrade.vue')), 'pc');
// 购物车
const cart = resolve => require.ensure([], () => resolve(require('@/view/cart/cart.vue')), 'pc');
// 支付首页
const pay = resolve => require.ensure([], () => resolve(require('@/view/pay/pay.vue')), 'pc');
// 银联支付
const yinlian = resolve => require.ensure([], () => resolve(require('@/view/pay/yinlian.vue')), 'pc');


/**
 * 登录、注册、忘记密码
 */
const login = resolve => require.ensure([], () => resolve(require('@/view/user/login.vue')), 'pc');

const register = resolve => require.ensure([], () => resolve(require('@/view/user/register.vue')), 'pc');

const forget = resolve => require.ensure([], () => resolve(require('@/view/user/forget.vue')), 'pc');

/**
 * M 版页面引入
 */
// 手机端展示页
const mMain = resolve => require.ensure([], () => resolve(require('@/mobile/main.vue')), 'mobile'); //手机端展示页

//手机首页
const mIndex = resolve => require.ensure([], () => resolve(require('@/mobile/index.vue')), 'mobile'); //手机首页

//手机商品详情
const mGoods = resolve => require.ensure([], () => resolve(require('@/mobile/mGoods.vue')), 'mobile'); //手机商品详情

//手机端店铺列表
const mStorelist = resolve => require.ensure([], () => resolve(require('@/mobile/storelist.vue')), 'mobile');//手机端店铺列表

//手机端店铺详情
const mStoreindex = resolve => require.ensure([], () => resolve(require('@/mobile/storeindex.vue')), 'mobile');//手机端店铺详情

// 手机购物车
const mCart = resolve => require.ensure([], () => resolve(require('@/mobile/cart.vue')), 'mobile'); // 手机购物车

// 手机注册
const mRegister = resolve => require.ensure([], () => resolve(require('@/mobile/register.vue')), 'mobile'); // 手机注册

//手机登录
const mLogin = resolve => require.ensure([], () => resolve(require('@/mobile/login.vue')), 'mobile'); //手机登录

//手机忘记密码
const mForget = resolve => require.ensure([], () => resolve(require('@/mobile/forget.vue')), 'mobile'); //手机忘记密码

//手机端列表
const mList = resolve => require.ensure([], () => resolve(require('@/mobile/list.vue')), 'mobile');

// 我的中间页
const my = resolve => require.ensure([], () => resolve(require('@/mobile/my.vue')), 'mobile');

// 手机我的
const center = resolve => require.ensure([], () => resolve(require('@/mobile/center.vue')), 'mobile');

// 我的订单
const morder = resolve => require.ensure([], () => resolve(require('@/mobile/m-order.vue')), 'mobile');

// 账户设置
const msetting = resolve => require.ensure([], () => resolve(require('@/mobile/m-setting.vue')), 'mobile');

//手机产品分类
const mproduct = resolve => require.ensure([], () => resolve(require('@/mobile/product.vue')), 'mobile');


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
            { path: 'goods', name: 'goods', component: mGoods },
            { path: 'list', name: 'list', component: mList },
            { path: 'storelist', name: 'storelist', component: mStorelist },
            { path: 'storeindex', name: 'storeindex', component: mStoreindex },
            //手机产品分类
            { path: 'product', name: 'product', component: mproduct },
            {
                path: 'my', name: 'My', component: my,
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