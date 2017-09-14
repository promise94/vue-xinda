import Vue from 'vue';
import Router from 'vue-router';
// import main from '../view/main.vue';
// import user from '../view/user.vue';
import storeList from '../components/store/storeList.vue'
import storeIndex from '../components/store/storeIndex.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/storeList',
      name: 'storeList',
      component: storeList

    },
    {
      path: '/storeIndex',
      name: 'storeIndex',
      component: storeIndex
    }
  ]
})
