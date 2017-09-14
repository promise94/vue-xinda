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
            <div>
                <div>

                </div>
                <p>商标快速注册通道</p>
                <p>工作日内5个小时提交申报，次日拿到申请号， 商标注册进度系统实时</p>
                <p>
                    <span>￥1400.00</span> 元</p>
                <a href="#">查看详情</a>
            </div>
            <div>
                <div>

                </div>
                <p>商标快速注册通道</p>
                <p>工作日内5个小时提交申报，次日拿到申请号， 商标注册进度系统实时</p>
                <p>
                    <span>￥1400.00</span> 元</p>
                <a href="#">查看详情</a>
            </div>
            <div>
                <div>

                </div>
                <p>商标快速注册通道</p>
                <p>工作日内5个小时提交申报，次日拿到申请号， 商标注册进度系统实时</p>
                <p>
                    <span>￥1400.00</span> 元</p>
                <a href="#">查看详情</a>
            </div>
            <div>
                <div>

                </div>
                <p>商标快速注册通道</p>
                <p>工作日内5个小时提交申报，次日拿到申请号， 商标注册进度系统实时</p>
                <p>
                    <span>￥1400.00</span> 元</p>
                <a href="#">查看详情</a>
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
    data() {
        return {
            index: 0,

        }
    },
    methods: {
        myhover(n) {
            console.log(this.index = n);
        }
    }
};
</script>
<style lang="less" scoped>
@import '../../common/less/index/index.less';
@import '../../common/less/global/cssreset.less';
</style>
