<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <div>这是页面的顶部</div> -->
    <top></top>
    <router-view></router-view>
    <div>这是页面的底部</div>
    <h2>this is h2</h2>
  </div>
</template>

<script>
import top from './components/top';
export default {
  name: 'app',
  components: {top}
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
