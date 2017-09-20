<template>
  <div class="inp">
    <span @click="clearVal" v-show="val" class="iconClear xd xd-close"></span>
    <input v-if="type=='text'" v-model="val" @focus="getFocus" @blur="noBlur" :class="classes" type="text" :placeholder="placeholder">
    <input v-if="type == 'password'" v-model="val" @focus="getFocus" @blur="noBlur" :class="classes" type="password" :placeholder="placeholder">
    <span v-show="info" class="info" :class="infoType">
      <i class="xd" :class="iconClass"></i>{{info}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: '',
    }
  },
  props: {
    placeholder: String,
    info: String,
    infoType: String,
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    clearVal() {
      this.val = '';
    },
    getFocus() {
      this.$emit('focus');
    },
    noBlur() {
      this.$emit('blur');
    }
  },
  computed: {
    classes() {
      return 'input-' + this.infoType;
    },
    iconClass() {
      return 'xd-' + this.infoType;
    }
  },
  watch: {
    val(v) {
      this.$emit('getValue', this.val);
    }
  }
}
</script>


<style lang="less" scoped>
.inp {
  position: relative;
  display: inline-block;
  input {
    width: 280px;
    height: 34px;
    margin-bottom: 20px;
    border: 1px solid #cbcbcb;
    border-radius: 5px;
    text-indent: 20px;
    outline: none;
    &:focus {
      box-shadow: 0 0 5px #2693d4;
    }
  }
  .info {
    position: absolute;
    top: 70%;
    font-size: 12px;
    text-indent: 5px;
    i {
      margin-right: 3px;
    }
  }
  .error {
    color: rgb(247, 36, 36);
  }
  .success {
    color: rgb(51, 204, 102);
  }
  .iconClear {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 16px;
    color: rgb(194, 180, 180);
    cursor: pointer;
    &:hover {
      color: rgb(152, 146, 146);
    }
  }
  .input-error {
    border-color: rgb(247, 36, 36);
    box-shadow: 0 0 5px rgb(247, 36, 36);
  }
  .input-success {
    border-color: rgb(247, 36, 36);
    box-shadow: 0 0 5px rgb(247, 36, 36);
  }
}
</style>