<template>
  <div class="header">
    <xd-top></xd-top>
    <div class="container">
      <div class="log">
        <a @click="goto('/')" href="javascript:;"><img src="../../../common/images/logo.png" alt="">信达</a>
        <span>{{head}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import xdTop from './top';
export default {
  name: 'Header',
  components: {
    xdTop,
  },
  props:['head'],
  methods: {
    goto(url) {
      this.$router.push(url);
    }
  }
};
</script>

<style lang="less">
.log {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 15px 0;
  a {
    height: 95px;
    padding-right: 38px;
    line-height: 95px;
    font-size: 28px;
    font-weight: 700;
    color: #000;
    img {
      width: 60px;
      vertical-align: middle;
    }
  }
  span {
    height: 45px;
    line-height: 45px;
    padding-left: 25px;
    font-size: 18px;
    border-left: 1px solid #b4b4b4;
  }
}
</style>