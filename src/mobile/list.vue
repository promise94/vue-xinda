<template>
    <div id="list">
        <div class="change">
            <p @click="changecolor('')" :class="{colorchange: change ==''}">默认排序</p>
            <p @click="changecolor(2)" :class="{colorchange: change == 2}">价格</p>
        </div>
        <div class="main">
            <div class="store"  v-for="item of mess" @click="gotoxiangqing(item.id,Id)">
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

        <span class='xd xd-no' v-show="kong"></span>                 
                  
    </div>
</template>
<script>
import { InfiniteScroll } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    name: 'storelist',
    data() {
        return {
            change: '',
            mess: '', //总数据获取
            members: {
                productTypeCode: this.$route.query.code,//产品分类编码            
                productId: this.$route.query.id,//产品id
                sort: '',//排序方式，空：默认排序
            },   
            kong: false,
            Id: '',       
        }
    },
    created() {
        this.getList();
        Indicator.open('加载中...'); // 页面初始加载提示
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
                this.Id=data[i].providerId;
                };
                this.mess=data;                
                if(this.mess==''){
                    Indicator.close(); // 加载提示关闭 
                    this.kong=true;
                }else{
                   Indicator.close(); // 加载提示关闭    
                   this.kong=false;            
                }      
            })
        },
        //函数处理价格，小数点后余两位数
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        //跳转页面到商品详情页，传一个id
        gotoxiangqing(id,Id) {
        this.$router.push({ path: '/m/goods', query: { id,Id } });
        // console.log('id',id)
        },
        
    }
}
</script>

<style lang="less" scoped>
#list > span{      
    margin:0 23%;
    font-size:2rem;        
}
    .change{
        display:flex;
        margin:0.22rem  auto;
        width:1.8rem;
        height:0.32rem;
        border:0.02rem solid #2594d4;
        border-radius:0.05rem;
        font-size:0.14rem;
        text-align:center;
        >p{
            width:0.9rem;
            line-height:0.38rem;
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
            border-bottom:0.02rem solid #cfcfcf;
            .img{
                margin-right:0.1rem;
                width:0.95rem;
                height:0.85rem;
                border:0.02rem solid #e3e3e3;
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
</style>