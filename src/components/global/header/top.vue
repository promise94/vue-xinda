<template>
  <div class="top">
    <div class="container content">
      <div>
        <div class="user" v-if="state">
          <span @click="goto('/member/order')">{{userName}}</span>
        </div>
        <span>欢迎来到信达&nbsp;!</span>
        <div v-show="!state">
          <a @click="goto('/user/login')" href="javascript:;">登录</a>
          <a @click="goto('/user/register')" href="javascript:;">快速注册</a>
        </div>
        <a v-if="state" @click="logout" class="user" href="javascript:;">【退出】</a>
      </div>
      <div class="shop">
        <p @click="goto('/cart')">
          <i class="xd xd-cart"></i>购物车
          <span>{{cartNum}}</span>件</p>
        <div @click="goto('/member/order')" class="order" v-if="state">
          <span class="xd xd-wodedingdan"></span>
          <span>我的订单</span>
        </div>
        <a href="javascript:;">服务商入口</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data() {
    return {
      state: false,
      userName: '',
      user: '',
      cartNum: 0,
    }
  },
  created() {
    this.getUser();
    this.getCartNum();
  },
  methods: {
    logout() { // 退出登录
      this.$http.post('/sso/ logout').then((res) => {
        if (res.status === 1) {
          let user = {
            status: false,
            info: res.data,
          }
          this.userName = '';
          this.state = false;
          this.$store.commit('SETUSER', user);
          this.$router.push('/');
        }
      })
    },
    getUser() { // 获取用户信息
      this.$http.post('/sso/login-info').then((res) => {
        if (res.status === 1) {
          let user = {
            status: true,
            info: res.data,
          }
          this.userName = user.info.name;
          this.state = true;
          this.$store.commit('SETUSER', user);
        }
      })
    },
    goto(url) { // 页面跳转
      this.$router.push(url);
    },
    getCartNum() { // 获取购物车数量
      this.$http.post('/cart/cart-num').then((res) => {
        if (res.status === 1) {
          this.cartNum = res.data.cartNum;
        }
      });
    }
  },
  watch: {
  },
  computed: {

  }
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
</style>