<template>
    <div>
        <div id="lunbo">
            <swiper :options="swiperOption" ref="mySwiper">
                <!-- 这部分放你要渲染的那些内容 -->
                <swiper-slide v-for="(imgs,imgval) in imgChange" :key="imgval">
                    <img :src="imgs" alt="">
                </swiper-slide>
                <!-- 这是轮播的小圆点 -->
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="biaoti">
            <p>明星产品推荐</p>
            <div class="arrows"></div>
        </div>
        <div class="mingxing">
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
            <div v-for="(item,k) of recommend" :key="k">
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
            <div v-for="(item,k) of haha" :key="k">
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
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
    // props: ['listImg'],
    created() {
        this.getnicai();
        this.getbucai();
        this.mingxing();
    },
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            index: 0,
            recommend: '',
            haha: '',
            hehe: '',
            // providerImg:'',
            // marketPrice: '',

            imgChange: [
                '../../../static/images/1.jpg',
                '../../../static/images/3.jpg',
                '../../../static/images/2.jpg',
                '../../../static/images/4.jpg',
                '../../../static/images/5.jpg'
            ],
            swiperSlide: [1, 2, 3, 4, 5],
            swiperOption: {
                pagination: '.swiper-pagination',
                slidesPerView: 'auto',
                paginationClickable: true,
                autoplay: 3000,
                loop: true,
            },

        }
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        //这边就可以使用swiper这个对象去使用swiper官网中的那些方法  
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
                let data = result.data.hq;
                data.forEach(function(item) {
                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    // console.log(item.providerImg);
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
                let data = shenme.data.provider;
                // console.log(shenme);
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
                let data = shenme.data.product;
                // console.log(data);
                data.forEach(function(i) {
                    i.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + i.providerImg;
                    i.marketPrice = i.marketPrice + '.00'
                    // console.log(providerImg);
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
            // this.$router.afterEach((to, from, next) => {
            //     window.scrollTo(0, 0);
            // }),
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

#lunbo {
    width: 1200px;
    height: 402px;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
