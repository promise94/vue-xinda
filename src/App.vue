<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <backtop transitionName="easeInQuad"></backtop>
  </div>
</template>

<script>
import backtop from '@/components/global/backTop'; // 返回顶部
export default {
  name: 'app',
  components: {
    backtop,
  },
}
</script>

<style lang = "less">
@import url('./common/less/global/cssreset.less');
@import url('./common/less/global/base.less');
#app {
  min-width: 1300px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .35s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
