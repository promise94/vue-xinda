import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import World from '@/components/World'
import Home from '../components/home.vue'
import List from '../components/list.vue'
import first from '../components/first.vue'
import second from '../components/second.vue'
import info from '../components/info.vue'
import register from '../components/register.vue'
import login from '../components/login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: Hello
    // },
  ]
})
