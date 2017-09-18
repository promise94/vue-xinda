// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';
import Qs from 'qs';

Vue.config.productionTip = false;
/* axios 全局配置 */
axios.defaults.baseURL = 'http://115.182.107.203:8088/xinda/xinda-api';
axios.defaults.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
axios.interceptors.request.use((config) => {
  // console.log(config);
  config.method == 'post' ? config.data = Qs.stringify(config.data) : '';
  return config;
});
var resInterceptors = axios.interceptors.response.use((result)=>{
  return result.data;
});
Vue.prototype.$http = axios;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})

