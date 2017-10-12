<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <backtop v-if="showback" transitionName="easeInQuad"></backtop>
  </div>
</template>

<script>
import backtop from '@/components/global/backTop'; // 返回顶部
export default {
  name: 'app',
  components: {
    backtop,
  },
  computed: {
    showback(){
      return !/Mobile/i.test(navigator.userAgent);
    }
  }
}
</script>

<style lang = "less">
@import url('./common/less/global/cssreset.less');
@import url('./common/less/global/base.less');
.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
