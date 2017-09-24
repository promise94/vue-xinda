<template>
    <div class="zong">
        <div class="linkBox">
            <ul class="tabLink container">
                <li class="daohang">
                    <a href="#/" v-on:click="show = !show">
                        全部产品
                        <!-- <div class="yincang container" v-if="show">
                            <div class="zong">
                                <div class="erji">
                                    <div>图</div>
                                    <div>
                                        <p>财税服务</p>
                                    </div>
                                </div>
                                <div class="sanji"></div>
                            </div>
                        </div> -->
                    </a>
                </li>
                <li>
                    <a href="#/services" @click="bb(1)" :class="{daohang2 :cc===1}">财税服务</a>
                </li>
                <li>
                    <a href="#/sifco" @click="bb(2)" :class="{daohang2 :cc===2}">公司工商</a>
                </li>
                <li>
                    <a href="#/us" @click="bb(3)" :class="{daohang2 :cc===3}">加盟我们</a>
                </li>
                <li>
                    <a href="#/storeList" @click="bb(4)" :class="{daohang2 :cc===4}">店铺</a>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            aaa: 0,
            cc: '',
            show: true,

        }
    },


    created() {
        this.getnicai();
    },
    methods: {
        bb(n) {
            this.cc = n;

            console.log(this.cc);
        },
        getnicai() {
            this.$http({
                method: 'post',
                url: '/product/style/list',
                data: {
                }
            }).then((result) => {
                console.log(result.data);
            })
        },
    }
}
</script>

<style lang="less" scoped>
@color: #2693d4;
.linkBox {
    border-bottom: 1px solid @color;
    .tabLink {
        margin-top: 15px;
        >li {
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
                        // height: 40px;
                    
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


.yincang {
    // display: none;
    z-index: 100;
    padding: 0;
    position: absolute;
    left: 50%;
    height: 402px;
    margin-top: 13px;
    overflow: hidden;
    margin-left: -600px; // overflow：hidden； 
    .zong {
        width: 200px;
        height: 116px; // background: red;
        position: relative;
        display: flex;
        >div:nth-child(1) {
            width: 200px;
            height: 116px;
            background: cadetblue;
            display: flex;
            >div:nth-child(1) {
                background: red;
                width: 26px;
                height: 26px;
                margin: 17px 0 0 14px;
            }
            >div:nth-child(2) {
                background: red;
                width: 160px;
                height: 20px;
                margin-top: 17px;
                p {
                    line-height: 25px;
                }
            }
        }
        .sanji {
            position: absolute;
            right: -1000px;
            width: 1000px;
            height: 116px;
            display: none;
            background: darkgreen;
        }
        &:hover {
            .sanji {
                display: block;
            }
        }
    }
}
</style>
