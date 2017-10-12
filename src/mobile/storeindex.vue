<template>
    <div id="storeindex">
        <div class="company">
            <div class="img"><img :src="date.providerImg"></div>
            <div>
                <h3>{{date.name}}</h3>
                <h4>公司介绍:</h4>
                <p>{{date.providerInfo}}</p>
                <p>{{date.regionName}}</p>
            </div>
        </div>
        <div class="service" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="5">
            <div class="all">所有服务<p></p></div> 
            <div class="messages" v-for="item of arr" @click="gotoxiangqing(item.id, Id)">
                <div class="img"><img src='../common/images/order.png' :src="item.productImg"></div>
                <div>
                    <h4>{{item.serviceName}}</h4>
                    <p>{{item.serviceInfo}}</p>
                    <div>
                        <p class="xd xd-xiao31">{{item.regionName}}</p>                       
                        <span>￥{{fmtPrice(item.price)}}</span>             
                    </div>
                </div>
            </div>           
        </div>
        <p v-show="loadingShow">
            <mt-spinner type="fading-circle" color="#26a2ff"></mt-spinner>
            <span>拼命加载中....</span>
        </p>
        <p v-show="loadShow" class='xd xd-jiazaiwancheng'>文件加载完成</p>
    </div>

</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    name: 'storeindex',
    data() {
        return {
            date: '', //店铺首页总数据
            mess: '', // 服务内容展示数据
            members: {
                start: 0, //分页起始数
                limit: '', //分页每页数量
                productTypeCode: '', //产品分类编码
                sort: 2, //价格升序排列,
                providerId: this.$route.query.id,//产品id
            },
            status: 0,//状态
            loading: true,
            arr: '',//中间变量数组
            i: 0,
            loadingShow: false, // 加载动画是否显示
            loadShow: false,
            Id: '',
        }
    },
    created() {
        this.getStore();     //数据获取
        Indicator.open('加载中...'); // 页面初始加载提示
        this.$root.eventHub.$on('closeLoading', (path)=>{
            if (!/storeindex/.test(path)) {
                Indicator.close();
            }
        })
    },
    methods: {
        getStore() {  
            this.$http({      //店铺首页后台数据获取
                method: 'post',
                url: '/provider/detail',
                data: {
                id: this.$route.query.id,
                }
            }).then((res) => {               
                this.status=res.status;
                this.date = res.data;
                this.Id=this.date.id;
                // 服务商头像图片数据处理，加上前缀
                this.date.providerImg.substring(0, 3) == 'http' ? this.date.providerImg = this.date.providerImg : this.date.providerImg = "http://115.182.107.203:8088/xinda/pic" + this.date.providerImg;
                
            });
            this.$http({//服务产品数据获取
                method: 'post',
                url: '/product/package/grid',
                data: this.members,
            }).then((res) => {
                console.log('222',res);
                let date = res.data;
                let len = date.length;
                for (var i = 0; i < len; i++) {               
                // 服务商头像图片数据处理，加上前缀
                date[i].productImg.substring(0, 3) == 'http' ? date[i].productImg = date[i].productImg : date[i].productImg = "http://115.182.107.203:8088/xinda/pic" + date[i].productImg;
                };
                this.mess = date;
                this.mess.price = this.fmtPrice(this.mess.price);//处理销售价格余两位数
                this.arr=this.mess.slice(0,5);//初始显示的数据
                this.loading = false;

                if(this.arr.length && this.status){
                    Indicator.close(); // 加载提示关闭 
                }
                
            });
            
        },
        //函数处理价格，小数点后余两位数/*  */
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
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
                this.loadShow = true;
            }
        },
        //跳转页面到商品详情页，传一个id
        gotoxiangqing(id,Id) {
        this.$router.push({ path: '/m/goods', query: { id,Id } });
        },
    }
}
</script>

<style lang="less" scoped>
#storeindex{  
    background:#ececec;
    .company{
        margin-bottom: 0.1rem;
        padding: 0.1rem;
        border-bottom: 0.01rem solid #e3e3e3;
        background: #fff;
        .img{
            margin: 0.08rem auto;
            width: 1rem;
            img{
                width:1rem;
            }
        }
        >div{
            >h3{
                text-align:center;
                margin:0.05rem;
            }
            >p{
                margin:0.05rem 0;
                font-size:0.07rem;
            }
        }
    }
    .service{
        padding:0.1rem;
        background:#fff;      
        .all{
            position:relative;
            border-bottom:0.015rem solid #2594d4;
            font-weight:bold;
            font-size:15px;
            line-height:0.3rem;
            >p{
                transform:rotate(45deg);
                position:absolute;
                left:0.25rem;
                bottom:-0.01rem;
                width:0.03rem;
                height:0.03rem;    
                background:#2594d4;
            }
        }
        .messages{
            display:flex;
            margin:0.1rem 0;
            width:100%;
            height:0.9rem;
            border-bottom:0.01rem solid #cfcfcf;
            img{
                margin-right:0.1rem;
                width:0.95rem;
                height:0.75rem;                             
            }       
            >div{
                font-size:0.14rem;
                >h4{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;                   
                }
                >p{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    width:2.4rem;                   
                    line-height:0.3rem;
                } 
                >div{
                    display:flex;
                    margin-top:0.05rem;                   
                    >p{
                        font-size:0.14rem;                     
                        width:1.8rem;                       
                    }
                    >span{
                        font-size:0.18rem;
                        font-weight:bold;
                        color:red;
                    }
                } 
            }
            
        }
    }
    >p{
        display:flex;
        padding:0 0 0 36%;
        background:#fff;
    }
}

</style>