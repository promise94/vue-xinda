import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    // 状态集合
    state: {
        user: { name: '', status: false },
    },
    mutations: { // 突变集合
        // LOGINMUTA: (state, name) => state.username = name
        SETUSER: (state, user) => state.user = user,
    },
    actions: { // 方法集合
        // loginAction: ({ commit }, name) => commit('LOGINMUTA', name)
        loginAction: ({commit}, user) => commit('SETUSER', user),
    },
    getters: { // 显示集合
        getUser: state => state.user
    }
});