<template>
    <div id="evaluntion">
        <div class="evaluntionTop">
            <p>我的评价</p>
        </div>
        <div class="evaluntionCenter">
            <span @click="blueColor(1)" :class="{blue: said===1}">未评价</span>
            <span @click="blueColor(2)" :class="{blue: said===2}">已评价</span>
        </div>
        <div class="evaluntionBottom" v-show="said === 1">
            <div>
                <hasBuy></hasBuy>
                <div>
                    <button @click="gotosaid()">去评价</button>
                </div>
            </div>
            <div>
                <hasBuy></hasBuy>
                <div>
                    <button @click="gotosaid()">去评价</button>
                </div>
            </div>

        </div>
        <div class="evaluntionBottom" v-show="said === 2">
            <div>
                <hasBuy></hasBuy>
                <div>
                    <p>已评价</p>
                </div>
            </div>
            <div>
                <hasBuy></hasBuy>
                <div>
                    <p>已评价</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import hasBuy from './little/hasBuy';
export default {
    name: 'evaluntion',
    components: {
        hasBuy,
    },
    data() {
        return {
            said: 1,
        }
    },
    methods: {
        blueColor(x) {
            this.said = x;
        },
        gotosaid() {
            this.$router.push({ path: 'grade' });
        }
    },
};
</script>

<style lang="less" scoped>
#evaluntion {
    width: 930px;
    font-size: 14px;
    .evaluntionTop {
        margin-top: 55px;
        margin-bottom: 23px;
        border-bottom: 1px solid #e9e9e9;
        p {
            margin-left: 10px;
            width: 115px;
            border-bottom: 2px solid #2594d4;
            line-height: 30px;
            font-size: 20px;
            color: #2594d4;
            text-align: center;
        }
    }
    .evaluntionCenter {
        display: flex;
        background: #f7f7f7;
        border: 1px solid #ccc;
        >span {
            width: 108px;
            text-align: center;
            height: 43px;
            line-height: 43px;
            position: relative;
            cursor: pointer;
            margin-right: 5px;
            transition: .15s linear;
            &:hover {
                color: #fff;
                background: #2594d4;
            }
        }
        .blue {
            color: #fff;
            background: #2594d4;
            transition: .15s linear;
            &::after {
                content: '';
                width: 10px;
                height: 10px;
                transform: rotate(45deg);
                background: #2594d4;
                position: absolute;
                left: 50px;
                bottom: -5px;
                transition: .15s linear;
            }
        }
    }
    .evaluntionBottom {
        border: 1px solid #ccc;
        >div {
            display: flex;
            border-bottom: 1px solid #ccc;
            >div {
                button {
                    border: 0;
                    outline: medium;
                    cursor: pointer;
                    width: 80px;
                    height: 30px;
                    line-height: 100%;
                    text-align: center;
                    background: #2594d4;
                    color: #fff;
                    border-radius: 5px;
                    margin-top: 100px;
                    &:hover {
                        background: #6a6d71;
                    }
                }
                p {
                    cursor: pointer;
                    width: 100px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    background: #ccc;
                    color: #fff;
                    border-radius: 5px;
                    margin-top: 100px;
                }
            }
        }
    }
}
</style>