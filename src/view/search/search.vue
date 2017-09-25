<template>
    <div class="searchResult container">
        <p>首页&nbsp;/&nbsp;搜索结果</p>
        <div class="">
            <div class="mainBox" v-if="searchOut.length != 0">
                <div class="order">
                    <div @click="blue(1)" :class="{blue: change ===1}">
                        <p>综合排序</p>
                    </div>
                    <div @click="blue(2)" :class="{blue: change ===2}">
                        <p>价格
                            <span class="xd xd-paixu" :class="{yellow: colors ===1}"></span>
                        </p>
                    </div>
                </div>
                <div class="main">
                    <div class="list" v-for="(item, k) of searchOut" :key="k">
                        <div class="details">
                            <div class="media">
                                <img :src="item.providerImg" alt="">
                            </div>
                            <ul class="info">
                                <li>
                                    <h6>{{item.serviceName || item.providerName}}</h6>
                                </li>
                                <li>{{item.serviceInfo || item.productTypes}}</li>
                                <li>
                                    <span>信达北京服务中心</span>
                                    <span>{{item.regionName}}</span>
                                </li>
                            </ul>
                            <div class="ball-right">
                                <p>￥&nbsp;{{item.price}}</p>
                                <div>
                                    <a href="#/cart" @click="cars(item.id)">立即购买</a>
                                    <a @click="cars(item.id)">加入购物车</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <nothing title="未搜索到结果" v-if="searchOut.length == 0"></nothing>
        </div>
    </div>
</template>

<script>
import nothing from '../../components/global/nothing.vue';
export default {
    components: {nothing},
    data() {
        return {
            checked: 1,
            change: 1,
            colors: 0,
            searchOut: '',
            searchName: '', // 搜索内容
            typeIn: 1, // 搜索类型 1:产品，2:商品
            regionId: '', // 城市编码
            sort: '',//排序方式（默认为空）
            i: 0
        }
    },
    created() {
        let searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'));
        this.searchName = searchInfo.keyword;
        this.typeIn = searchInfo.type;
        this.regionId = searchInfo.id;
        this.search();
        
    },
    watch: {
        '$route'() {
            let searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'));
            this.searchName = searchInfo.keyword;
            this.typeIn = searchInfo.type;
            this.regionId = searchInfo.id;
            this.search();
            
        }
    },
    methods: {
        blueColor(n) {
            this.checked = n;
        },
        blue(m) {
            this.change = m;
            if(m==2){           
                this.i++;
                if(this.i%2==1){
                    this.sort=3;
                    this.colors=0; 
                }else{
                    this.sort=2;
                    this.colors=1;
                }
            }else{
                this.sort= '';
                this.colors=0; 
            }
            this.search();
        },
        search() {
            if (this.typeIn == 1) {
                this.$http({
                    method: 'post',
                    url: '/product/package/search-grid',
                    data: {
                        start: 0,
                        limit: 8,
                        searchName: this.searchName,
                        sort: this.sort,
                    }
                }).then((res) => {
                    res.data.forEach((item) => {
                        item.providerImg = item.providerImg.indexOf('http') > -1 ? item.providerImg : 'http://115.182.107.203:8088/xinda/pic' + item.providerImg;
                    })
                    this.searchOut = res.data;
                    console.log(res.data);
                    
                });
            } else {
                this.$http({
                    method: 'post',
                    url: '/provider/search-grid',
                    data: {
                        start: 0,
                        limit: 8,
                        searchName: this.searchName,
                        // productTypeCode: 7,
                        // regionId: '110105',
                        sort: 1,
                    }
                }).then((res) => {
                    res.data.forEach((item) => {
                        item.providerImg = item.providerImg.indexOf('http') > -1 ? item.providerImg : 'http://115.182.107.203:8088/xinda/pic' + item.providerImg;
                    })
                    this.searchOut = res.data;
                    // console.log(this.sort);
                });
            }
        },
        cars(Id) {
            this.$http({
                method: 'post',
                url: '/cart/add',
                data: {
                    id: Id,
                    num: 1,
                }
            }).then((ward) => {
                
            })
        },

    }
}
</script>

<style lang="less" scoped>
.searchResult {
    >p {
        padding-top: 25px;
        font-size: 14px;
        color: #333;
    }
}

.mainBox {
    margin: 10px 0 25px;
    border: 1px solid #cccccc;
    .order {
        display: flex;
        background: #f7f7f7;
        border-bottom: 1px solid #cccccc;
        p {
            font-size: 14px;
            cursor: pointer;
        }
        >div {
            width: 110px;
            height: 42px;
            line-height: 42px;
            margin-right: 5px;
            position: relative;
            text-align: center;
            &:hover {
                background: #2594d4;
                color: #fff;
            }
        }
        .blue {
            color: #fff;
            background: #2594d4;
            &::before {
                width: 10px;
                height: 10px;
                transform: rotate(45deg);
                background: #2594d4;
                position: absolute;
                left: 50px;
                bottom: -5px;
            }
        }
    }
    .main {
        margin-top: 35px;
        padding: 0 15px 15px;
        .list {
            padding: 15px 0;
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #eee;
            .details {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .media {
                    width: 100px;
                    margin-right: 15px;
                    padding: 30px;
                    border: 1px solid #ddd;
                    img {
                        width: 100%;
                    }
                }
                .info {
                    width:830px;
                    li {
                        padding: 5px 0;
                        letter-spacing: 1px;
                        &:nth-child(1) {
                            font-size: 16px;
                            color: #555;
                        }
                        &:nth-child(2) {
                            color: #777;
                        }
                        &:nth-child(3) {
                            color: #777;
                            span {
                                margin-right: 70px;
                            }
                        }
                    }
                }
                .ball-right{
                    height: 87px;
                    text-align: center;
                    >p{
                        color: red;
                        font-size: 24px;
                        line-height: 50px;
                    } 
                    >div{
                        color: white;
                        line-height: 30px;
                        >a{
                            cursor:pointer;
                            padding: 5px;
                            color: white;
                            background-color: #2693d4;
                        }
                     }
                }
            }
        }
    }
    .yellow{
        color:yellow;
    }
}
</style>
