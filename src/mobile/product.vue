<template>
    <div class="wrap" id="parw">
        <div class="margin-left">
            <ul>
                <li v-for="item of dataArr" :key="item.id" @click="dianji(item.code,item.itemList)" :class="{all: oyo ===item.code}"> {{item.name}}</li>
            </ul>
        </div>
        <div class="margin-right">
            <div class="account" v-for="(sec,k) in second" :key="k">
                <p>{{sec.name}}</p>
                <ul>
                    <li @click="goto(sec.code, third.id)" v-for="third in sec.itemList">{{third.name}}
                        <i class="xd xd-more"></i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { Indicator } from 'mint-ui';
export default {
    name: 'parw',
    created() {
        this.mm();
        Indicator.open('加载中...'); // 页面初始加载提示
        this.$root.eventHub.$on('closeLoading', (path) => {
            if (!/product/.test(path)) {
                Indicator.close();
            }
        })
    },
    data() {
        return {
            show: true,
            oyo: 1,
            fuwu: '',
            second: '',
            dataArr: [],
        }
    },
    methods: {
        dianji(c, itemList) {
            this.oyo = c;
            this.second = itemList;
        },
        goto(code, id) { // 页面跳转
            this.$router.push({ path: 'list', query: { code, id } });
        },
        //三级动态获取
        mm() {
            this.$http({
                method: 'post',
                url: '/product/style/list',
                data: {
                }
            }).then((shenme) => {
                let data = shenme.data;
                for (let i in data) {
                    this.dataArr.push(data[i]);     //转化成数组
                };
                this.dataArr.sort(function(a, b) {            //排序
                    return a.code - b.code;
                });
                this.second = this.dataArr[0].itemList;
                if (this.second) {
                    Indicator.close(); // 加载提示关闭 
                }
            })
        },

    }
}
</script>

<style lang="less">
.wrap {
    min-height: 100%;
    position: absolute;
    width: 99.99%;
    display: flex;
    margin-bottom: 0.53rem;
    justify-content: space-between;
    background-color: #f6f6f6;
    .margin-left {
        width: 0.85rem;
        height: 5.9rem;
        background-color: white;
        >ul>li {
            color: #282828;
            width: 1.075rem;
            height: 0.47rem;
            font-size: 0.135rem;
            padding-left: 0.162rem;
            line-height: 0.46rem;
            border-bottom: 0.01rem solid #f4f4f4;
        }
    }
    .margin-right {
        width: 2.83rem;
        color: #666;
        .account {
            >p {
                font-size: 0.135rem;
                line-height: 0.46rem;
                border-bottom: 0.01rem solid #cbcbcd;
            }
            >ul {
                margin-left: 0.255rem;
                >li {
                    color: #666;
                    font-size: 0.135rem;
                    line-height: 0.46rem;
                    border-bottom: 0.01rem solid #cbcbcd;
                    >i {
                        float: right;
                        margin-right: 0.02rem;
                    }
                }
            }
        }
    }
    .all {
        background-color: #f6f6f6;
    }
}
</style>