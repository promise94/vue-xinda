// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import store from './store';
import Qs from 'qs';


Vue.config.productionTip = false;
/* axios 全局配置 */
axios.defaults.baseURL = '/xinda-api';
axios.defaults.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
axios.interceptors.request.use((config) => {
  // console.log('config',config);
  config.method == 'post' ? config.data = Qs.stringify(config.data) : '';
  return config;
});
var resInterceptors = axios.interceptors.response.use((result) => {
  return result.data;
});
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  },
  data: {
    eventHub: new Vue(),
  },
  created() {
    let hash = window.location.hash;
    this.$router.beforeEach((to, from, next) => {
      // window.scrollY = 0;
      if (to.meta.requireAuth) {
        if (this.$store.state.user.status) {
          next();
        } else {
          next({ path: '/user/login', query: { redirect: to.fullPath } });
        }
      } else {
        next();
      }
    });
  }
})

