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
                <div class="">

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
    background-color: pink;
    .content {
        width: 948px;
        height: 678px;
        .content-top {
            width: 948px;
            height: 0;
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
                        text-align: center;
                        line-height: 40px;
                        border-right:0;
                        border: 1px solid #ccc;
                    }
                    >ul {
                        display: flex;
                        width: 849px;
                        height: 40px;
                        border: 1px solid #ccc;
                        >li {
                            margin: 12px 10px;
                        }
                    }
                }
                .search-two {
                    >h3 {
                        height: 80px;
                         text-align: center;
                        line-height: 80px;
                        border-right:0;
                    }
                    >ul {
                        height: 80px;
                        line-height:56px;
                    }
                }
            }
        }
        .content-bottom {
            width: 948px;
            height: 468px;
            margin-top: 23px;
            background-color: red;
        }
    }
}
</style>