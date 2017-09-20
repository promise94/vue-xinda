<template>
    <div class="top">
        <div class="container content">
            <div>
                <div class="user" v-show="state === 1">
                    <span>{{userName}}</span>
                </div>
                <span>欢迎来到信达!</span>
                <div v-show="state === 0">
                    <a @click="goto('/user/login')" href="javascript:;">登录</a>
                    <a @click="goto('/user/register')" href="javascript:;">快速注册</a>
                </div>
                <a v-show="state === 1" @click="logout" class="user" href="javascript:;">【退出】</a>
            </div>
            <div class="shop">
                <p>
                    <i class="xd xd-cart"></i>购物车
                    <span>{{cartNum}}</span>件</p>
                <div class="order" v-show="state === 1">
                    <span class="xd xd-wodedingdan"></span>
                    <span>我的订单</span>
                </div>
                <a href="javascript:;">服务商入口</a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: 'top',
    data() {
        return {
            state: 0,
            userName: '',
            user: '',
            cartNum: 0,
        }
    },
    created() {
        // var o1 = {height:1.75}
        // var o = {name:'sunxiaowei',age:18};

        // this.$http({
        //     method: 'post',
        //     url: '/sso/login-info',
        // }).then((data) => {
        // });
        // this.$http.post('/product/style/list').then((res)=>{
        //     console.log(res);
        // })
        this.getUser();
        this.getCartNum();
    },
    methods: {
        logout() { // 退出登录
            this.$http.post('/sso/ logout').then((res) => {
                console.log(res);
                if (res.status === 1) {
                    sessionStorage.removeItem('users');
                    this.getUser();
                }
            })
        },
        getUser() { // 获取用户信息
            this.user = JSON.parse(sessionStorage.getItem('users'));
            if (this.user) {
                this.state = 1;
                this.userName = this.user.call;
            } else {
                this.state = 0;
                this.userName = '';
            }
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
    // computed:{
    //     ...mapGetters(['getUsername'])//...代表对象扩展
    // }
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
                i {}
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