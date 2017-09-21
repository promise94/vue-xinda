<template>
    <div class="zong" >
        <div class="linkBox">
            <ul class="tabLink container">
                <li class="daohang">
                    <a href="/">全部产品</a>
                    <div class="yincang container" style="display: none">
                        <div class="zong">
                                <p>你猜猜看</p>
                            <div class="yin">
                                <p>你猜猜看</p>
                            </div>
                        </div>
                        <div class="zong">
                            <div class="yin">

                            </div>
                        </div>
                        <div class="zong">
                            <div class="yin">

                            </div>
                        </div>
                        <div class="zong">
                            <div class="yin">

                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <a href="#/services">财税服务</a>
                </li>
                <li>
                    <a href="#/sifco">公司工商</a>
                </li>
                <li>
                    <a href="#/us">加盟我们</a>
                </li>
                <li>
                    <a href="#/storeList">店铺</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            link: { '/': '全部产品', '/services': '财税服务', '/sifco': '公司工商', '/us': '加盟我们', '/storeList': '店铺' },
            index: '',
        }
    },
    created() {
        let urlLink = this.$route.path === '/' ? Object.keys(this.link)[0] : this.$route.path.substr(1);
        this.index = urlLink;
    },
    methods: {
        goPage(n) {
            this.index = n;
            this.$router.push(n);
        }
    }
}
</script>

<style lang="less" scoped>
@color: #2693d4;
.linkBox {
    border-bottom: 1px solid @color;
    .tabLink {
        margin-top: 15px;
        li {
            display: inline-block;
            width: 200px;
            font-size: 18px;
            text-align: center;
            >a {
                display: inline-block;
                height: 40px;
                padding-bottom: 5px;
                box-sizing: border-box;
                cursor: pointer;
                color: #000000;
                &:hover {
                    color: @color;
                    border-bottom: 4px solid @color;
                }
            }
        }
        .active {
            >a {
                color: @color;
                border-bottom: 4px solid @color;
            }
        }
    }
    .active {
      >span {
        color: @color;
        border-bottom: 4px solid @color;
      }
    }
}

// .zong {
//     overflow: hidden;
// }
.yincang {
    z-index: 100;
    padding: 0;
    position: absolute;
    left: 50%;
    height: 402px;
    margin-left: -600px; // overflow：hidden； 
    >div {
        opacity: 0.5;
        position: relative;
        background-color: #132336;
        p{
            opacity: 1;
            color: #ffffff;
        }
        &:hover {
            background-color: #2693d4;
            .yin {
                display: block;
            }
        }
        >div {
            width: 1000px;
            position: absolute;
            top: 0;
            left: 200px;
            display: none; // background-color: red;
        }
    }
    >div:nth-child(1) {
        width: 200px;
        height: 116px;
        margin-top: 1px;
        >div {
            width: 1000px;
            height: 116px;
            background-color: red;
        }
    }
    >div:nth-child(2) {
        width: 200px;
        height: 84px;
        >div {
            width: 1000px;
            height: 84px;
            background-color: red;
        }
    }
    >div:nth-child(3) {
        width: 200px;
        height: 116px;
        >div {
            width: 1000px;
            height: 116px;
            background-color: red;
        }
    }
    >div:nth-child(4) {
        width: 200px;
        height: 84px;
        >div {
            width: 1000px;
            height: 84px;
            background-color: red;
        }
    }
}
</style>
