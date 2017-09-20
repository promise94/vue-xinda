import Vue from 'vue';
import Vuex from 'vuex';
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