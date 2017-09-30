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
      <mt-tab-item id="/m/mcart">
        <span slot="icon" class="icon xd xd-cart"></span>
        购物车
      </mt-tab-item>
      <mt-tab-item id="/m/muser">
        <span slot="icon" class="fontweight xd xd-user"></span>
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';
console.log(Tabbar, TabItem);
export default {
  name: 'm_main',
  components: {
    [Tabbar.name]: Tabbar,
    [TabItem.name]: TabItem,
  },
  data() {
    return {
      fixed: true,
      selected: '/m',
    }
  },
  created() {
    this.selected = this.$route.path;
  },
  watch: {
    selected(val) {
      console.log('path', val);
      // this.$router.push({ path: val });
    }
  }
}
</script>

<style lang="less" scoped>
#m_main {
  width: 3.75rem;
  .tab{
    color: #999;
  }
  .fontweight{
    font-weight: 700;
  }
}
</style>
