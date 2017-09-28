<template>
  <div>
    <xd-header :head="head"></xd-header>
    <div id="content">
      <div class="container content">
        <transition :name="transitionName">
          <router-view class="child-view"></router-view>
        </transition>
        <div class="title">
          <p>{{title}}&nbsp;?</p>
          <div>
            <a @click="goPage" href="javascript:void(0);">
              {{linkname}}
              <i class="xd xd-right"></i>
            </a>
            <img src="../common/images/login.png">
          </div>
        </div>
      </div>
    </div>
    <xd-footer></xd-footer>
  </div>
</template>

<script>

import xdHeader from '@/components/global/header/userHeader';
import xdFooter from '@/components/global/footer/copyRight';
export default {
  name: 'main',
  components: {
    xdHeader,
    xdFooter
  },
  data() {
    return {
      info: {
        register: { head: '欢迎注册', link: 'login', linkname: '立即登录', title: '已有账号' },
        login: { head: '欢迎登录', link: 'register', linkname: '立即注册', title: '还没有账号' },
        forget: { head: '忘记密码', link: 'login', linkname: '返回登录', title: '想起密码来了' },
      },
      head: '',
      link: '',
      title: '',
      linkname: '',
      transitionName: '', // 过渡效果名称
    }
  },
  created() {
    this.setShow();
  },
  watch: {
    '$route'(to, from) {
      this.setShow();
      const toDepth = to.path.length;
      const fromDepth = from.path.length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  methods: {
    setShow() {
      let path = this.$route.path;
      let name = path.substr(path.lastIndexOf('/') + 1);
      this.head = this.info[name].head;
      this.linkname = this.info[name].linkname;
      this.title = this.info[name].title;
      this.link = this.info[name].link;
    },
    goPage() {
      this.$router.push(this.link);
    }
  }
};
</script>

<style lang="less">
@import '../common/less/user/user.less';
#content {
  >.content {
    position: relative;
    min-height: 550px;
    .child-view {
      position: absolute;
      left: 160px;
      top: 80px;
      transition: all .25s cubic-bezier(.55, 0, .1, 1);
    }
  }
}


.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(60px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-60px, 0);
}
</style>