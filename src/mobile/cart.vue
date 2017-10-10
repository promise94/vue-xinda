<template>
    <div class="m_cart">
        <div class="c_title">
            购物车里有
            <span>{{msg}}</span>件商品
        </div>
        <div class="c_list" v-show="willshow === 1">
            <!-- 循环 -->
            <div class="list" v-for="(item,k) of items" :key="k">
                <p class="p1">{{item.providerName}}</p>
                <div class="xinxi">
                    <div class="pth">
                        <img v-bind:src="item.providerImg" alt="" @click="gotos(item.serviceId)">
                    </div>
                    <div class="operation">
                        <div class="o_title">
                            <p>{{item.serviceName}}</p>
                            <p @click="del(item)">删除订单</p>
                        </div>
                        <div>
                            <span>￥{{item.totalPrice}}</span>&nbsp元
                        </div>
                        <div>
                            <p>购买数量：</p>
                            <div>
                                <span @click="less(item)">-</span>
                                <input type="number" @blur="onblur($event ,item)"  :value="item.buyNum">
                                <span @click="add(item)">+</span>
                            </div>
                        </div>
                        <div>
                            <span class="xd xd-xiao31"></span>
                            <span>北京市</span>
                            <span>朝阳区</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 小计 -->
            <div class="zongji">
                共
                <span>{{msg}}</span>件商品&nbsp&nbsp&nbsp小计：
                <span>￥{{monytotal/100}}</span>
            </div>
        </div>
        <!-- 最底层的结算 -->
        <div class="diceng" v-show="willshow === 1">
            <div class="s_submit">
                <div>
                    <p>合计：
                        <span>￥{{monytotal/100}}</span>
                    </p>
                </div>
                <div @click="getSubmit()">
                    去结算
                </div>
            </div>
        </div>
        <!-- 购物车为空 -->
        <div class="kong" v-show="willshow === 0">
            <img src="../common/images/kongcart1.png" alt="">
            <div @click="goShop()">去首页</div>
        </div>

    </div>
</template>

<script>
import { Toast } from 'mint-ui'; 
import { MessageBox } from 'mint-ui'; 
import { Indicator } from 'mint-ui'; //引入“加载中。。。”
export default {
    data() {
        return {
            msg: 0,
            mm: 1,
            willshow: 0,
            counter: 0,      //个数
            items: [],       //商品数组
            monytotal: 0,    //去结算总金额
            totlePrice: 0,   //单件商品总额
            unitPrice: 0,  //单价
        }
    },
    created() {
        this.getCartlsit();
    },
    methods: {
        // 商品获取
        getCartlsit() {
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            this.$http.post('/cart/list',
                {

                }
            ).then((res) => {
                // console.log(res)
                Indicator.close();
                if (res.data.length > 0) {
                    this.willshow = 1;
                    this.msg = res.data.length;//全部商品
                    let data = res.data;
                    this.monytotal = 0;
                    this.counter = 0;   //设置购物车件数
                    data.forEach(function(item) {
                        item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                        let price = item.unitPrice;
                        item.unitPrice = this.fmtPrice(price);    //价格处理
                        let totalPrice = item.totalPrice;
                        item.totalPrice = this.fmtPrice(totalPrice);
                        this.monytotal += item.totalPrice * 100  //总钱数
                    }, this)
                    this.items = res.data;
                    // this.cartAction(this.msg);
                } else {
                    this.willshow = 0;
                }
            })
        },
        // 减
        less(item) {
            if (item.buyNum > 1) {
                item.buyNum--;
                this.getxiugai(item);
            } else {
                MessageBox.alert('数量不能为0').then(action => {
                    this.counter = 1;
                })
            }
        },
        // 加
        add(item) {
            item.buyNum++;
            this.getxiugai(item);
        },
        // 修改
        getxiugai(item) {
            this.$http.post(
                '/cart/set',
                {
                    id: item.serviceId,
                    num: item.buyNum
                }
            ).then((res) => {
                let status = res.status;
                if (status == 1) {
                    this.getCartlsit();
                } else {
                    // alert("data.msg")
                }
            })
        },
        // 删除
        del(item) {
            MessageBox.confirm('确定执行此操作?', '删除').then(action => {
                this.$http.post('/cart/del', { id: item.serviceId }).then((res) => {
                    if (res.status == 1) {  //删除成功的操作 
                        Toast({
                            message: '删除成功',
                            duration: 1000
                        })      
                        //删除结果提示 
                        this.getCartlsit();
                        this.msg--;
                        if (this.msg == 0) {
                        }
                        // }
                    }
                })
            })
        },
         // 失焦事件
        onblur(ev, item) {
            let vall = ev.target.value;
            if (vall > 0) {
                item.buyNum = vall;
                this.getxiugai(item)
            } else {
                Toast({
                    message: '不能为空',
                    duration: 1000
                });
                vall = 1;
                item.buyNum = vall;
                this.getxiugai(item)
            }
        },
        // 去首页
        goShop() {
            this.$router.push({
                path: '/m'
            })   
        },
        // 去结算
        getSubmit() {
            // Toast({
            //     message: '目前仅支持微信支付，请在微信浏览器中打开',
            //     duration: 1000
            // })
            this.$http({
                method:'post',
                url:'/cart/submit',
            }).then((res)=>{
                // console.log(res);
                if (res.status == 1) {
                    let dingdan = res.data;
                    this.$router.push({
                        // path: '/pay',
                        query: { val: dingdan }
                    });
                    this.getCartlsit();
                    // this.cartAction(0);
                } else {
                    // this.modal_info = ""
                }
            })
        },
        //价格转化
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        // 购物车商品传id
        gotos(id) {
            this.$router.push({
                path: '/m/goods',
                query: { id }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.m_cart {
    box-sizing: border-box;
    width: 3.75rem;
    // diceng
    .diceng{
        position:fixed;
        bottom: 0.55rem;
        left: 0;
    }
    .c_title {
        width: 3.75rem;
        height: 0.39rem;
        padding-left: 0.12rem;
        line-height: 0.39rem;
        box-sizing: border-box;
        background-color: #e5e5e5;
        span {
            color: red;
        }
    }
    .c_list {
        box-sizing: border-box;
        width: 3.75rem;
        padding: 0 0.17rem 0 0.09rem;
        margin-bottom: 1.5rem;
        .list {
            width: 3.5rem; // height: 1.3rem;
            .p1 {
                width: 3.5rem;
                height: 0.315rem;
                font-size: 0.15rem;
                font-weight: bold;
                line-height: 0.315rem;
            }
            .xinxi {
                width: 3.5rem; // height: 0.96rem;
                padding: 0.03rem 0 0.165rem 0;
                display: flex;
                border-bottom: 0.01rem solid #e3e3e3; 
                // 获取到的图片
                .pth {
                    margin-right: 0.1rem;
                    img {
                        width: 0.6rem;
                        height: 0.4rem;
                        margin-top: 0.2rem;
                    }
                } 
                // 获取到的信息及操作
                .operation {
                    width: 2.56rem; // height: 0.85rem;
                    .o_title {
                        display: flex;
                        justify-content: space-between;
                        line-height: 0.19rem;
                        >p:nth-child(1) {
                            width: 2.04rem;
                            overflow: hidden;
                            font-size: 0.14rem;
                        }
                        >p:nth-child(2) {
                            width: 0.48rem;
                            font-size: 0.12rem;
                            color: red;
                        }
                    }
                    >div:nth-child(2) {
                        font-size: 0.1rem;
                        width: 2.56rem;
                        line-height: 0.24rem;
                        >span {
                            color: red;
                            font-size: 0.16rem;
                        }
                    }
                    >div:nth-child(3) {
                        width: 2.56rem;
                        line-height: 0.175rem;
                        display: flex;
                        >p {
                            font-size: 0.15rem;
                        }
                        >div {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 0.175rem;
                            span {
                                text-align: center;
                                line-height: 0.175rem;
                                font-size: 0.15rem;
                                width: 0.178rem;
                                background-color: #ededed;
                                border: 0.005rem solid #e3e3e3;
                            }
                            input {
                                box-sizing: border-box;
                                text-align: center;
                                line-height: 0.175rem;
                                font-size: 0.15rem;
                                width: 0.3rem;
                                height: 0.175rem;
                                border: 0.015rem solid #e3e3e3;
                            }
                        }
                    }
                    >div:nth-child(4) {
                        width: 2.56rem;
                        margin-top: 0.06rem;
                        span {
                            font-size: 0.12rem;
                            line-height: 0.12rem;
                        }
                        >span:nth-child(2) {
                            margin: 0 0.1rem;
                        }
                    }
                }
            }
        }
        .zongji {
            text-align: right;
            margin-top: 0.09rem;
            padding-right: 0.24rem;
            span {
                color: red;
            }
        }
    }
    .kong {
        background-color: #f8f8f8;
        img {
            width: 3.75rem;
            margin-bottom: 1.39rem;
        }
        div {
            width: 1.29rem;
            height: 0.45rem;
            position: absolute;
            margin-left: 1.23rem; // margin-top: 2.725rem;
            margin-top: -2.99rem;
            border-radius: 0.03rem;
            background-color: #2693d4;
            color: white;
            text-align: center;
            line-height: 0.45rem;
        }
    }
    .s_submit {
        width: 3.75rem;
        height: 0.55rem;
        font-size:0.2rem;
        line-height: 0.55rem;
        background-color: #e5e5e5;
        display: flex; // float: left;
        >div:nth-child(1) {
            width: 2.46rem;
            height: 0.55rem; // display: inline-block;
            p {
                margin-left: 0.15rem;
            }
            span {
                // font-size: 0.14rem;
                color: red
            }
        }
        >div:nth-child(2) {
            // display: inline-block;
            width: 1.29rem;
            height: 0.55rem;
            text-align: center;
            background: red;
            color: white;
        }
    }
}
</style>