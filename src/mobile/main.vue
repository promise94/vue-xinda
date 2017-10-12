<template>
  <div id="m_main">
    <transition :name="transitionName" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <ul class="tab" >
      <li @click="goto('/m')" :class="{active:selected == '/m'}">
        <span slot="icon" class="icon xd xd-shouye"></span>
        首页
      </li>
      <li @click="goto('/m/storelist')" :class="{active:selected == '/m/storelist'}">
        <span slot="icon" class="fontweight xd xd-dianpu"></span>
        店铺
      </li>
      <li @click="goto('/m/cart')" :class="{active:selected == '/m/cart'}">
        <span slot="icon" class="icon xd xd-cart"></span>
        购物车
      </li>
      <li @click="goto('/m/my')" :class="{active:selected == '/m/my'}">
        <span slot="icon" class="fontweight xd xd-user"></span>
        我的
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'm_main',
  data() {
    return {
      menuShow: true, // 是否显示菜单
      transitionName: '',
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.meta.MobileRequireAuth) {
        if (!vm.$store.state.user.status) {
          vm.$router.push({ path: '/m/my/login', query: { redirect: to.fullPath } });
        }
      }
      
    });
  },
  created() {
    if (/Mobile/i.test(navigator.userAgent)) {
      window.onresize = () => {
        document.querySelector('html').style.fontSize = screen.width / 3.75 / 16 * 100 + '%';
      }
    }
    this.$http.post('/sso/login-info').then((res) => {
      if (res.status === 1) {
        let user = {
          status: true,
          info: res.data,
        }
        this.loginAction(user);
      }
    });
  },
  computed: {
    selected() {
      return this.$route.path;
    }
  },
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.length;
      const fromDepth = from.path.length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      this.$root.eventHub.$emit('closeLoading', to.path);
      if (to.meta.MobileRequireAuth) {
        if (!this.$store.state.user.status) {
          this.$router.push({ path: '/m/my/login', query: { redirect: to.fullPath } });
        }
      }
     
    }
  },
  methods: {
    ...mapActions(['loginAction']),
    goto(path) {
      this.$router.push({ path });
    }
  }
}
</script>

<style lang="less" scoped>
#m_main {
  width: 3.75rem;
  margin: 0 auto;
  padding-bottom: .65rem;
  
  .tab {
    z-index:500;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 99.99%;
    height: .55rem;
    background: #f8f8f8;
    color: #999;
    z-index: 99999;
    >li {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      height: 100%;
      &.active {
        color: #26a2ff;
      }
    }
  }
  .fontweight {
    font-weight: 700;
  }
}

.child-view {
  transition: all .25s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(.6rem, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-.6rem, 0);
}
</style>
</style>

