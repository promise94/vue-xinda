<template>
    <div class="middle">
        <div class="middle-two">
            <div class="content">
                <div class="content-top">
                    <p>首页&nbsp;/&nbsp;公司工商</p>
                </div>
                <div class="content-center">
                    <div class="search">
                        <div class="search-one">
                            <div>
                                <p>服务分类</p>
                            </div>
                            <div class="search-a">
                                <span @click="lover(1)" :class="{all: oyoun ===1}">公司注册</span>
                                <span @click="lover(2)" :class="{all: oyoun ===2}">注册变更</span>
                            </div>
                        </div>
                        <div class="search-two">
                            <div>
                                <p>类型</p>
                            </div>
                            <div class="search-b">
                                <span @click="love(1)" :class="{all: oyou ===1}">分公司注册</span>
                                <span @click="love(2)" :class="{all: oyou ===2}">公司注册地址</span>
                                <span @click="love(3)" :class="{all: oyou ===3}">合伙企业注册</span>
                                <span @click="love(4)" :class="{all: oyou ===4}">外商独资公司注册</span>
                                <span @click="love(5)" :class="{all: oyou ===5}">VIE架构</span>
                                <span @click="love(6)" :class="{all: oyou ===6}">股份公司注册</span>
                                <span @click="love(7)" :class="{all: oyou ===7}">有限责任公司注册</span>
                                <span @click="love(8)" :class="{all: oyou ===8}">一般纳税注册地址</span>
                            </div>
                        </div>
                        <div class="search-three">
                            <div class="serve">
                                <p>服务区域</p>
                            </div>
                            <div class="city">
                                <province @province="getProv"></province>
                            </div>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div class="ball">
                            <ul>
                                <li @click="lov(1)" :class="{all: oyo ===1}">综合排序</li>
                                <li @click="lov(2)" :class="{all: oyo ===2}">
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
                            <img :src="item.providerImg" @click="shoid(item.id)" alt="">
                            <div class="ball-left">
                                <a @click="shoid(item.id)" href="javascript:viod:(0)">{{item.serviceName}}</a>
                                <p>{{item.serviceInfo}}</p>
                                <span>{{item.providerName}}</span>
                                <span class="jianju">{{item.regionName}}</span>
                            </div>
                            <div class="ball-right">
                                <p>￥&nbsp;{{item.price}}</p>
                                <div>
                                    <a href="javascript:viod:(0)" @click="shod(item.id)">立即购买</a>
                                    <a @click="edward(item.id)">加入购物车</a>
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
import province from '../../components/global/province';
export default {
    name: 'sifco',
    created() {
        this.fack();
        // console.log(this.$route.query.id)
    },
    data() {
        return {
            recommend: '',
            oyoun: 1,
            oyou: 1,
            oyo: 1,
        }
    },
    //城市三级联动
    components: {
        province,
    },
    methods: {
        //城市三级联动
        getProv(pro) {

        },

        //跳转页面
        shoid(id) {
            console.log(id),
                this.$router.push({
                    path: '/goods',
                    query: { id }
                })
        },

        //跳转到购物车
        shod(id) {
            console.log(id),
                this.$router.push({
                    path: '/cart',
                    query: { id }
                })
        },

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
        lov(c) {
            this.oyo = c;
        },
        //商品获取
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
                console.log(you)
            })
        },

        //产品列表接口 切换价格排序
        ball() {
            this.$http({
                method: 'post',
                url: '/product/package/grid',
                pdata: {
                    start: 0,
                    limit: 8,
                    productTypeCode: "1",
                    productId: "8a82f52b674543e298d2e5f685946e6e",
                    sort: 2,
                }
            }).then((qwe) => {
                console.log("oyoy",qwe)
            })
        },

        //购物车接口
        edward(addCarId) {
            this.$http({
                method: 'post',
                url: '/cart/add',
                data: {
                    id: addCarId,
                    num: 1,
                }
            }).then((ward) => {
                let data = ward.data;
                console.log('sadasd', ward)
                // data.
            })
        },
    }
}
</script>

<style lang="less">
@import './../../common/less/store/sifco.less';
</style>