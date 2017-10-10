<template>
  <div class="captcha">
    <x-input :info="info" :infoType="infoType" @enter="enter" @getValue="getVal" mytitle="hello" placeholder="请输入验证码"></x-input>
    <img @click="getCapt" :load="upload" :src="src" alt="">
  </div>
</template>

<script>
import xInput from './input';
export default {
  components: {
    xInput
  },
  props: { info: String, infoType: String, upload: String },
  data() {
    return {
      src: '',
    }
  },
  created() {
    this.getCapt();
  },
  methods: {
    getCapt() {
      this.src = '/xinda-api/ajaxAuthcode?' + Math.random().toString().substr(2, 4);
    },
    getVal(v) {
      this.$emit('value', v);
    },
    enter(){
      this.$emit('enter');
    }
  },
  watch: {
    upload(){
      this.getCapt();
    }
  }
}
</script>

<style lang="less" scoped>
.captcha {
  img {
    width: 85px;
    height: 35px;
    margin-left: 10px;
    vertical-align: middle;
  }
}
</style>