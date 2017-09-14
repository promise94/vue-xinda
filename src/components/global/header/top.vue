<template>
    <div class="top">
        <div class="container content">
            <div>
                <div class="user" v-show="state === 1">
                    <span>13800138000</span>
                </div>
                <span>欢迎来到信达！</span>
                <div v-show="state === 0">
                    <a href="javascript:;">登录</a>
                    <a href="javascript:;">快速注册</a>
                </div>
                <a class="user" href="javascript:;">【退出】</a>
            </div>
            <div class="shop">
                <p>
                    <i class="xd xd-cart"></i>购物车
                    <span>0</span>件</p>
                <div class="order">
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
            state: 1
        }
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