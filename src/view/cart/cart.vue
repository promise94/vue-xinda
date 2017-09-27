<template>
    <div class="cart_conter" id="div_cart">
        <!-- 展示项 -->
        <div class="header">
            <p>首页/购物车</p>
            <p>全部商品（{{msg}}）</p>
        </div>
        <div class="company-hd" v-show="willshow ===1">
            <p>公司</p>
            <p>服务商品</p>
            <p>单价</p>
            <p>数量</p>
            <p>金额</p>
            <p>操作</p>
        </div>
        <!-- 商品列表 -->
        <div class="shangpin" v-show="willshow ===1">
            <div class="list" v-for="(item1,k) of items" :key="k">
                <p>店铺：{{item1.providerName}}</p>
                <div class="list-xx">
                    <p><img v-bind:src="item1.providerImg" alt="" @click="gotos(item1.serviceId)"></p>
                    <p>{{item1.serviceName}}</p>
                    <p>￥{{item1.unitPrice}}</p>
                    <p>
                        <span @click="less(item1)">-</span>
                        <input type="text" @blur="onblur($event ,item1)"  onkeyup=" if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g, '')}else{this.value=this.value.replace(/\D/g, '')} " onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g, '')}else{this.value=this.value.replace(/\D/g, '')} " :value="item1.buyNum">
                        <span @click="add(item1)">+</span>
                        <span v-show="show === 0"></span>
                    </p>
                    <p>￥{{item1.totalPrice}}</p>
                    <p @click="del(item1)">删除</p>
                </div>
            </div>
        </div>
        <!-- 购物车为空 -->
        <div class="kong" v-show="willshow ===0">
            <img src="../../common/images/kongcart.jpg" alt="">
            <div @click="goShop()">继续购物</div>
        </div>
        <!-- 金额总计 -->
        <div class="totle" v-if="willshow">
            <p>金额总计
                <span>￥{{monytotal}}</span>
            </p>
            <div @click="goShop()">
                <a>继续购物</a>
            </div>
            <div @click="goSettle()">
                <a>去结算</a>
            </div>
        </div>
        <!-- 热门服务 -->
        <div class="rr">
            <p>热门服务</p>
        </div>
        <div class="rm-list">
            <div v-for="(item, k) of recommend" :key="k" @click="showDetails(item.id)">
                <p>{{item.serviceName}}</p>
                <p>
                    <span></span>
                    <span></span>
                </p>
                <p>{{item.serviceInfo}}</p>
                <p>￥{{item.price}}</p>
                <p>原价：￥{{item.marketPrice}}</p>
                <p>查看更多>></p>
            </div>
        </div>
        <!-- 提示框 -->
        <modal ref="name1">
            <div slot="body">
                <h1>{{modal_info}}</h1>
            </div>
        </modal>
        <!-- 删除结果 -->
        <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert1"></v-alert>
    </div>
</template>

<script>
//引入modal
import modal from '@/components/global/modal'; //弹出框引入
import { mapActions } from 'vuex' //vuex的引入
import vAlert from '@/components/global/alert';
export default {
    name: 'div_cart',
    components: {
        modal,
        vAlert,
    },
    created() {
        this.getTuijian();
        this.getCartlsit();
        
    },
    data() {
        return {
            buyNum: 0,
            counter: 0,      //个数
            msg: 0,          //全部商品
            recommend: '',  //热门商品的总数据
            items: [],       //商品数组
            monytotal: 0,    //去结算总金额
            totlePrice: 0,   //单件商品总额
            unitPrice: 0,  //单价
            willshow: 0,
            modal_info: '',
            jieguo: 0,
            caozuo: '', //成功、失败
            show: 1, //遮罩层
            alert_options: { type: 'error', info: '' }, // 提示框设置
        }
    },
    methods: {
        ...mapActions(['cartAction']),
        
        //价格转化
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        //购物车商品获取
        getCartlsit() {
            this.$http({
                method: 'post',
                url: '/cart/list',
                data: {
                }
            }).then((res) => {
                if (res.data.length > 0) {
                    this.willshow = 1;
                    this.msg = res.data.length;//全部商品
                    let data = res.data;
                    this.monytotal = 0;
                    this.counter = 0;   //设置购物车件数
                    this.getZhezhao(1); //遮罩层关闭
                    data.forEach(function(item) {
                        item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                        this.counter += item.buyNum;    //总件数
                        let price = item.unitPrice;
                        item.unitPrice = this.fmtPrice(price);    //价格处理
                        let totalPrice = item.totalPrice;
                        item.totalPrice = this.fmtPrice(totalPrice);
                        this.monytotal += item.totalPrice*100  //总钱数
                    }, this)
                    this.items = res.data;
                    this.cartAction(this.msg);
                } else {
                    this.willshow = 0;
                }
            })
        },
        //数量操作
        // 加
        add(item1) {
            item1.buyNum++;
            this.getZhezhao(0); //遮罩层打开
            this.getxiugai(item1);
        },
        // 减
        less(item1) {
            if (item1.buyNum > 1) {
                this.getZhezhao(0); //遮罩层打开
                item1.buyNum--;
                this.getxiugai(item1);
            } else {
                this.counter = 1;
                this.alert_options.type = 'error';
                this.alert_options.info = "数量不能为0";
                this.$refs.alert1.alert()
            }
        },
        // 修改事件
        getxiugai(item1) {
            this.$http.post('/cart/set',
                {
                    id: item1.serviceId,
                    num: item1.buyNum
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
        // 删除事件
        del(item1) {
            this.modal_info = '是否删除订单 ？';
            this.$refs.name1.confirm().then(() => {
                // 点击确定按钮的回调处理
                this.$refs.name1.show = false;//自己手动关闭
                this.$http.post('/cart/del', { id: item1.serviceId }).then((res) => {
                    if (res.status == 1) {  //删除成功的操作                 
                        //删除结果提示 
                        this.alert_options.type = 'success';
                        this.alert_options.info = res.msg;
                        this.$refs.alert1.alert().then(() => {
                            this.getCartlsit();
                            this.msg--;
                            if(this.msg == 0){
                                this.cartAction(0);
                            }
                        });
                        // // 删除列表的最后一件
                        // var i = this.items.indexOf(item1);
                        // this.items.splice(i, 1);
                        // this.msg--;
                        // this.cartAction(this.items.length);
                    } else {
                        this.modal_info = res.msg;
                        this.$refs.name1.confirm().then(() => {
                            this.$refs.name1.show = false; //手动关闭  
                        })
                        console.log(res);
                    }
                    // this.
                });
            }).catch(() => {
                // 点击取消按钮的回调处理
            });
        },
        // 失焦事件
        onblur(ev, item1) {
            this.getZhezhao(0); //遮罩层打开
            let vall = ev.target.value;
            item1.buyNum = vall;
            this.getxiugai(item1)
        },
        //去购物
        goShop() {
            this.$router.push({
                path: '/'
            })
        },
        //提交结算
        goSettle() {
            this.$http({
                method: 'post',
                url: '/cart/submit',
                data: {
                }
            }).then((res) => {
                console.log(res);
                if (res.status == 1) {
                    let dingdan = res.data;
                    this.$router.push({
                        path: '/pay',
                        query: { val: dingdan }
                    });
                    this.cartAction(0);
                } else {
                    // this.modal_info = ""
                }
            })
        },
        //触发遮罩层
        getZhezhao(n) {
            this.show = n;
        },
        //热门服务获取
        getTuijian() {
            this.$http({
                method: 'post',
                url: '/recommend/list',
                data: {

                }
            }).then((result) => {
                let data = result.data.hq;
                data.forEach(function(item) {
                    let marketPrice = item.marketPrice;
                    let price = item.price;
                    item.marketPrice = this.fmtPrice(marketPrice);
                    item.price = this.fmtPrice(price);
                }, this);
                this.recommend = data;
            })
        },
        // 购物车商品传id
        gotos(id) {
            // console.log(id)
            this.$router.push({
                path: '/goods',
                query: { id }
            })
        },
        //热门-传id、跳转页面
        showDetails(id) {
            this.$router.push({
                path: '/goods',
                query: { id }
            })
            // console.log(id);
        }
    }
};
</script>

<style lang="less" scoped>
@import url('../../common/less/cart/cart.less');
</style>
