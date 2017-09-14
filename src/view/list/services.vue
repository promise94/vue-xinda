<template>
    <div class="middle">
        <div class="content">
            <div class="content-top">
                <p>首页/纳税服务</p>
            </div>
            <div class="content-center">
                <div class="search">
                    <ul class="search-one">
                        <h4>服务分类</h4>
                        <li>公司注册</li>
                        <li>注册变更</li>
                    </ul>
                    <ul class="search-two">
                        <h4>类型</h4>
                        <li>分公司注册</li>
                        <li>公司注册地址</li>
                        <li>合伙企业注册</li>
                        <li>外商独资公司注册</li>
                        <li>VIE架构</li>
                        <li>股份公司注册</li>
                        <li>有限责任公司注册</li><br/>
                        <li>一般纳税注册地址</li>
                    </ul>
                    <ul class="search-one">
                        <h4>服务区域</h4>
                    </ul>
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
                >ul {
                    text-align: center;
                }
                .search-one {
                    height: 40px;
                    width: 948px;
                    display: flex;
                    border: 1px solid #ccc;
                    >h4 {
                        width: 98px;
                        line-height: 40px;
                        border-right: 1px solid #ccc;
                    }
                    >li {
                        width: 200px;
                        line-height: 40px;
                        margin: 0 15px;
                    }
                }
            }
            .search-two {
                height: 80px;
                width: 948px;
                display: flex;
                border: 1px solid #ccc;
                >h4 {
                    width: 98px;
                    line-height: 80px;
                    text-align: center;
                    border-right: 1px solid #ccc;
                }
                >li {
                    width: 200px;
                    margin: 21px 2px;
                    background-color: red;
                }
            }
        }
        .content-bottom{
            width:948px;
            height:468px;
            margin-top: 23px;
            background-color: red;
        }
    }
}
</style>