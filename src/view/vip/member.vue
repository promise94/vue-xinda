<template>
  <div id="member">
    <div class="memberLeft">
      <p>首页/公司工商</p>
      <div>
        <div class="xd xd-user"></div>
        <h2>{{getUser.info.name}}</h2>
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
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'order',
  data() {
    return {
      back: '',
    }
  },
  created() {
    this.getUserInfo();
    this.back = this.$route.path.substr(this.$route.path.lastIndexOf('/') + 1);
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  watch: {

  },
  methods: {
    ...mapActions(['infoAction']),
    goto(m) {
      this.back = m;
      this.$router.push(m);
    },
    getUserInfo() { // 获取个人信息
      this.$http.post('/member/info').then((res) => {
        if (res.status === 1 && res.data) {
          res.data.password ? (delete res.data.password) : '';
          let info = this.getUser.info;
          Object.assign(info, res.data);
          this.infoAction(info);
        }
      })
    },
  },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/member.less';

.fade-enter-active,
.fade-leave-active {
  transition: .25s linear;
}

.fade-enter-to {
  transform: translateY(0);
}

.fade-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>