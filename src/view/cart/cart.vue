<template>
    <div class="cart_conter">
        <!-- 展示项 -->
        <div class="header">
            <p>首页/购物车</p>
            <p>全部商品（{{msg}}）</p>
        </div>
        <div class="company-hd">
            <p>公司</p>
            <p>服务商品</p>
            <p>单价</p>
            <p>数量</p>
            <p>金额</p>
            <p>操作</p>
        </div>
        <!-- 商品列表 -->
        <div class="shangpin">
            <div class="list" >
            <!-- v-for="(item,k) of items" :key="k"  -->
                <p>店铺：{{providerName}}</p>
                <div class="list-xx">
                    <p><img src=" item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg" alt="providerName"  @click="gotos(item.id)"></p>
                    <p>{{serviceName}}</p>
                    <p>￥{{unitPrice}}</p>
                    <p>
                        <span class="xd xd-jian" @click="less()"></span>
                        <span><input type="text" :value="counter"></span>
                        <span class="xd xd-tianjia" @click="add()"></span>
                    </p>
                    <p>￥{{totlePrice}}</p>
                    <p @click="del(items.id)">删除</p>
                </div>
            </div>
        </div>
        <!-- 金额总计 -->
        <div class="totle">
            <p>金额总计<span>￥{{monytotal}}</span></p>
            <div @click="goShop()"><a >继续购物</a></div>
            <div @click="goSettle()"><a>去结算</a></div>
        </div>
        <!-- 热门服务 -->
        <div class="rr">
            <p>热门服务</p>
        </div>
        <div class="rm-list">
            <div v-for="(item, k) of recommend" :key="k" @click="showDetails(item.id)">
                <p>{{item.serviceName}}</p>
                <p>
                    <span></span>
                    <span></span>
                </p>
                <p>{{item.serviceInfo}}</p>
                <p>￥800.00</p>
                <p>原价：￥{{item.marketPrice}}</p>
                <p>查看更多>></p>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    created(){
        // console.log(this.$route.query.id)
        this.getTuijian();
        // this.getCartlsit();
    },
    data(){
        return {
            counter:1,      //个数
            msg:0,          //全部商品
            recommend: '',  //热门商品的总数据
            items:[],       //商品数组
            monytotal:0,    //去结算总金额
            totlePrice:0,   //单件商品总额
            unitPrice:800,  //单价
            providerName:0, //测试
            serviceName:0,  //测试
        }
    },
    watch:{
        counter:function(newcounter){
            this.monytotal = newcounter*800;    //去结算总金额
            this.totlePrice = newcounter*800;   //单件商品总额
        }
    },
    methods: {
        //价格转化
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        //购物车商品获取
        getCartlsit(){
            this.$http({
                method:'post',
                url:'/cart/list',
                data:{
                }
            }).then((res)=>{
                // console.log(res)
                this.items = res.data;
                // msg = this.buyNum;
                // monytotal = this.items.totalPrice.reduce((x ,y)=>{return x+y;});
            })
        },
        // 删除事件
        del(items){
            var r = confirm("是否确认删除此商品？");
            if(r==true){
                // this.items.splice(k,1);
                this.$http({
                    method:'post',
                    url:'cart/del',
                    data:{
                        id:'1212121'
                    }
                }).then((res)=>{
                    if(res.status == 1){
                        alert("删除成功！")
                        // getDel(k);
                    }else{
                        alert("删除失败！")
                    }
                });
                // alert("删除成功")   
            }else{
                alert("已取消删除！");
            }    
        },
        //删除数组中的数
        getDel(k){
            this.items.splice(k,1);
        },
        //数量操作
        add(items,k){
            console.log(items,k)
            this.counter += 1;
            this.toto();
        },
        less(){
            if(this.counter >1){
                this.counter -= 1;
                this.toto();
                }else{
                    this.counter = 1;
                }  
        },
        //总件数
        toto(items){
            // msg = items.buyNum.reduce((x,y)=>{return x+y});
            this.msg = this.counter
        },
        //去购物
        goShop(){
            this.$router.push({
                path:'/'
            })
        },
        //提交结算
        goSettle(){
            //先执行修改提交
            getXiugai();
            this.$http({
                method:'post',
                url:'/cart/submit',
                data:{

                }
            }).then((res)=>{
                // console.log(res)
                if(res.status == 1){
                    this.$router.push({
                        path:'/pay/'+res.data.data
                    })
                }else{
                    alert(res.msg+"!")
                }
            })
        },
        // 修改操作
        getXiugai(){
                this.$http({
                    methods:'post',
                    url:'/cart/set',
                    data:{}
                }).then((res)=>{
                    
                })
            },
        //热门服务获取
        getTuijian(){
            this.$http({
                method: 'post',
                url: '/recommend/list',
                data: {

                }
            }).then((result)=>{
                let data = result.data.hq;
                data.forEach(function(item) {
                    let price = item.marketPrice;
                    item.marketPrice = this.fmtPrice(price);
                }, this);
                this.recommend = data;
            })
        },
        // 购物车商品传id
        gotos(){
            this.$router.push({
                path:'/goods',
                query:{id}
            })
        },
        //热门-传id、跳转页面
        showDetails(id){
            // 跳转到页面顶层
            // router.afterEach((to, from, next) => {
                // window.scrollTo(0, 0);
            // });
            // console.log(id);
            this.$router.push({
                path:'/goods',
                query:{id}
            })
        }
    }
};
</script>

<style lang="less" scoped>
@import url('../../common/less/cart/cart.less');
</style>
