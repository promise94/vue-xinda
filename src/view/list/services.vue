<template>
    <div class="middle">
        <div class="content">
            <div class="content-top">
                <p>首页/纳税服务</p>
            </div>
            <div class="content-center">
                <div class="search">
                    <div class="">
                        <h3>服务分类</h3>
                        <ul class="search-one">
                            <li>公司注册</li>
                            <li>注册变更</li>
                        </ul>
                    </div>
                    <div class="search-two">
                        <h3>类型</h3>
                        <ul>
                            <li>分公司注册</li>
                            <li>公司注册地址</li>
                            <li>合伙企业注册</li>
                            <li>外商独资公司注册</li>
                            <li>VIE架构</li>
                            <li>股份公司注册</li>
                            <li>有限责任公司注册</li><br/>
                            <li>一般纳税注册地址</li>
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
                        <li class="">综合排序</li>
                        <li class="">价格</li>
                    </ul>
                </div>
                <div class="ball-one">
                    <ul>
                        <li>商品</li>
                        <li>价格</li>
                    </ul>
                </div>
                <div class="ball-two">
                    <div class="bell">
                        <div>
                            <img src="../../common/images/logo.png" alt="">
                        </div>
                        <ul>
                            <li class="fang-one">注册分公司</li>
                            <li class="fang-two">营业执照+5章（公章，财务章，人名章，发票章，合同章）</li>
                            <div>
                                <p>信达北京服务中心</p>
                                <p>北京-北京市-朝阳区</p>
                            </div>

                        </ul>
                    </div>
                    <div class="bell-two">
                        <div>
                            <p>￥&nbsp;800.00</p>
                        </div>
                        <ul>
                            <li>立即购买</li>
                            <li>加入购物车</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
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
    height: 678px;
    margin: 26px auto;
    .content {
        width: 948px;
        height: 678px;
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
                >div {
                    display: flex;
                    >h3 {
                        width: 98px;
                        height: 40px;
                        font-size: 16px;
                        text-align: center;
                        line-height: 40px;
                        border-right: 0;
                        border: 1px solid #ccc;
                    }
                    >ul {
                        display: flex;
                        width: 849px;
                        height: 40px;
                        border: 1px solid #ccc;
                        >li {
                            color: #434343;
                            font-size: 13px;
                            margin: 12px 10px;
                        }
                    }
                }
                .search-two {
                    >h3 {
                        height: 80px;
                        text-align: center;
                        line-height: 80px;
                        border-right: 0;
                    }
                    >ul {
                        height: 80px;
                        line-height: 56px;
                    }
                }
            }
        }
        .content-bottom {
            width: 948px;
            height: 468px;
            margin-top: 23px;
            .ball {
                height: 41px;
                background-color: #f7f7f7;
                border: 1px solid #ccc;
                >ul {
                    display: flex;
                    width: 116px;
                    justify-content: space-between;
                    >li {
                        margin-top: 10px;
                        font-size: 15px;
                    }
                    >li:nth-chlid(1) {
                        width: 61px;
                        background-color: #2693d4;
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
                        .fang-one{
                            color: black;
                            font-size: 16px; 
                        }
                        .fang-two{
                            color:#676767;
                            margin-top: 22px;
                            font-size: 14px;
                        }
                        >div{
                            width:306px; 
                            display: flex;
                            margin-top: 15px;
                            font-size: 14px;
                            justify-content: space-between;
                            >p{
                                color:#676767;
                            }
                        }
                    }
                }
                .bell-two{
                    margin: 11px 28px;
                    >div>p{
                        color: red;
                        font-size:20px;
                        text-align:center; 
                    }
                    >ul{
                        width: 189px;
                        height:29px;
                        display: flex;
                        margin-top: 34px;
                        justify-content: space-between;
                       >li{
                           color:white;
                           width: 90px;
                           height:30px;
                           line-height: 30px;
                           text-align: center;
                           background-color: #2693d4;
                        }
                    }
                }
            }
        }
    }
}
</style>