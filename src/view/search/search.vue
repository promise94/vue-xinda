<template>
    <div class="searchResult container">
        <p>首页&nbsp;/&nbsp;搜索结果</p>
        <div class="">
            <div class="mainBox" v-if="searchOut.length != 0">
                <div class="order">
                    <div @click="blue(1)" :class="{blue: change ===1}">
                        <p>综合排序</p>
                        <div></div>
                    </div>
                    
                    <div @click="blue(2)" :class="{blue: change ===2}">
                        <p>价格
                            <span class="xd xd-paixu1" :class="{yellow: colors ===1}"></span>
                        </p>
                        <div></div>
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
                            <div class="ball-right" v-if="typeIn== 1">
                                <p>￥&nbsp;{{fmtPrice(item.price)}}</p>
                                <div>
                                    <a href="#/cart" @click="cars(item.id)">立即购买</a>
                                    <a @click="cars(item.id)">加入购物车</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="page-changes" v-if="searchOut.length !== 0">

                <v-page @page="titles" :amount="count" :limit="limit" type="dd"></v-page>

            </div>
            <nothing title="未搜索到结果" v-if="searchOut.length == 0"></nothing>
        </div>
    </div>
</template>

<script>
import nothing from '../../components/global/nothing.vue';
import vPage from '@/components/global/page';//引用分页组件
export default {
    components: {
        nothing,
        vPage,
        },
    data() {
        return {
            checked: 1,
            change: 1,
            colors: 0,
            searchOut: '',
            searchName: '', // 搜索内容
            typeIn: 1, // 搜索类型 1:产品，2:服务商
            regionId: '', // 城市编码
            sort: '',//排序方式（默认为空）
            i: 0,
            start: 0, //分页起始数
            limit: 6, //分页每页数量
            count: 0, //服务产品内总产品数量
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
        '$route'() {       //获取存储在sessionStorage里的数据
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
            if(m==2){      //判断点击次数作价格升序降序     
                this.i++;
                if(this.i%2==1){
                    this.sort=3; //价格降序
                    this.colors=0; 
                }else{
                    this.sort=2; //价格升序
                    this.colors=1;
                }
            }else{
                this.sort= ''; //默认排序
                this.colors=0; 
            }
            this.search();
        },
        search() {
            if (this.typeIn == 1) { //商品搜索
                this.$http({
                    method: 'post',
                    url: '/product/package/search-grid',
                    data: {
                        start: this.start,//分页起始数
                        limit: this.limit,//分页每页数量
                        searchName: this.searchName,//搜索名称
                        sort: this.sort, //价格排列,
                    }
                }).then((res) => {
                    res.data.forEach((item) => {//处理图片加上前缀
                        item.providerImg = item.providerImg.indexOf('http') > -1 ? item.providerImg : 'http://115.182.107.203:8088/xinda/pic' + item.providerImg;
                    });
                    this.count = res.totalCount; //产品内总产品数量
                    this.searchOut = res.data;
                    // console.log(this.count);
                    
                });
            } else { //服务商搜索
                this.$http({
                    method: 'post',
                    url: '/provider/search-grid',
                    data: {
                        start: this.start,
                        limit: 8,
                        searchName: this.searchName,
                        // productTypeCode: 7,
                        // regionId: '110105',
                        sort: 1,
                    }
                }).then((res) => {
                    res.data.forEach((item) => {//处理图片加上前缀
                        item.providerImg = item.providerImg.indexOf('http') > -1 ? item.providerImg : 'http://115.182.107.203:8088/xinda/pic' + item.providerImg;
                    });
                    this.count = res.totalCount; //产品内总产品数量
                    this.searchOut = res.data;
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
        
        //函数处理价格，小数点后余两位数
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        //调取自定义分页函数
        titles(n) {
            this.start = n;
            this.search();
        }

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
        >div {
            width: 110px;
            height: 42px;
            line-height: 42px;
            margin-right: 5px;
            position: relative;
            text-align: center;
            p {
                font-size: 14px;
                cursor: pointer;
                &:hover {
                    background: #2594d4;
                    color: #fff;
                }
                >span{
                    display:inline-block;
                    transition:all 0.5s linear;
                }
            }
        }
        .blue {
            color: #fff;
            background: #2594d4;
            >div{
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
                        width: 100px;
                        height:45px;
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
        transform:rotate(180deg);
    }
}
.page-changes{
            margin:25px auto 150px;
        }
</style>
