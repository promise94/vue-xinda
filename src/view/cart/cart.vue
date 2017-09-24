<template>
    <div class="cart_conter">
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
                    <p><img v-bind:src="item1.providerImg" alt="" @click="gotos(item1.id)"></p>
                    <p>{{item1.serviceName}}</p>
                    <p>￥{{item1.unitPrice}}</p>
                    <p>
                        <span class="xd xd-jian" @click="less(item1)"></span>
                        <span><input type="text" onkeyup=" if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g, '')}else{this.value=this.value.replace(/\D/g, '')} " onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g, '')}else{this.value=this.value.replace(/\D/g, '')} " :value="item1.buyNum"></span>
                        <span class="xd xd-tianjia" @click="add(item1)"></span>
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
    </div>
</template>

<script>
export default {
    created() {
        // console.log(this.$route.query.id)
        this.getTuijian();
        this.getCartlsit();
    },
    data() {
        return {
            counter: 1,      //个数
            msg: 0,          //全部商品
            recommend: '',  //热门商品的总数据
            items: [],       //商品数组
            monytotal: 0,    //去结算总金额
            totlePrice: 0,   //单件商品总额
            unitPrice: 0,  //单价
            willshow: 0,
        }
    },
    methods: {
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
                    this.msg = res.data.length;//总数
                    let data = res.data;
                    this.monytotal = 0;
                    data.forEach(function(item) {
                        item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                        let counter = item.buyNum;
                        let price = item.marketPrice;
                        item.marketPrice = this.fmtPrice(price);
                        this.monytotal += item.totalPrice //总钱数
                    }, this)
                    this.items = res.data;
                } else {
                    this.willshow = 0;
                }
            })
        },
        //数量操作
        // 加
        add(item1) {
            item1.buyNum += 1;
            // this.toto();
            this.$http.post(
                '/cart/set',
                {
                    id: item1.serviceId,
                    num: item1.buyNum
                }
            ).then((res) => {
                let status = res.status;
                if (status == 1) {
                    this.getCartlsit();
                } else {
                    alert("data.msg")
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 减
        less(item1) {
            if (item1.buyNum > 1) {
                item1.buyNum -= 1;
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
                        alert("data.msg")
                    }
                })
            } else {
                this.counter = 1;
                alert("数量不能为零！")
            }
        },
        // 删除事件
        del(item1) {
            var r = confirm("是否确认删除此商品？");
            if (r == true) {
                this.$http.post(
                    'cart/del',
                    {
                        id: item1.serviceId
                    }
                ).then((res) => {
                    if (res.status == 1) {
                        alert("删除成功！")
                        this.getCartlsit();
                    } else {
                        alert("删除失败！")
                    }
                });
            } else {
                alert("已取消删除！");
            }
        },
        reduces(arry) {
            arry.reduce((x, y) => { return x + y; })
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
                // console.log(res)
                if (res.status == 1) {
                    let dingdan = res.data;
                    this.$router.push({
                        path: '/pay',
                        query: { val: dingdan }
                    })
                } else {
                    alert(res.msg + "!")
                }
            })
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
        gotos() {
            this.$router.push({
                path: '/goodys',
                query: { id }
            })
        },
        //热门-传id、跳转页面
        showDetails(id) {
            // 跳转到页面顶层
            // router.afterEach((to, from, next) => {
            // window.scrollTo(0, 0);
            // });
            // console.log(id);
            this.$router.push({
                path: '/goods',
                query: { id }
            })
        }
    }
};
</script>

<style lang="less" scoped>
@import url('../../common/less/cart/cart.less');
</style>
