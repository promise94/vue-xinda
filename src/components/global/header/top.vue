<template>
  <div class="top">
    <div class="container content">
      <div>
        <div class="user" v-if="status">
          <span @click="goto('/member/order')">{{getUser.info.name}}</span>
        </div>
        <span>欢迎来到信达&nbsp;!</span>
        <div v-show="!status">
          <a @click="goto('/user/login')" href="javascript:;">登录</a>
          <a @click="goto('/user/register')" href="javascript:;">快速注册</a>
        </div>
        <a v-if="status" @click="logout" class="user" href="javascript:;">【退出】</a>
      </div>
      <div class="shop">
        <p @click="goto('/cart')" ref="cart">
          <i class="xd xd-cart"></i>购物车
          <span>{{getCartNum}}</span>件</p>
        <div @click="goto('/member/order')" class="order" v-if="status">
          <span class="xd xd-wodedingdan"></span>
          <span>我的订单</span>
        </div>
        <a @click="gotoServer" href="javascript:;">服务商入口</a>
      </div>
    </div>
    <v-alert :type="options.type" :info="options.info" ref="alert"></v-alert>
  </div>
</template>

<script>
import vAlert from '@/components/global/alert';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
export default {
  name: 'top',
  components: {
    vAlert,
  },
  data() {
    return {
      evehub: this.$root.eventHub,
      status: false,
      user: '',
      options: { type: 'success', info: '' }, // 提示框设置
    }
  },
  created() {
    this.postUser();
    this.getCart();
  },
  computed: {
    ...mapGetters(['getUser', 'getCartNum']),
  },
  destroyed() {
    // this.evehub.$off('add');
  },
  methods: {
    ...mapActions(['loginAction', 'cartAction']),
    logout() { // 退出登录
      this.$http.post('/sso/ logout').then((res) => {
        if (res.status === 1) {
          this.options.info = res.msg;
          this.options.type = 'success';
          this.$refs.alert.alert().then(() => {
            this.status = false;
            let user = {
              status: false,
              info: res.data,
            }
            this.loginAction(user);
            this.$router.push('/');
          });
        }
      })
    },
    gotoServer() { // 服务商入口
      console.log(this.getUser, '----', this.getCartNum);
    },
    postUser() { // 获取用户信息
      this.$http.post('/sso/login-info').then((res) => {
        if (res.status === 1) {
          let user = {
            status: true,
            info: res.data,
          }
          let data = this.getUser;
          Object.assign(data, user);
          this.status = true;
          this.loginAction(data);
        }
      })
    },
    getCart() {
      // if (this.getUser.status) {
      //   this.$http.post('/cart/cart-num').then((res) => {
      //     let n = res.data.cartNum;
      //     console.log('getCart',n);
      //     this.cartAction(n);
      //   });
      // }
    },
    goto(url) { // 页面跳转
      this.$router.push(url);
    },
  },
};
</script>

<style lang="less" scoped>
@color: #2693d4;
.top {
  background-color: #f2f2f2;
  .content {
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div {
      display: flex;
    }
    .user {
      color: @color;
      padding-right: 15px;
      cursor: pointer;
    }
    a.user {
      margin-left: 5px;
    }
    .order {
      margin-left: 15px;
      cursor: pointer;
      span {
        &:first-of-type {
          color: #555;
        }
      }
    }
    .shop {
      >p {
        cursor: pointer;
        >span {
          cursor: pointer;
          padding: 0 3px;
          color: @color;
        }
      }
      i {
        margin-right: 5px;
        color: #777;
      }
      a {
        padding-top: 5px;
      }
    }
    a {
      margin-left: 15px;
      color: @color;
      &:hover {
        text-decoration: none;
      }
    }
  }
}

.ball {
  position: absolute;
  width: 100%;
  height: 20px;
  overflow: hidden; // border: 1px solid orange;
  transition: .35s cubic-bezier(0.46, 0.17, 0.73, 0.51);
}

.inner {
  position: absolute;
  padding: 8px;
  border-radius: 50%;
  background-color: rgba(69, 174, 236, 0.5);
  transition: .35s cubic-bezier(0.04, 0.49, 0.6, 1.07);
  z-index: 999999;
}
</style>
