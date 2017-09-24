<template>
  <ul class="form">
    <li>
      <xd-input @getValue="getPhone" @blur="isPhone" @focus="isPhone(1)" :info="info.phoneInfo" :infoType="type.phoneType" placeholder="请输入手机号"></xd-input>
    </li>
    <li>
      <xd-input @getValue="getPassword" @blur="isPassword" @focus="isPassword(1)" type="password" :info="info.pwdInfo" :infoType="type.pwdType" placeholder="请输入新密码(8-16位数字和字母)"></xd-input>
    </li>
    <li class="message">
      <xd-captcha :info="info.captInfo" :upload="isload" :infoType="type.captType" @value="getValue"></xd-captcha>
    </li>
    <li class="forget">
      <a href="#/user/forget">忘记密码?</a>
    </li>
    <li><input @click.13="loginAction" type="button" value="立即登录"></li>
  </ul>
</template>

<script>
import xdCaptcha from '@/components/user/captcha';
import xdInput from '@/components/user/input';
import reg from '@/common/js/reg';
import md5 from 'md5';
import { mapActions } from 'vuex';
export default {
  components: {
    xdCaptcha,
    xdInput,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name) {
      sessionStorage.setItem('toLoginPath',from.fullPath);
    }
    next();
  },
  data() {
    return {
      info: { phoneInfo: '', captInfo: '', pwdInfo: '' }, // 提示信息
      type: { phoneType: '', captType: '', pwdType: '' }, // 提示类型
      code: '', // 图片验证码
      phone: '', // 电话号码
      password: '', // 密码
      clear: false,
      isload: '', // 是否重新加载图片验证码
    }
  },
  created() {
    let user = JSON.parse(sessionStorage.getItem('temp'));
    if (user && user.tempPhone) {
      this.phone = user.tempPhone;
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['loginPathAction']),
    getValue(v) { // 获取用户输入图片验证码
      this.code = v;
      this.isNull(1);
    },
    getPhone(phone) { // 获取用户输入手机号
      this.phone = phone;
    },
    getPassword(v) { // 获取密码
      this.password = v;
    },
    isPhone(n) { // 手机号验证
      this.clearInfo();
      if (n === 1) {  // 获取焦点,移除错误提示
        this.info.phoneInfo = '';
        this.type.phoneType = '';
      } else {
        this.type.phoneType = 'error';
        if (this.phone && !reg.isPhone(this.phone)) {
          this.info.phoneInfo = '手机号格式错误';
          return false;
        } else if (!this.phone) {
          this.info.phoneInfo = '手机号不能为空';
          return false;
        } else {
          this.info.phoneInfo = '';
          this.type.phoneType = '';
          return true;
        }
      }
    },
    isPassword(n) { // 密码验证
      this.clearInfo();
      if (n === 1) {  // 获取焦点,移除错误提示
        this.info.pwdInfo = '';
        this.type.pwdType = '';
      } else {
        this.type.pwdType = 'error';
        if (this.password && !reg.isPassword(this.password)) {
          this.info.pwdInfo = '密码格式错误';
          return false;
        } else if (!this.password) {
          this.info.pwdInfo = '密码不能为空';
          return false;
        } else {
          this.info.pwdInfo = '';
          this.type.pwdType = '';
          return true;
        }
      }
    },
    isNull(n) { // 判断图片验证码是否为空
      if (n === 1) {
        this.info.captInfo = '';
        this.type.captType = '';
      } else {
        if (!this.code) {
          this.type.captType = 'error';
          this.info.captInfo = '请输入验证码';
          return false;
        } else {
          return true;
        }
      }
    },
    loginAction() {
      if (this.isPhone() && this.isNull() && this.isPassword()) {
        this.$http.post('/sso/login', { loginId: this.phone, password: md5(this.password), imgCode: this.code })
          .then((res) => {
            if (res.status === 1) {
              let path = sessionStorage.getItem('toLoginPath');
              path = path ? path : '/';
              console.log('path',path);
              this.$router.push(path);
            } else if (res.msg.indexOf('验证码') > -1) {
              this.info.captInfo = res.msg;
              this.type.captType = 'error';
              this.isload = Math.random().toString().substr(2, 4);
            } else {
              this.clear = true;
              this.info.phoneInfo = res.msg;
              this.type.phoneType = 'error';
              this.info.pwdInfo = res.msg;
              this.type.pwdType = 'error';
            }
          })
      }
    },
    clearInfo() {
      if (this.clear) {
        this.info.phoneInfo = '';
        this.type.phoneType = '';
        this.info.pwdInfo = '';
        this.type.pwdType = '';
        this.clear = false;
      }
    }
  },
}
</script>

<style lang="less">

</style>

