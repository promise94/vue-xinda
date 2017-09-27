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
                                <span @click="serverMenu(item.code,item.itemList)" :class="{all: oyoun ===item.code}" v-for="item of fuwu.itemList">
                                    {{item.name}}</span>
                            </div>
                        </div>
                        <div class="search-two">
                            <div>
                                <p>类型</p>
                            </div>
                            <div class="search-b">
                                <span @click="love(n,item.id)" :class="{all:oyou==n}" v-for="(item,k,n) of itemList">{{item.name}}</span>
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
                                    <a href="#/cart" @click="edward(item.id)">立即购买</a>
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
    created() {
        this.fack('', 4);
        this.mm();
    },
    data() {
        return {
            recommend: '',
            oyoun: 4,
            oyou: -1,
            oyo: 1,
            fuwu: '',
            arr: '',
            itemList: '',
            code: 2,
        }
    },

    name: 'sifco',

    //城市三级联动
    components: {
        province,
    },
    methods: {
        //城市三级联动
        getProv(pro) {
            if (pro !== "") {
                // console.log(pro);
                this.regionId = pro[2].code;
                this.fack();
            } else {
                this.regionId = "";
                this.fack();
            }

        },

        //跳转页面
        shoid(id) {
            // console.log(id),
            this.$router.push({
                path: '/goods',
                query: { id }
            })
        },

        //服务分类
        serverMenu(n, m) {
            this.itemList = m;
            this.oyoun = n;
            this.fack('', n);
        },
        //类型
        love(k, id) {
            this.fack(id);
            this.oyou = k;
        },

        //综合排序
        lov(c) {
            this.oyo = c;
        },
        //商品获取
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        fack(id, code) {
            this.$http({
                method: 'post',
                url: '/product/package/grid',
                data: {
                    start: 0,
                    limit: 8,
                    productTypeCode: code ? code : '',
                    productId: id ? id : '',
                    sort: 1,
                }
            }).then((you) => {
                let data = you.data;
                data.forEach(function(item) {
                    let price = item.price;
                    item.price = this.fmtPrice(price);
                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    this.arr = item.itemList;

                }, this);
                this.recommend = data;


            })


        },
        //公司注册
        mm() {
            this.$http({
                method: 'post',
                url: '/product/style/list',
                data: {

                }
            }).then((you) => {
                this.fuwu = Object.values(you.data)[2];
                this.itemList = Object.values(this.fuwu.itemList)[0].itemList;
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
            })
        },
    }
}
</script>

<style lang="less">
@import './../../common/less/store/sifco.less';
</style>