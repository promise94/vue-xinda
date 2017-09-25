<template>
  <div id="member">
    <div class="memberLeft">
      <p>首页/公司工商</p>
      <div>
        <div class="xd xd-user"></div>
        <h2>{{userInfo.name}}</h2>
      </div>
      <div>
        <div @click="goto('order')" :class="{e9: back == 'order'}">
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
    <router-view @getInfo="upInfo"></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'order',
  data() {
    return {
      back: '',
      userInfo: '', // 用户信息
    }
  },
  created() {
    this.getUserInfo();
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
    upInfo(val){
      console.log(val);
      this.userInfo = val;
    },
    getUserInfo() { // 获取个人信息
      this.$http.post('/member/info').then((res) => {
        if (res.status === 1) {
          this.userInfo = res.data;
          this.$store.commit('SETINFO', res.data);
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/member.less';
</style>