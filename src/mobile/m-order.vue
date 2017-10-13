<template>
    <div id="order">
        <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="(item, k) in orderList" :key="k" class="list">
                <div class="head">
                    <span>订单号：{{item.businessNo}}</span>
                    <span>{{item.statusText}}</span>
                </div>
                <div v-for="(sec, n) in item.data" :key="n" class="body" @click="goServer(sec.serviceId)">
                    <img src="../common/images/order.png" alt="">
                    <div>
                        <h4 class="servename">{{sec.serviceName}}</h4>
                        <p class="time">下单时间：{{item.createTime}}</p>
                        <p class="price">
                            <span>{{'￥' + sec.unitPrice}}</span>
                            <sup>元</sup>
                            <span>x{{sec.buyNum}}</span>
                        </p>
                    </div>
                </div>
                <div class="foot">
                    <p>总计：
                        <span>￥{{item.totalPrice}}</span>
                    </p>
                    <div v-if="item.status == 1">
                        <button @click="delOrder(item)" class="del">删除订单</button>
                        <button @click="goto(item.businessNo)" class="pay">付款</button>
                    </div>
                    <div v-if="item.status == 2">交易关闭</div>
                    <div v-if="item.status == 3">交易完成</div>
                </div>
            </li>
        </ul>
        <div v-if="loadingShow" class="loading">
            <mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
        </div>
    </div>
</template>

<script>
import { InfiniteScroll } from 'mint-ui';
import { Indicator } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
// 时间戳处理函数
import util from '@/common/js/utils';
export default {
    name: 'order',
    data() {
        return {
            time: (new Date()).toJSON().substr(0, (new Date()).toJSON().indexOf('T')), // 当前时间
            n: 0,
            orders: '',
            serverOrder: '', // 服务订单数据
            business: '', // 业务订单数据
            loading: true, // 无线滚动加载是否触发
            loadingShow: false, // 加载动画显示隐藏
        }
    },
    computed: {
        list() {
            if (this.business && this.serverOrder) {
                this.business.map((val) => {
                    val.data = [];
                    this.serverOrder.forEach((k) => {
                        if (val.businessNo == k.businessNo) {
                            val.data.push(k);
                        }
                        return val;
                    })
                })
            }
            Indicator.close(); // 加载提示关闭
            return this.business;
        },
        orderList() {
            let data = this.list.slice(0, this.n + 5);
            this.loading = false;
            return data;
        },
    },
    created() {
        this.getOrder();
        Indicator.open('加载中...'); // 页面初始加载提示
    },
    methods: {
        loadMore() { // 滚动加载
            this.loading = true;
            this.loadingShow = true;
            if (this.orderList.length != this.list.length) {
                setTimeout(() => {
                    this.n = this.n + 5;
                    this.loading = false;
                    this.loadingShow = false;
                }, 1000);
            } else {
                this.loadingShow = false;
            }
        },
        getOrder({ business = '', start = '1900-01-01', end = this.time } = {}) { // 获取订单数据
            let data = {
                businessNo: business,
                startTime: start,
                endTime: end,
                start: 0,
            }
            this.$http.post('/business-order/grid', data)
                .then((res) => {
                    res.data.map((val) => {
                        val.createTime = util.formatTime(val.createTime, 'yy-mm-dd H:M:S');
                        val.totalPrice = val.totalPrice / 100;
                        if (val.status === 1) {
                            val.statusText = '未支付';
                        } else if (i.status === 1) {
                            val.statusText = '已支付';
                        } else if (i.status === 1) {
                            val.statusText = '已取消订单';
                        }
                        return val;
                    })
                    this.business = res.data;
                })
            this.$http.post('/service-order/grid', data)
                .then((res) => {
                    this.serverOrder = res.data.map((i) => {
                        i.totalPrice = i.totalPrice / 100;
                        i.unitPrice = i.unitPrice / 100;
                        if (i.status === 1) {
                            i.statusText = '未支付';
                        } else if (i.status === 1) {
                            i.statusText = '已支付';
                        } else if (i.status === 1) {
                            i.statusText = '已取消订单';
                        }
                        return i;
                    })
                })
        },
        delOrder(item) { // 删除订单
            MessageBox.confirm('是否删除订单？').then(action => {
                this.$http.post('/business-order/del', { id: item.id }).then((res) => {
                    console.log('res-', res);
                    let message = res.msg;
                    Toast({ message, duration: 1000 });
                    if (res.status === 1) {
                        this.list.splice(this.list.indexOf(item), 1);
                    } else {
                    }
                });
            }, () => { /*点击取消回调 */ });
        },
        goto(orderID) {
            this.$router.push({ path: '/m/pay', query: { val: orderID } })
        },
        goServer(id) { // 查看商品详情
            this.$router.push({ path: '', query: { id } });
        },
    }
};
</script>

<style lang="less" scoped>
#order {
    margin-top: .38rem;
    background-color: #f8f8f8;
    .list {
        margin-bottom: .15rem;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
        background-color: #fff;
        >div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 0 .2rem;
        }
        .head {
            height: .35rem;
        }
        .body {
            justify-content: flex-start;
            padding-top: .225rem;
            padding-bottom: .225rem;
            background-color: #f8f8f8;
            >img {
                margin-right: .08rem;
                width: .85rem;
                height: .85rem;
                box-sizing: border-box;
                border: 2px solid #e3e3e3;
            }
            .time {
                margin-bottom: .2rem;
                font-size: .12rem;
            }
            .price {
                span {
                    &:first-of-type {
                        margin-right: .1rem;
                        color: red;
                        font-weight: 600;
                        font-size: .18rem;
                    }
                    &:last-of-type {
                        margin-left: .175rem;
                        font-size: .16rem;
                    }
                }
            }
        }
        .foot {
            height: .36rem;
            >p {
                span {
                    color: red;
                }
            }
            >div {
                .del {
                    background: #fff;
                    color: red;
                    margin-right: .35rem;
                }
                .pay {
                    width: .61rem;
                    height: .24rem;
                    background-color: #2693d4;
                    color: #fff;
                    border-radius: .02rem;
                }
            }
        }
    }
    .loading{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
/* 过渡动画 */
.list-enter-active,
.list-leave-active {
    transition: .2s ease;
}
.list-enter-to {
    opacity: 0;
}
</style>