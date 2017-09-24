<template>
  <div id="member">
    <div class="memberLeft">
      <p>首页/公司工商</p>
      <div>
        <div class="xd xd-user"></div>
        <h2>{{getUser.info.name}}</h2>
      </div>
      <div>
        <div @click="goto('member')" :class="{e9: back == 'member'}">
          <a class="xd xd-dingdan" href="javascript:;"> 我的订单</a>
        </div>
        <div @click="goto('evaluntion')" :class="{e9: back == 'evaluntion'}">
          <a class="xd xd-pingjia" href="javascript:;"> 用户评价</a>
        </div>
        <div @click="goto('setting')" :class="{e9: back === 'setting'}">
          <a class="xd xd-shezhi" href="javascript:;"> 账户设置</a>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'member',
  data() {
    return {
      back: '',
    }
  },
  created(){
    this.back = this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1);
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    goto(m) {
      this.back = m;
      this.$router.push(m);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/member.less';
</style>