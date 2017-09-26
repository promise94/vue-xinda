<template>
    <div id="div_goods">
        <div class="container">
            <div class="biaoti">
                <p>首页/公司注册</p>
            </div>
            <div class="xiangqing">
                <img :src="img" alt="">
                <div>
                    <p>{{serviceName}}</p>
                    <p>{{serviceInfo}}</p>
                    <div>
                        <p>市场价:
                            <span>￥
                                <span>{{fmtPrice(shichang)}}</span>
                            </span>
                        </p>
                        <p>价&nbsp;&nbsp;&nbsp;格: ￥
                            <span>{{fmtPrice(xianjia)}}</span>元
                        </p>
                    </div>
                    <div>
                        <div>
                            <p>类&nbsp;&nbsp;&nbsp;型：</p>
                        </div>
                        <div>
                            <div class="bucai">
                                <p>
                                    <span>{{leixing}}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <p class="diqu">地&nbsp;&nbsp;&nbsp;区：
                        <span>{{datas.regionText}}</span>
                    </p>
                    <ul class="btn-numbox">
                        <span>购买数量：</span>
                        <li>
                            <ul class="count">
                                <li>
                                    <span id="num-jian" class="num-jian" v-on:click="cai(0)">-</span>
                                </li>
                                <li><input type="text" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')/1}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" v-model="numx" class="input-num" id="input-num" /></li>
                                <li>
                                    <span id="num-jia" class="num-jia" v-on:click="cai(1)"> +</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div>
                        <a href="#/cart" @click="jiarugouwuche()">立即购买</a>
                        <button @click="jiarugouwuche($event)">加入购物车</button>
                    </div>
                </div>
                <div>
                    <div>
                        <p>顶级服务商</p>
                        <p>北京信达服务中心</p>
                        <a href="javascript:void(0)" @click="tanchukuang()">马上咨询</a>
                    </div>
                    <div>
                        <a href="javascript:void(0)" @click="dianpu(id)">查看服务商</a>
                    </div>
                </div>
            </div>
            <div class="guanggao">
                <img src="./../../common/images/u1225.png" alt="">
            </div>
            <div class="pinglun">
                <div>
                    <div v-on:click="myhover(0)" :class="{yanse:index ===0}">
                        服务内容
                    </div>
                    <div v-on:click="myhover(1)" v-bind:class="{yanse:index ===1}">
                        商品评价
                    </div>
                </div>
            </div>
            <!-- 服务内容显示 -->
            <div id="xianshi1" v-show="index === 0" v-html="htmle">
                {{htmle}}
            </div>
            <!-- 评论显示 -->
            <div id="xianshi2" v-show="index === 1">
                <div>
                    <div>
                        0%
                    </div>
                    <div>
                        <div>
                            <p>好评(0%)</p>
                            <p>中评(0%)</p>
                            <p>差评(0%)</p>
                        </div>
                        <div>
                            <div>
                                <div>

                                </div>
                            </div>
                            <div>
                                <div>

                                </div>
                            </div>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <p>客户印象</p>
                        <p>暂无印象标签</p>
                    </div>
                </div>
                <div>
                    <div v-on:click="erjiyincang(0)" :class="{yanse1:indexer ===0}">全部评价(
                        <span>0</span>)</div>
                    <div v-on:click="erjiyincang(1)" v-bind:class="{yanse1:indexer ===1}">好评(0)</div>
                    <div v-on:click="erjiyincang(2)" v-bind:class="{yanse1:indexer ===2}">中评(0)</div>
                    <div v-on:click="erjiyincang(3)" v-bind:class="{yanse1:indexer ===3}">差评(0)</div>
                </div>
                <div id="pingjia" v-show="indexer === 0">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价</div>
                </div>
                <div id="pingjia" v-show="indexer === 1">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价</div>
                </div>
                <div id="pingjia" v-show="indexer === 2">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价</div>
                </div>
                <div id="pingjia" v-show="indexer === 3">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价</div>
                </div>
            </div>
        </div>
       
        <modal ref="name" class="dianhua">
            <div slot="header" class="header">
                <h3>免费电话咨询</h3>
            </div>
            <div slot="body">
                <input type="text"><br>
                <input type="text"><br>
                <input type="text"><br>
                <input type="text"><br>
            </div>
        </modal>

    </div>
</template>

<script>
import { mapActions } from 'vuex' //vuex的引入
import modal from '@/components/global/modal'; //弹出框引入
export default {
    name: 'div_goods',
    components: {
        modal,
    },
    created() {
        this.getnicai();
        // this.jiarugouwuche();
    },
    data() {
        show: true;
        return {
            modal_info: '',
            index: 0,
            indexer: 0,
            numx: 1,
            recommend: '',
            datas: '',
            htmle: '',
            img: '',
            shichang: '',
            xianjia: '',
            leixing: '',
            serviceName: '',
            serviceInfo: '',

            id: this.$route.query.id,
        }
    },
    methods: {
        ...mapActions(['cartAction']),
        myhover(n) {
            this.index = n;
        },
        erjiyincang(c) {
            this.indexer = c;
        },
        greet: function() {
            this.style.cssText = "";
        },
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        cai(n) {
            // console.log(n);
            if (n === 0) {
                this.numx === 1 ? '' : this.numx--;
                this.cartAction(this.numx);
            } else if (n === 1) {
                this.numx++;
                this.cartAction(this.numx);
            }
        },

        jiarugouwuche(ev) {
            // if ( this.$store.state.user === 'ture'){
            // this.$router.push({
            //     path: '/storeIndex',
            //     query: { id }
            // }),
            this.$http({
                method: 'post',
                url: '/cart/add',
                data: {
                    id: this.$route.query.id,
                    num: this.num,
                }
            }).then((res) => {
                // console.log(res);
                this.cartAction(this.num);
            })
            // } else {
            // console.log('cuowu');
            // }
            this.$root.eventHub.$emit('add',ev);
        },
        getnicai() {
            this.$http({
                method: 'post',
                url: '/product/package/detail',
                data: {
                    sId: this.$route.query.id,
                    //sId: '0cb85ec6b63b41fc8aa07133b6144ea3',
                }
            }).then((result) => {
                this.datas = result.data;
                this.img = 'http://115.182.107.203:8088/xinda/pic/' + result.data.product.img;
                this.htmle = result.data.providerProduct.serviceContent;
                this.shichang = result.data.product.marketPrice;
                this.xianjia = result.data.providerProduct.price;
                this.serviceName = result.data.providerProduct.serviceName;
                this.serviceInfo = result.data.providerProduct.serviceInfo;
                this.leixing = result.data.product.name;
                console.log(this.datas);
            })
        },
        dianpu(id) {
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            }),
                this.$router.push({
                    path: '/storeIndex',
                    query: { id }
                }),
                console.log(id);
        },
        tanchukuang() {
            this.modal_info = '请选择其他支付方式';
            this.$refs.name.confirm().then(() => {
                this.$refs.name.show = false;
            }).catch(() => {
                // 取消回掉函数
            })
        }
    }
}
</script>

<style lang="less" >
@import '../../common/less/global/cssreset.less';
@import '../../common/less/global/cssreset.less';
@import '../../common/less/goods/goods.less';


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