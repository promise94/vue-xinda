<template>
    <div class="middle" id="services">
        <div class="middle-two">
            <div class="content">
                <div class="content-top">
                    <p>首页&nbsp;/&nbsp;财税服务</p>
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
                                <li @click="loverd(1)" :class="{all: oyo ===1}">综合排序</li>
                                <li @click="loverd(2),paixu(n)" :class="{all: oyo ===2}">
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
                        <div class="ball-two" v-for="(item,k) of list" :key="k">
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
                                    <a @click="edward(item.id)" href="javascript:viod:(0)">加入购物车</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="middle-three" v-if="list.length !=0">
                        <v-page @page="titles" :amount="count" :limit="limit"></v-page>
                    </div>
                    <nothing title="未能搜索到该区域的商品" v-if="list.length == 0"></nothing>

                </div>
            </div>
            <div class="picture">
                <img src="../../common/images/uu.png" alt="">
            </div>
            <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert"></v-alert>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';//vuex的引入
import vAlert from '@/components/global/alert';
import nothing from '../../components/global/nothing.vue'//引用没有数据时显示的nothing
import province from '../../components/global/province';//引用省市区组件
import vPage from '@/components/global/page';//引用分页组件
export default {
    name: 'services',
    created() {
        this.fack('', 3);
        this.mm()
    },
    data() {
        return {
            recommend: '',
            oyoun: 3,
            oyou: -1,
            oyo: 1,
            arr: '',
            fuwu: '',
            itemList: '',
            code: 4,
            regionId: '', //省市区地址区号
            count: '',
            limit: 8,
            start: 0,
            sort: 1,
            n: 2,
            info: { phoneInfo: '', captInfo: '', msgInfo: '', pwdInfo: '', SecondInfo: '' }, // 提示信息
            type: { phoneType: '', captType: '', msgType: '', pwdType: '', SecondType: '' }, // 提示类型
            alert_options: { type: 'success', info: '' }, // 提示框设置
        }
    },

    //城市三级联动
    components: {
        province,
        nothing,
        vPage,
        vAlert,
    },
    computed: {
        ...mapActions(['cartAction']),
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

        //跳转到商品页面
        shoid(id) {
            this.$router.push({
                path: '/goods',
                query: { id }
            })
        },

        //加入购物车
        edward(addCarId) {
            this.$http({
                method: 'post',
                url: '/cart/add',
                data: {
                    id: addCarId,
                    num: 1,
                }
            }).then((ward) => {
                // 操作成功弹出框
                this.alert_options.info = ward.msg;
                this.alert_options.type = 'success';
                this.$refs.alert.alert();
                this.$store.dispatch('cartAction');
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
        loverd(c) {
            this.oyo = c;
        },
        paixu(n) {
            if (n == 2) {
                this.n = 3;
                this.sort = 2;
                this.fack('', 3);
            } else {
                this.n = 2;
                this.sort = 3;
                this.fack('', 3);
            }
        },

        //调取自定义分页函数
        titles(n) {
            this.start = n;
            this.fack('', 4);
        },

        //获取数据
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
                    sort: this.sort,
                }
            }).then((you) => {
                let data = you.data;
                this.count = you.totalCount;
                data.forEach(function(item) {
                    let price = item.price;
                    item.price = this.fmtPrice(price);
                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    this.arr = item.itemList;
                }, this);
                this.recommend = data;
            })
        },

        //服务分类，类型
        mm() {
            this.$http({
                method: 'post',
                url: '/product/style/list',
                data: {

                }
            }).then((you) => {
                this.fuwu = Object.values(you.data)[1];
                this.itemList = Object.values(this.fuwu.itemList)[0].itemList;
            })
        },
    }
}
</script>

<style lang="less">
@import './../../common/less/store/services.less';
div {
    >p {
        color: black;
    }
}

.quanbuchanpin {
    .yincang {
        display: none;
    }
    &:hover {
        .yincang {
            display: block;
        }
    }
}
</style>