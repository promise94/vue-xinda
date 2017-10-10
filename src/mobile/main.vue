<template>
  <div id="m_main">
    <router-view></router-view>
    <ul class="tab" v-show="menuShow">
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
export default {
  name: 'm_main',
  data() {
    return {
      menuShow: true, // 是否显示菜单
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.meta.MobileRequireAuth) {
        if (!vm.$store.state.user.status) {
          vm.$router.push({ path: '/m/my/login', query: { redirect: to.fullPath } });
        }
      }
      if (/mGoods/i.test(to.path)) {
        vm.menuShow = false;
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
      if (to.meta.MobileRequireAuth) {
        if (!this.$store.state.user.status) {
          this.$router.push({ path: '/m/my/login', query: { redirect: to.fullPath } });
        }
      }
      if (/mGoods/i.test(to.path)) {
        this.menuShow = false;
      }
    }
  },
  methods: {
    goto(path) {
      this.$router.push({ path });
    }
  }
}
</script>

<style lang="less" scoped>
#m_main {
  width: 3.75rem;
  padding-bottom: .55rem;
  .tab {
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 99.99%;
    height: .55rem;
    background: #f8f8f8;
    color: #999;
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
</style>
