<template>
    <div>
        <div id="lunbo">
            <div class="daohang">
                <div v-on:mouseenter="myhover(0)">
                    <i class="xd xd-shui"></i>
                    <div class="nicai">
                        <a href="">财税服务</a><br>
                        <a href="">代理记账</a>
                        <a href="">税务代办</a><br>
                        <a href="">审计报告</a>
                    </div>

                </div>
                <div v-on:mouseenter="myhover(1)">
                    <i class="xd xd-dendrogram"></i>
                    <div class="nicai">
                        <a href="">财税服务</a><br>
                        <a href="">代理记账</a>
                        <a href="">税务代办</a><br>
                        <a href="">审计报告</a>
                    </div>

                </div>
                <div v-on:mouseenter="myhover(2)">
                    <i class="xd xd-zhishichanquan-copy"></i>
                    <div class="nicai">
                        <a href="">财税服务</a><br>
                        <a href="">代理记账</a>
                        <a href="">税务代办</a><br>
                        <a href="">审计报告</a>
                    </div>

                </div>
                <div v-on:mouseenter="myhover(3)">
                    <i class="xd xd-shebao"></i>
                    <div class="nicai">
                        <a href="">财税服务</a><br>
                        <a href="">代理记账</a>
                        <a href="">税务代办</a><br>
                        <a href="">审计报告</a>
                    </div>

                </div>
            </div>
            <div id="yincang">
                <div v-show="index === 0"></div>
                <div v-show="index === 1"></div>
                <div v-show="index === 2"></div>
                <div v-show="index === 3"></div>
            </div>
        </div>
        <div class="biaoti">
            <p>明星产品推荐</p>
            <div class="arrows"></div>
        </div>
        <div class="mingxing">
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
            <div>

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
                <p> {{item.providerName}}</p>
                <p> {{item.serviceInfo}} </p>
                <p>
                    <span> {{fmtPrice(item.price)}}</span> 元</p>
                <a href="#/goods" @click="showDetails(item.id)">查看详情</a>
            </div>
        </div>
        <div class="biaoti">
            <p>知识产权</p>
            <div class="arrows"></div>
        </div>
        <div class="zhishi">
            <div>
                <div>
                    <img src="./../../common/images/u82.png" alt="">
                </div>
                <div>
                    <div>
                        <img src="./../../common/images/u84.png" alt="">
                        <img src="./../../common/images/u86.png" alt="">
                    </div>
                    <div>
                        <img src="./../../common/images/u88.png" alt="">
                    </div>
                </div>
            </div>
            <div>
                <img src="./../../common/images/u100.png" alt="">
            </div>
        </div>
        <div class="biaoti">
            <p>推荐服务商</p>
            <div class="arrows"></div>
        </div>
        <div class="fuwu">
            <div>
                <div>

                </div>
                <p>北京广大知识代理</p>
                <p>服务指数：8.9分</p>
                <p>提供的服务</p>
                <div>
                    <div>
                        <a href="">
                            你踩踩踩踩asdasdasdasd
                        </a>
                    </div>
                    <div>
                        <a href="">
                            你踩踩踩踩asdasdasdasd
                        </a>
                    </div>
                    <div>
                        <a href="">
                            你踩踩踩踩asdasdasdasd
                        </a>
                    </div>
                    <div>
                        <a href="">
                            你踩踩踩踩asdasdasdasd
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
export default {

    created() {
        this.getnicai();
        this.getbucai();
    },
    data() {
        return {
            index: 0,
            recommend: '',
        }
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
                    console.log(item.providerImg);
                    item.marketPrice = item.marketPrice + '.00'
                }, this);
                this.recommend = data;
            })
        },
        getbucai() {
            this.$http({
                method: 'post',
                url: '/provider/search-grid',
                data: {
                    start: 0,
                    limit: 8,
                    productTypeCode: 7,
                    regionId: 110105
                }
            }).then((shenme) => {
                let data = shenme;
                console.log(data);
                data.forEach(function(item) {

                    item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    // console.log(item.providerImg);
                    item.marketPrice = item.marketPrice + '.00'
                }, this);
                this.recommend = data;
            })
        },
        showDetails(id) {
            this.$router.push({
                path: '/goods',
                query: { id }

            }),
                console.log(id);
        }
    }
};
</script>
<style lang="less" scoped>
@import '../../common/less/index/index.less';
@import '../../common/less/global/cssreset.less';
</style>
