<template>
  <div id="app">
    <router-view></router-view>
    <backtop></backtop>
  </div>
</template>

<script>
// import backtop from './components/global';
console.log(backtop);
export default {
  name: 'app'
}
</script>

<style lang = "less">
@import url('./common/less/global/cssreset.less');
@import url('./common/less/global/base.less');
</style>
