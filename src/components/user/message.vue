<template>
  <div class="message">
    <x-input v-model="val" :info="info" :infoType="infoType" placeholder="请输入验证码"></x-input>
    <input @click="getCode" :disabled="btnEabale" type="button" :value="text">
  </div>
</template>

<script>
import xInput from './input';
export default {
  components: {
    xInput
  },
  props: { info: String, infoType: String, isSend: Boolean },
  data() {
    return {
      time: 60,
      btnEabale: false,
      text: '点击获取',
      val: '',
    }
  },
  methods: {
    getCode() {
      this.$emit('get', this.val);
      if (this.isSend) {
        this.btnEabale = true;
        this.text = this.time + 's';
        let t = setInterval(() => {
          this.text = (this.time -= 1) + 's';
          if (this.time == 0) {
            clearInterval(t);
            this.time = 60;
            this.text = '点击获取';
            this.btnEabale = false;
          }
        }, 1000);
      }
    }
  }
}
</script>

<style lang="less" >
.message {
  input[type=text] {
    width: 172px;
  }
  input[type=button] {
    margin-left: 4px;
    width: 100px !important;
  }
  input[type=button]:disabled {
    background-color: rgb(133, 180, 221) !important;
    cursor: not-allowed !important;
    color: #fff !important;
    border: 0 !important;
  }
}
</style>