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
            <div>
                <div>
                    <img src="" alt="">
                    <p>标准五险一金</p>
                    <p>定制化社保代理</p>
                    <p>
                        <span>20</span>
                        <span>元/人/月</span>
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <img src="" alt="">
                    <p>标准五险一金</p>
                    <p>定制化社保代理</p>
                    <p>
                        <span>20</span>
                        <span>元/人/月</span>
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <img src="" alt="">
                    <p>标准五险一金</p>
                    <p>定制化社保代理</p>
                    <p>
                        <span>20</span>
                        <span>元/人/月</span>
                    </p>
                </div>
            </div>
            <div>
                <div>
                    <img src="" alt="">
                    <p>标准五险一金</p>
                    <p>定制化社保代理</p>
                    <p>
                        <span>20</span>
                        <span>元/人/月</span>
                    </p>
                </div>
            </div>
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
        // this.mingxing();
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
            // mignxing: '',

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
            console.log(this.index = n);
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
        // mingxing() {
        //     this.$http({
        //         method: 'post',
        //         url: '/product/package/grid',
        //         data: {
        //             tart: 0,
        //             limit: 8,
        //             productTypeCode: "1",
        //             productId: "8a82f52b674543e298d2e5f685946e6e",
        //             sort: 2,
        //         }
        //     }).then((shenme) => {
        //         let data = shenme.data;
        //         console.log(data);
        //         data.forEach(function(item) {

        //             item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;

        //             item.marketPrice = item.marketPrice + '.00'
        //         }, this);
        //         this.mingxing = data;
        //     })
        // },
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
        }
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
