import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
export default new Vuex.Store({
    // strict: true,
    // 状态集合
    state: {
        user: { info: '', status: false },
        cartnum: 0,
        balls: 0,
    },
    mutations: { // 突变集合
        SETUSER: (state, user) => state.user = user, // 设置用户信息
        SETCART: (state, num) => {
            return state.cartnum = num;
        }, // 用户车数量
        SETINFO: (state, info) => state.user.info = info, // 个人信息
        SETBALL: (state, num) => state.balls = num,
    },
    actions: { // 方法集合
        loginAction: ({ commit }, user) => commit('SETUSER', user),
        infoAction: ({ commit }, info) => commit('SETINFO', info),
        cartAction: ({ commit, state }, num) => {
            if (!num && state.user.status) {
                axios.post('/cart/cart-num').then((res) => {
                    let n = res.data.cartNum;
                    this.a.commit('SETCART', n);
                });
            }
            if (num) {
                commit('SETCART', num);
            }
        },
        ballAction: ({ commit }, num) => commit('SETBAll', num),
    },
    getters: { // 显示集合
        getUser: state => {
            axios.post('/sso/login-info').then((res) => {
                if (res.status === 1) {
                    let user = {
                        status: true,
                        info: res.data,
                    }
                    let data = state.user;
                    Object.assign(data, user);
                    this.a.commit('SETUSER', data);
                }
            });
            return state.user;
        },
        getCartNum: state => {
            if (state.user.status) {
                axios.post('/cart/cart-num').then((res) => {
                    let n = res.data.cartNum;
                    this.a.commit('SETCART', n);
                });
            }
            return state.cartnum;
        },
        getBall: state => state.balls,
    }
});
