<template>
    <div id="order">
        <div class="orderTop">
            <div>
                <p>我的订单</p>
            </div>
            <div>
                <p>订单号:</p>
                <input type="text" placeholder="  请输入订单号搜索">
                <div>搜索</div>
            </div>
            <div>
                <p>创建时间:</p>
                <input type="text" @click="openByDrop($event)" v-model="calendar.display" readonly>
                <input type="text" readonly>
            </div>
        </div>
        <div class="orderCenter">
            <ul>
                <li>商品名称</li>
                <li>单价</li>
                <li>数量</li>
                <li>总金额</li>
                <li>订单状态</li>
                <li>订单操作</li>
            </ul>
        </div>
        <div class="orderBottom">
            <div v-for="(item, k) of orders" :key="k">
                <numberTime :orderID="item.businessNo" :time="item.createTime"></numberTime>
                <div>
                    <div id="company">
                        <img src="" alt="">
                        <p>
                            <span>{{item.providerName}}</span>
                            <span>{{item.serviceName}}</span>
                        </p>
                        <p>￥{{item.unitPrice}}</p>
                        <p>{{item.buyNum}}</p>
                        <div>￥{{item.totalPrice}}</div>
                        <div>{{item.statusText}}</div>
                    </div>
                    <div v-if="item.status === 1">
                        <button>付款</button>
                        <p @click="modalShow(item.serviceId)">删除订单</p>
                    </div>
                    <div v-if="item.status === 2">
                        <p>交易完成</p>
                    </div>
                    <div v-if="item.status === 3">
                        <p>交易关闭</p>
                    </div>
                </div>
            </div>
        </div>
        <modal ref="dialog">
            <div slot="body">
                <h1>{{modal_info}}</h1>
            </div>
        </modal>
        <transition name="fade">
            <div class="calendar-dropdown" :style="{'left':calendar.left+'px','top':calendar.top+'px'}" v-if="calendar.show">
                <calendar :zero="calendar.zero" :lunar="calendar.lunar" :value="calendar.value" :begin="calendar.begin" :end="calendar.end" @select="calendar.select"></calendar>
            </div>
        </transition>
    </div>
</template>

<script>
import numberTime from './little/numberTime';
import modal from '@/components/global/modal';
import calendar from '@/components/global/calendar';
// 时间戳处理函数
import util from '@/common/js/utils';
export default {
    name: 'order',
    components: {
        numberTime,
        modal,
        calendar,
    },
    data() {
        return {
            time: (new Date()).toJSON().substr(0, (new Date()).toJSON().indexOf('T')), // 当前时间
            orders: '',
            modal_info: '',
            calendar: {
                display: (new Date()).toJSON().substr(0, (new Date()).toJSON().indexOf('T')),
                show: false,
                zero: true,
                value: [2017, 9, 21], //默认日期
                lunar: true, //显示农历
                select: (value) => {
                    this.calendar.show = false;
                    this.calendar.value = value;
                    this.calendar.display = value.join("-");
                }
            },
        }
    },
    computed: {
    },
    created() {
        this.getServiOrder();
        this.getBusinessOrder();
    },
    methods: {
        getBusinessOrder() {
            this.$http.post('/business-order/grid', { businessNo: 1, endTime: this.time, start: 0 })
                .then((res) => {
                    console.log('res', res);
                })
        },
        getServiOrder() {
            this.$http.post('/service-order/grid', { businessNo: 1, startTime: '2017-03-28', endTime: this.time, start: 0 })
                .then((res) => {
                    this.orders = res.data.map((i) => {
                        i.createTime = util.formatTime(i.createTime, 'yy-mm-dd H:M:S')
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
                    console.log('服务订单---',res);
                })
        },
        modalShow(id) {
            this.modal_info = '是否删除订单 ？';
            this.$refs.dialog.confirm().then(() => {
                // 点击确定按钮的回调处理
                this.$refs.dialog.show = false;
                this.$http.post('/business-order/del', { id: id }).then((res) => {
                    this.modal_info = res.msg;
                    this.$refs.dialog.confirm().then(() => {
                        this.$refs.dialog.show = false;
                    })
                    console.log(res);
                    // this.
                });
            }).catch(() => {
                // 点击取消按钮的回调处理
            });
        },
        openByDrop(e) {
            this.calendar.show = true;
            this.calendar.left = e.target.offsetLeft;
            this.calendar.top = e.target.offsetTop + 35;

            e.stopPropagation();
            window.setTimeout(() => {
                document.addEventListener("click", (e) => {
                    this.calendar.show = false;
                    document.removeEventListener("click", () => { }, false);
                }, false);
            }, 1000)
        },
    }
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/order.less';
#company {
    border-top: 1px solid #e8e8e8;
    display: flex;
    img {
        width: 50px;
        height: 50px;
        margin: 10px 15px;
    }
    p:nth-of-type(1) {
        text-align: left;
        width: 225px;
        padding: 10px 0;
        span {
            display: block;
            line-height: 25px;
        }
    }
    p:nth-of-type(2) {
        width: 125px;
        line-height: 70px;
    }
    p:nth-of-type(3) {
        width: 100px;
        line-height: 70px;
    }
    div {
        width: 143px;
        color: #2594d4;
        line-height: 70px;
    }
}

.calendar-dropdown {
    position: absolute;
    box-shadow: 0 0 15px 1px rgba(143, 169, 147, 0.72);
    background: #fff;
}
</style>