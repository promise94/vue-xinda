<template>
    <div class="middle">
        <div class="middle-two">
            <div class="content">
                <div class="content-top">
                    <p>首页/公司工商</p>
                </div>
                <div class="content-center">
                    <div class="search">
                        <div>
                            <h3>服务分类</h3>
                            <ul class="search-one">
                                <li @click="clicke">公司注册</li>
                                <li @click="clicke">注册变更</li>
                            </ul>
                        </div>
                        <div class="search-two">
                            <div>
                                <h3>类型</h3>
                            </div>
                            <ul>
                                <li @click="unfold">分公司注册</li>
                                <li @click="unfold">公司注册地址</li>
                                <li @click="unfold">合伙企业注册</li>
                                <li @click="unfold">外商独资公司注册</li>
                                <li @click="unfold">VIE架构</li>
                                <li @click="unfold">股份公司注册</li>
                                <li @click="unfold">有限责任公司注册</li><br/>
                                <li @click="unfold">一般纳税注册地址</li>
                            </ul>
                        </div>
                        <div class="">
                            <h3>服务区域</h3>
                            <ul class="search-one">

                            </ul>
                        </div>
                    </div>
                </div>
                <div class="content-bottom">
                    <div class="ball">
                        <ul>
                            <li>综合排序</li>
                            <span>
                                <li>价格</li>
                                <p>↑↓</p>
                            </span>
                        </ul>
                    </div>
                    <div class="ball-one">
                        <ul>
                            <li>商品</li>
                            <li>价格</li>
                        </ul>
                    </div>
                    <div class="ball-two">
                        <ul class="bell" id="commodity">
                            <div>
                                <img src="../../common/images/logo.png" alt="">
                            </div>
                            <ul>
                                <li class="fang-one">注册分公司</li>
                                <li class="fang-two">营业执照+5章（公章，财务章，人名章，发票章，合同章）</li>
                                <ul class="fack">
                                    <li>信达北京服务中心</li>
                                    <li>北京-北京市-朝阳区</li>
                                </ul>
                            </ul>
                        </ul>
                        <div class="bead-two">
                            <div>
                                <p>￥&nbsp;800.00</p>
                            </div>
                            <ul>
                                <a href="pay.vue">立即购买</a>
                                <a>加入购物车</a>
                            </ul>
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
// var company = new Vue({
//     el: '.ball-two',
//     data: {
//         start: 0,
//         limit: 8,
//         productTypeCode: "1",
//         productId: "8a82f52b674543e298d2e5f685946e6e",
//         sort: 2
//     },
//     created: function() {
//         var url = "/product/package/grid";
//         this.$http.get(url).then(function(data) {
//             var json = data.body;
//             this.data = eval("(" + json + ")");
//         })
//     }
// });
//  new Vue({
//         el: '.serch-one',
//         data: {
//           message: ' '
//         },
//         methods: {
//           say: function(msg, event) { 
//             //获取点击对象   
//             var el = event.currentTarget;
//             var clicke = $(el).next().text();
//             alert(" "+$(el).text()+"background-color:#2693d4; "+clicke);
//           }
//         }
//       })
export default {
    data() {
        return {

        }
    }
}
</script>

<style lang="less">
.middle {
    width: 1200px;
    margin: 26px auto;
    .middle-two {
        display: flex;
        justify-content: space-between;
    }
    .content {
        width: 948px;
        .content-top {
            width: 948px;
            height: 0;
            >p {
                font-size: 16px;
                color: #434343;
            }
        }
        .content-center {
            margin-top: 24px;
            .search {
                height: 162px;
                background-color: #f7f7f7;
                >div {
                    display: flex;
                    .search-one {
                        display: flex;
                        border-left: 0;
                        >li {
                            line-height: 41px;
                            margin: 3px 10px;
                        }
                    }
                    >h3 {
                        width: 98px;
                        font-size: 16px;
                        text-align: center;
                        line-height: 40px;
                        border-right: 0;
                        border: 1px solid #ccc;
                    }
                    >ul {
                        width: 849px;
                        height: 40px;
                        border: 1px solid #ccc;
                        >li {
                             width: 80px;
                            height: 35px;
                            color: white;
                            text-align: center;
                            border-radius: 12px;
                            background-color: #2693d4;
                            font-size: 13px;
                        }
                    }
                }
                .search-two {
                    width: 946px;
                    border-left: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    >div {
                        width: 98px;
                        font-size: 16px;
                        text-align: center;
                        line-height: 80px;
                    }
                    >ul {
                        height: 80px;
                        border-right: 0;
                        border-top: 0;
                        border-bottom: 0;
                        display: flex;
                        >li {
                            line-height: 40px;
                            margin: 25px 10px;
                        }
                    }
                }
            }
        }
        .content-bottom {
            width: 948px;
            margin-top: 23px;
            .ball {
                height: 41px;
                background-color: #f7f7f7;
                border: 1px solid #ccc;
                >ul {
                    display: flex;
                    width: 130px;
                    justify-content: space-between;
                    >li {
                        font-size: 15px;
                        color: white;
                        background-color: #2693d4;
                        width: 72px;
                        line-height: 34px;
                        text-align: center;
                    }
                    >span {
                        display: flex;
                        font-size: 15px;
                        height: 42px;
                        line-height: 41px;
                    }
                }
            }
            .ball-one {
                height: 50px;
                >ul {
                    font-size: 14px;
                    width: 870px;
                    margin: 10px auto;
                    display: flex;
                    line-height: 50px;
                    justify-content: space-between;
                }
            }
            .ball-two {
                width: 930px;
                height: 123px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                .bell {
                    width: 487px;
                    height: 98px;
                    display: flex;
                    margin-top: 12px;
                    justify-content: space-between;
                    >div {
                        width: 98px;
                        height: 98px;
                        border: 1px solid #ccc;
                    }
                    >div>img {
                        margin: 20px;
                    }
                    >ul {
                        .fang-one {
                            color: black;
                            font-size: 16px;
                        }
                        .fang-two {
                            color: #676767;
                            margin-top: 22px;
                            font-size: 14px;
                        }
                        .fack {
                            width: 306px;
                            display: flex;
                            margin-top: 15px;
                            font-size: 14px;
                            justify-content: space-between;
                            >li {
                                color: #676767;
                            }
                        }
                    }
                }
                .bead-two {
                    margin: 11px 28px;
                    >div>p {
                        color: red;
                        font-size: 20px;
                        text-align: center;
                    }
                    >ul {
                        width: 189px;
                        height: 29px;
                        display: flex;
                        margin-top: 34px;
                        justify-content: space-between;
                        >a {
                            color: white;
                            width: 90px;
                            height: 30px;
                            line-height: 30px;
                            text-align: center;
                            background-color: #2693d4;
                        }
                    }
                }
            }
        }
    }
    .picture {
        margin-top: 20px;
    }
    .middle-three {
        width: 1200px;
        >div {
            width: 200px;
            display: flex;
            margin: 30px auto;
            justify-content: space-between;
            .alone {
                width: 37px;
                height: 34px;
                color: #2693d4;
                border: 1px solid #2693d4;
            }
            >p {
                width: 66px;
                height: 34px;
                text-align: center;
                line-height: 35px;
                margin: 0 10px;
                border: 1px solid #ccc;
            }
        }
    }
}
</style>