<template>
  <div id="m_main">
    <router-view></router-view>
    <mt-tabbar class="tab" v-model="selected" :fixed="fixed">
      <mt-tab-item id="/m">
        <span slot="icon" class="icon xd xd-shouye"></span>
        首页
      </mt-tab-item>
      <mt-tab-item id="/m/mstore">
        <span slot="icon" class="fontweight xd xd-dianpu"></span>
        店铺
      </mt-tab-item>
      <mt-tab-item id="/m/cart">
        <span slot="icon" class="icon xd xd-cart"></span>
        购物车
      </mt-tab-item>
      <mt-tab-item id="/m/my">
        <span slot="icon" class="fontweight xd xd-user"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: 'm_main',
  data() {
    return {
      fixed: true,
      selected: this.$route.path, // 选中项
      query: this.$route.query // 参数
    }
  },
  watch: {
    selected(val) {
      this.$router.push({ path: val ,query: this.$route.query});
    }
  }
}
</script>

<style lang="less" scoped>
#m_main {
  width: 3.75rem;
  height: 100%;
  .tab {
    height: .55rem;
    color: #999;
  }
  .fontweight {
    font-weight: 700;
  }
}
</style>
