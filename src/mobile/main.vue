<template>
  <div id="m_main">
    <router-view></router-view>
    <ul class="tab">
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

    }
  },
  computed: {
    selected(){
      return this.$route.path;
    }
  },
  methods:{
    goto(path){
      this.$router.push({path});
    }
  }
}
</script>

<style lang="less" scoped>
#m_main {
  width: 3.75rem;
  height: 100%;
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
    >li{
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      height: 100%;
      &.active{
        color: #26a2ff;
      }
    }
  }
  .fontweight {
    font-weight: 700;
  }
}
</style>
