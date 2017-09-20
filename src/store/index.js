import Vue from 'vue';
import Vuex from 'vuex';
<<<<<<< HEAD
Vue.use(Vue);

export default new Vue.Store({
    //状态集合
    state:{
        username:'lsz'
    },
    //突变集合
    mutations:{
        LOGINMUTA:(state,name)=>state.username = name 
    },
    //方法集合
    actions:{
        loginActions:({commit},name)=>commit('LOGINMUTA',name)
    },
    //显示集合
    getters:{
        getUsername:state=>state.username //function(state){reyurn state.username}
    }
})
=======
Vue.use(Vuex);

export default new Vuex.Store({
    // 状态集合
    state: {
        user: { name: '', status: false },
        cartnum: 0,
    },
    mutations: { // 突变集合
        SETUSER: (state, user) => state.user = user,
        SETCART: (state, num) => state.cartnum = num,
    },
    actions: { // 方法集合
        loginAction: ({commit}, user) => commit('SETUSER', user),
    },
    getters: { // 显示集合
        getUser: state => state.user,
        getCartNum: state => state.cartnum,
    }
});
>>>>>>> ebd7d6f13d4189c9b19fe5f65024e4a8db2b26a0
