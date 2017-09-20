<template>
    <div>
        <div class="container">
            <div class="biaoti">
                <p>首页/公司注册</p>
            </div>
            <div class="xiangqing">
                <img src="./../../common/images/u1182.png" alt="">
                <div>
                    <p>注册分公司</p>
                    <p>营业执照+5个章(公章、财务章、人名章、发票章、合同章)</p>
                    <div>
                        <p>市场价:
                            <span>￥900.00</span>
                        </p>
                        <p>价&nbsp;&nbsp;&nbsp;格:
                            <span>￥800.00</span>元
                        </p>
                    </div>
                    <div>
                        <div>
                            <p>类&nbsp;&nbsp;&nbsp;型:</p>
                        </div>
                        <div>
                            <button class="bucai" v-on:click="greet">&nbsp;
                                <span>注册分公司</span>&nbsp;</button><br>
                            <button class="nicai" v-on:click="greet">&nbsp;
                                <span>注册分公司</span>&nbsp;</button>
                        </div>

                    </div>
                    <p>地区：</p>
                    <ul class="btn-numbox">
                        <li>
                            <span class="number">数量:</span>
                        </li>
                        <li>
                            <ul class="count">
                                <li>
                                    <span id="num-jian" class="num-jian" v-on:click="cai">-</span>
                                </li>
                                <li><input type="text" class="input-num" id="input-num" value="1" /></li>
                                <li>
                                    <span id="num-jia" class="num-jia" v-on:click="cai"> +</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div>
                    <div>
                        <p>顶级服务商</p>
                        <p>北京信达服务中心</p>
                        <a href="">马上咨询</a>
                    </div>
                    <div>
                        <a href="">查看服务商</a>
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
            <div id="xianshi1" v-show="index === 0">
                服务内容： 1.整理原始票据 2.记账 3.装订凭证 4.出报表 5.月报、季度企业所得税、年度汇算清缴 6.打印总帐、明晰账本
            </div>
            <div id="xianshi2" v-show="index === 1">
                显示2
            </div>
        </div>
    </div>
</template>

<script>

export default {
    created() {
        this.getnicai();
    },
    data() {
        show: true;
        return {
            index: 0,


        }
    },

    methods: {
        myhover(n) {
            this.index = n;
            
        },
        greet: function() {
            style.cssText = "";
        },
        cai: function() {
            var jia = document.getElementById("num-jia");
            var jian = document.getElementById("num-jian");
            var input_num = document.getElementById("input-num");
            jia.onclick = function() {

                input_num.value = parseInt(input_num.value) + 1;
            }
            jian.onclick = function() {

                if (input_num.value <= 1) {
                    input_num.value = 1;
                } else {

                    input_num.value = parseInt(input_num.value) - 1;
                }

            }
        },
        getnicai() {
            this.$http({
                method: 'post',
                url: '/product/package/detail',
                data: {
                    id: this.$route.query.id
                }
            }).then((result) => {
                // let data = result.data.hq;
                console.log(result);
                data.forEach(function(item) {
                    // item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
                    console.log(item);
                    // item.marketPrice = item.marketPrice + '.00'
                }, this);
                this.recommend = data;
            })
        },
    }
}
</script>

<style lang="less" scoped>
@import '../../common/less/global/cssreset.less';
@import '../../common/less/global/cssreset.less';
@import '../../common/less/goods/goods.less';
</style>