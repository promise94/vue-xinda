<template>
  <div class="header">
    <xd-top></xd-top>
    <xd-logo></xd-logo>
    <xd-tab></xd-tab>
  </div>
</template>

<script>
import xdTop from './top';
import xdLogo from './logo';
import xdTab from './tabLink';
export default {
  name: 'Header',
  components: {
    xdTop,
    xdLogo,
    xdTab,
  }
};
</script>

<style lang="less">

</style>