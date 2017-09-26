<template>
    <div class="zong">
        <div class="linkBox">
            <ul class="tabLink container">
                <li class="daohang">
                    <a href="#/" @mouseenter="showMenu(1)" @mouseleave="noneMenu(1)" @click="bb(0)" v-bind:class="{daohang2 :cc===0}">
                        <span>全部产品</span>
                    </a>
                </li>
                <li>
                    <a href="#/services" @click="bb(1)" v-bind:class="{daohang2 :cc===1}">
                        <span>财税服务</span>
                    </a>
                </li>
                <li>
                    <a href="#/sifco" @click="bb(2)" v-bind:class="{daohang2 :cc===2}">
                        <span>公司工商</span>
                    </a>
                </li>
                <li>
                    <a href="#/us" @click="bb(3)" v-bind:class="{daohang2 :cc===3}">
                        <span>加盟我们</span>
                    </a>
                </li>
                <li>
                    <a href="#/storeList" @click="bb(4)" v-bind:class="{daohang2 :cc===4}">
                        <span>店铺</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="yincang " @mouseenter="showMenu(2)" @mouseleave="noneMenu(2)" v-show="show">
            <div class="zong" v-for="item of dataArr" :key="item.id">
                <div class="erji">
                    <div>.
                        <span class="xd xd-shui"></span>
                    </div>
                    <div>
                        <p>{{item.name}}</p>
                        <span class="text" v-for="shenme in item.itemList" :key="shenme.id">{{shenme.name}}</span>
                    </div>
                </div>
                <div class="sanji">
                    <div>
                        <div v-for="shenme in item.itemList" :key="shenme.id">
                            <p>{{shenme.name}}</p>
                            <a href="#/services" v-for="e in shenme.itemList" :key="e.id">&nbsp;
                                <span>{{e.name}}</span>&nbsp;</a>
                        </div>
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
            aaa: 0,
            cc: 0,
            show: false,
            flag: false,
            hehe: '',
            dataArr: [],
            namearr: [],
            modal_info: '',
            promise: '',
        }
    },
    created() {
        this.getbucai();
        if (window.location.hash == '#/') {
            this.show = true;
            this.flag = false;

        } else {
            this.show = false;
            this.flag = true;
        }
    },
    watch: {
        '$route': function() {
            if (this.$route.path == '/') {
                this.show = true;
                this.flag = false;
                if (this.flag == false) {

                }

            } else {
                this.show = false;
                this.flag = true;

            }
        }
    },
    methods: {
        bb(n) {
            this.cc = n;

        },
        showMenu(n) {
            if (this.flag) {
                if (n === 1) {
                    this.show = true;
                } else {
                    clearTimeout(this.promise);
                }
            }

        },
        noneMenu(n) {
            if (this.flag === true){
                if (n === 1) {
                    this.promise = setTimeout(() => {
                        this.show = true;
                    }, 300);
                } else {
                    this.show = false;
                }
            }
        },
        // 导航获取
        getbucai() {
            this.$http({
                method: 'post',
                url: '/product/style/list',
                data: {
                }
            }).then((shenme) => {
                let data = shenme.data;
                for (let i in data) {
                    let datar = data.itemList;
                    this.dataArr.push(data[i]);        //转化成数组
                };
                this.dataArr
                this.dataArr.sort(function(a, b) {            //排序
                    return a.code - b.code;
                });
            })
        },
    },

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
                    >span {
                        color: @color;
                    }
                    border-bottom: 4px solid @color;
                }
            }
        }
    }
}

.daohang2 {
    >span {
        color: @color;
    }
    border-bottom: 4px solid @color;
}

.yincang {
    // width: 1200px;
    z-index: 100;
    padding: 0;
    position: absolute;
    left: 50%;
    height: 402px;
    margin-top: 0px; // overflow: hidden;
    margin-left: -600px;
    .zong {
        width: 200px;
        position: relative;
        display: flex;
        color: #fff;
        .erji {
            width: 200px;
            background: rgba(127, 171, 171, 0.5);
            &:hover {
                background: #2693d4;
            }
            display: flex;
            >div:nth-child(1) {

                width: 26px;
                height: 26px;
                margin: 8px 0 0 14px;
                >span {
                    display: block;
                    font-size: 26px;
                }
            }
            >div:nth-child(2) {
                width: 160px;
                margin-top: 13px;
                margin-bottom: 19px;
                >p {
                    color: #fff;
                    line-height: 25px;
                    width: 84px;
                    height: 32px;
                }
            }
        }
        &:hover {
            .sanji1,
            .sanji {
                display: block;
            }
        }
    }
}

.sanji {
    position: absolute;
    right: -1000px;
    height: 100%;
    width: 1000px;
    display: none; // background: #fff;
    background-color: rgba(0, 0, 0, 0.5);
    align-items: center;
    >div {
        margin-top: 12px;
        >div {
            display: flex;
            text-align: center;
            >p {
                color: #fff;
                display: block;
                width: 100px;
                height: 16px;
                font-size: 14px;
                margin-bottom: 7px;
            }
            >a {
                color: #fff;
                display: block;
                border-left: 1px solid #ffffff;
                height: 18px;
                line-height: 16px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                span {
                    font-size: 14px;
                }
            }
        }
    }
}



.text {
    float: left;
    font-size: 14px;
    width: 80px;
    line-height: 24px;
    p {}
}
</style>
