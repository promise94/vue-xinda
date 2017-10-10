<template>
    <div id="list">
        <div class="change">
            <p @click="changecolor('')" :class="{colorchange: change ==''}">默认排序</p>
            <p @click="changecolor(2)" :class="{colorchange: change == 2}">价格</p>
        </div>

        <div class="main"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
            <div class="store"  v-for="item of arr" @click="gotoxiangqing(item.id)">
                <div class="img"><img v-bind:src="item.productImg"></div>
                <div>
                    <h3>{{item.serviceName}}</h3>
                    <p>{{item.serviceInfo}}</p>
                    <p>{{item.providerName}}</p>
                    <div>
                        <p>{{item.regionName}}
                            <span>￥{{item.price}}</span>
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="load" v-show="loadingShow">
            <mt-spinner type="fading-circle"></mt-spinner>
            <span>拼命加载中....</span>
        </div>
          <div v-show="loadsShow" class='xd xd-jiazaiwancheng load'>文件加载完成</div>     
    </div>

</template>
<script>
import { InfiniteScroll } from 'mint-ui';
export default {
    name: 'storelist',
    data() {
        return {
            change: '',
            mess: '', //总数据获取
            members: {
                productTypeCode: '',
                // this.$route.query.code,//产品分类编码
                productId: '',
                // this.$route.query.id,//产品id
                sort: '',//排序方式，空：默认排序
            },
            loading: true,
            arr: '',//中间变量数组
            i: 0,
            loadingShow: false, // 加载动画是否显示
            loadsShow: false, // 是否显示加载完成
        }
    },
    created() {
        this.getList();
        
    },
    methods: {
        changecolor(n){
            this.change=n;
            this.members.sort=n;
            this.getList();
        },
        //列表数据获取
        getList() {
        this.$http({
            method: 'post',
            url: '/product/package/grid',
            data: this.members,
        }).then((result) => {
            let data = result.data;
            let len = data.length;
            for (var i = 0; i < len; i++) {
            data[i].productImg.substring(0, 3) == 'http' ? data[i].productImg = data[i].productImg : data[i].productImg = "http://115.182.107.203:8088/xinda/pic" + data[i].productImg;//图片数据处理，加上前缀
            data[i].price = this.fmtPrice(data[i].price);//处理销售价格余两位数
            };
            this.mess=data;
            this.arr=this.mess.slice(0,5);//初始显示的数据
            this.loading = false;          
        })
        },
        //函数处理价格，小数点后余两位数
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        //跳转页面到商品详情页，传一个id
        gotoxiangqing(id) {
        this.$router.push({ path: '/m/goods', query: { id } });
        },

        //加载显示
        loadMore() {
            this.loading = true;
            this.loadingShow = true;
            if (this.arr.length != this.mess.length) {
                setTimeout(() => {
                    this.i=this.i+5;
                    this.arr=this.mess.slice(0,this.i);
                    this.loading = false;
                    this.loadingShow = false;
                }, 2500);
            }else{
                this.loadingShow = false;
                this.loadsShow = true;
            }
        },

        
    }
}
</script>

<style lang="less" scoped>
    #list{
        margin-bottom:0.7rem;
    }
    .change{
        display:flex;
        margin:0.22rem  auto;
        width:1.8rem;
        height:0.32rem;
        border:0.01rem solid #2594d4;
        border-radius:0.05rem;
        font-size:0.14rem;
        text-align:center;
        >p{
            width:0.9rem;
            line-height:0.32rem;
        }
        .colorchange{
            color:#fff;
            background:#2594d4;
        }
    }
    .main{
        margin:0 auto 0.2rem;
        width:95%;
        .store{
            display:flex;
            margin-bottom:0.15rem;
            width:100%;
            height:1rem;
            border-bottom:0.01rem solid #cfcfcf;
            .img{
                margin-right:0.1rem;
                width:0.95rem;
                height:0.85rem;
                border:0.01rem solid #e3e3e3;
                img{                
                    width:100%;
                    height:100%;
                }
            }        
            >div{
                width:2.45rem;
                >h3{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap; 
                }
                >p{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap; 
                    line-height:0.22rem;
                } 
                >div{
                    display:flex;
                    >p{    
                        width:100%;                   
                        font-size:0.15rem;
                        font-weight:bold;
                        span{
                            float:right;
                            font-size:0.2rem;
                            color:red;
                        }
                    }
                } 
            }
            
        }
    }
    .load{        
        display:flex;
        padding:0 0 0 36%;      
    }
</style>