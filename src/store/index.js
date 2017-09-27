import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    // 状态集合
    state: {
        user: { info: '', status: false },
        cartnum: 0,
        toLoginPath: '',
        Info: '',
    },
    mutations: { // 突变集合
        SETUSER: (state, user) => state.user = user, // 设置用户信息
        SETCART: (state, num) => state.cartnum = num, // 用户车数量
        SETINFO: (state, info) => state.Info = info, // 个人信息
    },
    actions: { // 方法集合
        loginAction: ({commit}, user) => commit('SETUSER', user),
        cartAction: ({commit}, num) => commit('SETCART', num),
    },
    getters: { // 显示集合
        getUser: state => state.user,
        getCartNum: state => state.cartnum,
        getInfo: state => state.userInfo,
    }
});
