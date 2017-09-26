<template>
    <div id="order">
        <div class="orderTop">
            <div>
                <p>我的订单</p>
            </div>
            <div>
                <p>订单号:</p>
                <input v-model="number" type="text" placeholder="  请输入订单号搜索">
                <div @click="search">搜索</div>
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
        <div v-show="list.length" class="orderBottom">
            <div v-for="(item, k) of list" :key="k">
                <numberTime :orderID="item.businessNo" :time="item.createTime"></numberTime>
                <div class="orderInfo">
                    <div>
                        <div v-for="(item, k) of item.data" :key="k">
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
                        </div>
                    </div>
                    <div>
                        <button @click="goto(item.businessNo)" v-if="item.status === 1">付款</button>
                        <p @click="delOrder(item)" v-if="item.status === 1">删除订单</p>
                        <p v-if="item.status === 2">交易完成</p>
                        <p v-if="item.status === 3">交易关闭</p>
                    </div>
                </div>
            </div>
        </div>
        <v-nothing v-show="!list.length" title="无结果"></v-nothing>
        <modal ref="dialog" width="800">
            <div slot="body">
                <h1>{{modal_info}}</h1>
            </div>
        </modal>
        <transition name="fade">
            <div class="calendar-dropdown" :style="{'left':calendar.left+'px','top':calendar.top+'px'}" v-if="calendar.show">
                <calendar :zero="calendar.zero" :lunar="calendar.lunar" :value="calendar.value" :begin="calendar.begin" :end="calendar.end" @select="calendar.select"></calendar>
            </div>
        </transition>
        <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert"></v-alert>
    </div>
</template>

<script>
import numberTime from './little/numberTime';
import modal from '@/components/global/modal';
import calendar from '@/components/global/calendar';
import vAlert from '@/components/global/alert';
import vNothing from '@/components/global/nothing';
// 时间戳处理函数
import util from '@/common/js/utils';
export default {
    name: 'order',
    components: {
        numberTime,
        modal,
        calendar,
        vAlert,
        vNothing,
    },
    data() {
        return {
            time: (new Date()).toJSON().substr(0, (new Date()).toJSON().indexOf('T')), // 当前时间
            orders: '',
            number: '',
            modal_info: '',
            serverOrder: '', // 服务订单数据
            business: '', // 业务订单数据
            alert_options: { type: 'success', info: '' }, // 提示框设置
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
        list() {
            console.log('data-=-', this.business, this.serverOrder);
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
            return this.business;
        }
    },
    created() {
        this.getOrder();
    },
    watch: {
        number(val){
            val ? '' : this.getOrder();
        }
    },
    methods: {
        getOrder(business) {
            let data = {
                businessNo: business ? business : '',
                startTime: '1900-01-01',
                endTime: this.time,
                start: 0,
            }
            this.$http.post('/business-order/grid', data)
                .then((res) => {
                    res.data.map((val) => {
                        val.createTime = util.formatTime(val.createTime, 'yy-mm-dd H:M:S');
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
        delOrder(item) {
            this.modal_info = '是否删除订单 ？';
            this.$refs.dialog.confirm().then(() => {
                // 点击确定按钮的回调处理
                this.$refs.dialog.show = false;
                this.$http.post('/business-order/del', { id: item.id }).then((res) => {
                    if (res.status === 1) {
                        this.alert_options.type = 'success';
                        this.list.splice(this.list.indexOf(item), 1);
                    } else {
                        this.alert_options.type = 'error';
                    }
                    this.alert_options.info = res.msg;
                    this.$refs.alert.alert();
                });
            }, () => {
                // 点击取消按钮回调处理
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
        goto(orderID) {
            this.$router.push({ path: '/pay', query: { val: orderID } })
        },
        search(){
            console.log('search',this.number);
            this.business.map((item)=>{
                console.log(item.businessNo.indexOf(this.number));
                if(item.businessNo.indexOf(this.number) > -1){
                    return item;
                }else {
                    return '';
                }
            })
            console.log('list',this.list);
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/order.less';
#company {
    display: flex;
    align-items: center;
    border-top: 1px solid #e8e8e8;
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
    }
    p:nth-of-type(3) {
        width: 100px;
    }
    div {
        width: 143px;
        color: #2594d4;
    }
}

.calendar-dropdown {
    position: absolute;
    box-shadow: 0 0 15px 1px rgba(143, 169, 147, 0.72);
    background: #fff;
}
</style>