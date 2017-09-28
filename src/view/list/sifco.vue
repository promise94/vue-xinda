<template>
    <div class="middle" id="sifco">
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
                    <div class="content-bottom" v-if="list.length !=0">
                        <div class="ball">
                            <ul>
                                <li @click="lov('')" :class="{all: oyo ===''}">综合排序</li>
                                <li @click="lov(2),paixu(n)" :class="{all: oyo ===2}">
                                    <span>价格&nbsp;
                                        <i class="xd xd-paixu"></i>
                                    </span>
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
                    <div class="middle-three" v-if="list.length !=0">
                        <v-page @page="titles" :amount="count" :limit="limit"></v-page>
                    </div>
                    <nothing title="未能搜索到该区域的商品" v-if="list.length ==0"></nothing>
                </div>
            </div>
            <div class="picture">
                <img src="../../common/images/uu.png" alt="">
            </div>
        </div>

    </div>
</template>

<script>
import nothing from '../../components/global/nothing.vue'//引用没有数据时显示的nothing
import province from '../../components/global/province';//引用省市区组件
import vPage from '@/components/global/page';//引用分页组件
export default {

    name: 'sifco',

    created() {
        this.fack('', 4);
        this.mm();
    },
    data() {
        return {
            recommend: '',
            oyoun: 4,
            oyou: -1,
            oyo: '',
            fuwu: '',
            arr: '',
            itemList: '',
            code: 2,
            regionId: '', //省市区地址区号
            count: '',
            limit: 8,
            start: 0,
            sort: 1,
            n: 2,

        }
    },

    //城市三级联动
    components: {
        province,
        nothing,
        vPage,
    },

    //省市区选择商品
    computed: {
        list() {
            let list = [];
            if (this.recommend) {
                if (!this.regionId) {
                    return this.recommend;
                }
                this.recommend.forEach((item) => {
                    if (item.regionId == this.regionId) {
                        list.push(item);
                    }
                });
            }
            return list;
        }
    },
    methods: {
        //城市三级联动
        getProv(pro) {
            if (pro !== "") {
                this.regionId = pro[2].code;
            } else {
                this.regionId = "";
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
            // this.sort = c;
            // this.fack('', 4);
        },
        paixu(n) {
            if (n == 2) {
                this.n = 3;
                this.sort = 2;
                this.fack('', 4);
            }else{
                this.n = 2;
                this.sort = 3;
                this.fack('',4);
            }
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
                    start: this.start,
                    limit: this.limit,
                    productTypeCode: code ? code : '',
                    productId: id ? id : '',
                    sort: this.sort,
                }
            }).then((you) => {
                this.count = you.totalCount;
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
        //调取自定义分页函数
        titles(n) {
            this.start = n;
            this.fack('', 4);
        }
    }
}
</script>

<style lang="less">
@import './../../common/less/store/sifco.less';
</style>