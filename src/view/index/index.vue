<template>
    <div v-loading.body="loading" element-loading-text="拼命加载中">
        <div id="lunbo">
            <swipe class="my-swipe" :auto="4000">
                <swipe-item class="slide1">
                    <img src="./../../../static/images/1.jpg">
                </swipe-item>
                <swipe-item class="slide2">
                    <img src="./../../../static/images/2.jpg">
                </swipe-item>
                <swipe-item class="slide3">
                    <img src="./../../../static/images/3.jpg">
                </swipe-item>
                <swipe-item class="slide4">
                    <img src="./../../../static/images/4.jpg">
                </swipe-item>
                <swipe-item class="slide5">
                    <img src="./../../../static/images/5.jpg">
                </swipe-item>
            </swipe>
        </div>
        <div class="biaoti">
            <p>明星产品推荐</p>
            <div class="arrows"></div>
        </div>
        <div class="mingxing" v-loading.body="loading1" element-loading-text="拼命加载中">
            <a href="#/services" v-for="(i,k) of hehe" :key="k">
                <div>
                    <div>
                        <img :src=" i.providerImg " alt="">
                    </div>
                    <p>{{i.serviceName}}</p>
                    <p>{{i.serviceInfo}}</p>
                    <p>
                        <span>{{fmtPrice(i.price)}}</span>
                        <span>{{i.unit}}</span>
                    </p>
                </div>
            </a>
        </div>
        <div class="biaoti">
            <p>初创企业必备</p>
            <div class="arrows"></div>
        </div>
        <div class="chuchuang">
            <div v-for="(item,k) of recommend" :key="k" v-loading.body="loading2" element-loading-text="拼命加载中">
                <div>
                    <img :src="item.providerImg" alt="">
                </div>
                <p> {{item.serviceName}}</p>
                <p> {{item.serviceInfo}} </p>
                <p>
                    <span> {{fmtPrice(item.price)}}</span> 元</p>
                <a href="javascript:void(0)" @click="showDetails(item.id)">查看详情</a>
            </div>
        </div>
        <div class="biaoti">
            <p>知识产权</p>
            <div class="arrows"></div>
        </div>
        <div class="zhishi">
            <div>
                <div>
                    <img src="./../../../static/images/u82.png" alt="">
                </div>
                <div>
                    <div>
                        <img src="./../../../static/images/u84.png" alt="">
                        <img src="./../../../static/images/u86.png" alt="">
                    </div>
                    <div>
                        <img src="./../../../static/images/u88.png" alt="">
                    </div>
                </div>
            </div>
            <div>
                <img src="./../../../static/images/u100.png" alt="">
            </div>
        </div>
        <div class="biaoti">
            <p>推荐服务商</p>
            <div class="arrows"></div>
        </div>
        <div class="fuwu">
            <div v-for="(item,k) of haha" :key="k" v-loading.body="loading3" element-loading-text="拼命加载中">
                <div>
                    <img :src="item.providerImg" alt="">
                </div>
                <p>{{item.providerName}}</p>
                <p>服务指数：8.9分</p>
                <p>提供的服务</p>
                <div>
                    <div>
                        <a href="javascript:void(0)" @click="dianpu(item.id)">
                            {{item.products.split(',')[0]}}
                        </a>
                    </div>
                    <div>
                        <a href="javascript:void(0)" @click="dianpu(item.id)">
                            {{item.products.split(',')[1]}}
                        </a>
                    </div>
                    <div>
                        <a href="javascript:void(0)" @click="dianpu(item.id)">
                            {{item.products.split(',')[2]}}
                        </a>
                    </div>
                    <div>
                        <a href="javascript:void(0)" @click="dianpu(item.id)">
                            {{item.products.split(',')[3]}}
                        </a>
                    </div>
                </div>
            </div>

        </div>
        <div class="biaoti">
            <p>合作伙伴</p>
            <div class="arrows"></div>
        </div>
        <div class="huoban">
            <img src="./../../common/images/u246.png" alt="">
        </div>
    </div>
</template>

<script>
import {Swipe,SwipeItem} from 'mint-ui';
export default {
    created() {
        this.getnicai();
        this.getbucai();
        this.mingxing();
    },
    components: {
    swipe: Swipe,
    swipeItem: SwipeItem
  },
    data() {
        return {
            loading:true,
            loading1:true,
            loading2:true,
            loading3:true,
            recommend: '',
            haha: '',
            hehe: '',
        }
    },

    methods: {
        
        
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        myhover(n) {
            this.index = n;
        },
        getnicai() {
            this.$http({
                method: 'post',
                url: '/recommend/list',
                data: {
                }
            }).then((result) => {
                this.loading =false;
                this.loading2 = false;
                let data = result.data.hq;
                data.forEach(function(item) {
                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    item.marketPrice = item.marketPrice + '.00'
                }, this);
                this.recommend = data;
            })
        },
        getbucai() {
            this.$http({
                method: 'post',
                url: '/recommend/list',
                data: {
                }
            }).then((shenme) => {
                this.loading = false;
                this.loading3 = false;
                let data = shenme.data.provider;
                data.forEach(function(item) {
                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    item.marketPrice = item.marketPrice + '.00'
                }, this);
                this.haha = data;
            })
        },
        mingxing() {
            this.$http({
                method: 'post',
                url: '/recommend/list',
                data: {
                }
            }).then((shenme) => {
                this.loading = false;
                this.loading1 = false;
                let data = shenme.data.product;
                data.forEach(function(i) {
                    i.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + i.providerImg;
                    i.marketPrice = i.marketPrice + '.00'
                }, this);
                this.hehe = data;
            })
        },
        showDetails(id) {
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            }),
                this.$router.push({
                    path: '/goods',
                    query: { id }
                }),
                console.log(id);
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
    }
}

</script>
<style lang="less" scoped>
@import '../../common/less/index/index.less';
@import '../../common/less/global/cssreset.less';

.my-swipe {
    width: 1200px;
    height: 402px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
