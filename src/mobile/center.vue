<template>
    <div id="center">
        <div class="headImg">
            <img v-if="user.status" src="../../static/images/user.png" alt="">
            <span v-if="!user.status" class="xd xd-user"></span>
        </div>
        <div class="name" v-if="user.status">{{user.info ? user.info.name : ''}}</div>
        <div class="btnbox" v-if="!user.status">
            <button @click="goto('register')">注册</button>
            <button @click="goto('login')">登录</button>
        </div>
        <ul class="user">
            <li @click="goto('my/order')">
                <div>
                    <span class="xd xd-dingdan"></span>
                    <span>我的订单</span>
                </div>
                <span class="xd xd-more"></span>
            </li>
            <li @click="goto('my/set')">
                <div>
                    <span class="xd xd-shezhi"></span>
                    <span>账户设置</span>
                </div>
                <span class="xd xd-more"></span>
            </li>
            <li class="out" v-if="user.status">退出登录</li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'center',
    computed: {
        ...mapGetters({ user: 'getUser' }),
    },
    methods: {
        goto(path) {
            this.$router.push({ path: path });
        }
    }
}
</script>

<style lang="less" scoped>
#center {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    background-color: #f8f8f8;
    .headImg {
        // margin-top: -1rem;
        margin-bottom: .24rem;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: #fff;
        span {
            font-size: .75rem;
            color: #d5d5d5;
        }
        img{
            width: 100%;
        }
    }
    .btnbox {
        margin-bottom: .8rem;
        button {
            width: .78rem;
            height: .3rem;
            line-height: .3rem;
            border: 0;
            border-radius: .05rem;
            text-align: center;
            color: #fff;
            background-color: #2594d4;
            &:last-of-type {
                margin-left: .18rem;
            }
        }
    }
    .user {
        li {
            margin-bottom: .17rem;
            padding: 0 .15rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 3.07rem;
            height: .38rem;
            background-color: #e9e9e9;
            color: #999;
            >div {
                >span:first-of-type {
                    margin-right: .15rem;
                }
            }
            &.out {
                margin-top: .5rem;
                justify-content: center;
                border-radius: .05rem;
                background-color: #2594d4;
                color: #fff;
                font-size: .16rem;
                text-align: center;
            }
        }
    }
}
</style>
