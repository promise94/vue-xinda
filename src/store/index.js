import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    //状态集合
    state:{
        username: '110',
    },
    mutations:{
        LOGINMUTA:(state ,name)=>state.username=name
    },
    //方法集合
    actions:{
        loginAction:({commit},name)=>{commit('LOGINMUTA',name)}
    },
    //显示集合
    getters:{
        getUsername:state=>state.username//function(state){return state.username}

    }
})