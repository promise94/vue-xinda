<template>
  <div class="mmain">
    <ul class="form" id="form">
      <li>
        <xd-input @enter="login" :value="phoneVal" @getValue="getPhone" @blur="isPhone" @focus="isPhone(1)" :info="info.phoneInfo" :infoType="type.phoneType" placeholder="请输入手机号"></xd-input>
      </li>
      <li>
        <xd-input @enter="login" @getValue="getPassword" @blur="isPassword" @focus="isPassword(1)" type="password" :info="info.pwdInfo" :infoType="type.pwdType" placeholder="请输入新密码(8-16位数字和字母)"></xd-input>
      </li>
      <li class="message">
        <xd-captcha @enter="login" :info="info.captInfo" :upload="isload" :infoType="type.captType" @value="getValue"></xd-captcha>
      </li>
      <li class="forget">
        <a href="#/m/my/forget">忘记密码?</a>
      </li>
      <li><input @click.13="login" type="button" value="立即登录"></li>
      <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert"></v-alert>
    </ul>
    <div class="dd">
      <p>还没有薪客账号？</p>
      <div @click="gozhuce()">立即注册</div>
    </div>
  </div>
</template>

<script>
import xdCaptcha from '@/components/user/captcha';
import xdInput from '@/components/user/input';
import vAlert from '@/components/global/alert';
import reg from '@/common/js/reg';
import md5 from 'md5';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
export default {
  components: {
    xdCaptcha,
    xdInput,
    vAlert,
  },
  beforeRouteEnter(to, from, next) {
    if (from.name && from.path.indexOf('forget') < 0 && from.path.indexOf('register') < 0) {
      sessionStorage.setItem('toLoginPath', from.fullPath);
    }
    next();
  },
  data() {
    return {
      info: { phoneInfo: '', captInfo: '', pwdInfo: '' }, // 提示信息
      type: { phoneType: '', captType: '', pwdType: '' }, // 提示类型
      code: '', // 图片验证码
      phone: '', // 电话号码
      phoneVal: '', // 初始手机号默认值
      password: '', // 密码
      clear: false,
      isload: '', // 是否重新加载图片验证码
      alert_options: { type: 'success', info: '' }, // 提示框设置
    }
  },
  created() {
    let user = JSON.parse(localStorage.getItem('temp'));
    if (user && user.tempPhone) {
      this.phoneVal = user.tempPhone;
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['loginAction']),
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
    login() {
      if (this.isPhone() && this.isNull() && this.isPassword()) {
        this.$http.post('/sso/login', { loginId: this.phone, password: md5(this.password), imgCode: this.code })
          .then((res) => {
            if (res.status === 1) {
              // 获取登录成功后的跳转路径
              let path = this.$route.query.redirect || sessionStorage.getItem('toLoginPath');
              path = path ? path : '/';
              // 登录成功后提示信息
              this.alert_options.type = 'success';
              this.alert_options.info = res.msg;
              this.$refs.alert.alert().then(() => {
                // 重置登录状态
                let user = { status: true, info: '' };
                this.loginAction(user);
                // 保存登录手机号用于用户下次登录智能填写
                localStorage.setItem('temp', JSON.stringify({ tempPhone: this.phone }));
                // 保存登录时间
                sessionStorage.setItem('token', (new Date()).getTime());
                // 路由跳转
                this.$router.push(path);
              });
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
    },
    gozhuce() { //跳转到注册界面
      this.$router.push({
        path: '/m/my/register'
      })
    }
  },
}
</script>

<style lang="less">
.mmain {
  box-sizing: border-box;
  width: 3.75rem;
  min-height: 6rem;
  padding-top: .55rem;
  .dd {
    width: 3.75rem;
    height: .3rem;
    background-color: #333;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0.55rem;
    left: 0;
    color: white;
    line-height: .2rem;
    div {
      background-color: #2693d4;
      border-radius: 0.025rem;
      padding: 0 0.1rem;
    }
  }
}

#form {
  width: 2.75rem;
  margin: 0 auto; // margin-top: .55rem;
  li {
    margin-top: .1rem;
  }
  .message {
    .inp {
      width: 1.37rem;
    }
    input[type="text"] {
      width: 1.37rem;
      margin-right: 0.15rem;
    }
  }
  .forget {
    text-align: right;
  }
  input[type="button"] {
    width: 2.75rem;
    height: .35rem;
    border: 0;
    border-radius: .03rem;
    background-color: #2693d4;
    color: #fff;
    outline: none;
  }
}
</style>

