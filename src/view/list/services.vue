<template>
    <div class="middle">
        <div class="middle-two">
            <div class="content">
                <div class="content-top">
                    <p>首页&nbsp;/&nbsp;纳税服务</p>
                </div>
                <div class="content-center">
                    <div class="search">
                        <div class="search-one">
                            <div>
                                <h3>服务分类</h3>
                            </div>
                            <div class="search-a">
                                <span @click="lover(1)" :class="{all: oyoun ===1}">代理记账</span>
                                <span @click="lover(2)" :class="{all: oyoun ===2}">税务代办</span>
                                <span @click="lover(3)" :class="{all: oyoun ===3}">审计报告</span>
                            </div>
                        </div>
                        <div class="search-two">
                            <div>
                                <h3>类型</h3>
                            </div>
                            <div class="search-b">
                                <span @click="love(1)" :class="{all: oyou ===1}">小规模记账</span>
                                <span @click="love(2)" :class="{all: oyou ===2}">一般纳税人记账</span>
                            </div>
                        </div>
                        <div class="search-three">
                            <div>
                                <h3>服务区域</h3>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div class="ball">
                            <ul>
                                <li @click="loverd(1)" :class="{all: oyo ===1}">综合排序</li>
                                <li  @click="loverd(2)" :class="{all: oyo ===2}">
                                    <span>价格&nbsp;↑↓</span>
                                </li>
                            </ul>
                        </div>
                        <div class="ball-one">
                            <ul>
                                <li>商品</li>
                                <li>价格</li>
                            </ul>
                        </div>
                        <div class="ball-two" v-for="(item,k) of recommend" :key="k">
                            <img :src="item.providerImg" alt="">
                            <div class="ball-left">
                                <p>{{item.serviceName}}</p>
                                <p>{{item.serviceInfo}}</p>
                                <span>{{item.providerName}}</span>
                                <span>{{item.regionName}}</span>
                            </div>
                            <div class="ball-right">
                                <p>￥&nbsp;{{item.price}}</p>
                                <div>
                                    <a>立即购买</a>
                                    <a>加入购物车</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="picture">
                <img src="../../common/images/uu.png" alt="">
            </div>
        </div>
        <div class="middle-three">
            <div>
                <p>上一页</p>
                <p class="alone">1</p>
                <p>下一页</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.fack()
    },
    data() {
        return {
            recommend: '',
            oyoun: 1,
            oyou:1,
            oyo:1,
        }
    },
    methods: {
         //服务分类
        lover(n) {
            this.oyoun = n;
        },
        //类型
        love(m) {
            // console.log("000",m)
            this.oyou = m;
        },
        //综合排序
        loverd(c){
            this.oyo = c;
        },
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        fack() {
            this.$http({
                method: 'post',
                url: '/product/package/grid',
                data: {
                    start: 0,
                    limit: 8,
                    productTypeCode: "1",
                    // productId: "8a82f52b674543e298d2e5f685946e6e",
                    sort: 1,
                }
            }).then((you) => {
                let data = you.data;
                data.forEach(function(item) {
                    let price = item.price;
                    item.price = this.fmtPrice(price);
                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                }, this);
                this.recommend = data;
                console.log(you);
            })
        }
    }
}
</script>

<style lang="less">
@import './../../common/less/store/services.less';
    div{
        >p{
            color:black;
        }
    }
    .daohang{
        .yincang{
            display: none;
        }
        &:hover{
            .yincang{
                display: block;
            }
        }
        
    }
</style>