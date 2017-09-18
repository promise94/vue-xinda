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
                <p>店铺：信达北京服务中心</p>
                <div class="list-xx">
                    <p><img src="" alt=""></p>
                    <p>注册分公司</p>
                    <p>￥800</p>
                    <p>
                        <span class="xd xd-jian" @click="counter -= 1"></span>
                        <span><input type="text" :value="counter"></span>
                        <span class="xd xd-tianjia" @click="counter +=1"></span>
                    </p>
                    <p>￥800</p>
                    <p>删除</p>
                </div>
            </div>
        </div>
        <!-- 金额总计 -->
        <div class="totle">
            <p>金额总计<span>￥800.00</span></p>
            <div><a href="#/goods">继续购物</a></div>
            <div><a href="#/pay">去结算</a></div>
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
    },
    data(){
        return {
            counter:1,
            msg:'',
            recommend: '',
        }
    },
    methods: {
        getTuijian(){
            this.$http({
                method: 'post',
                url: '/recommend/list',
                data: {

                }
            }).then((result)=>{
                let data = result.data.hq;
                data.forEach(function(item) {
                    var price = item.marketPrice;
                    item.marketPrice = this.fmtPrice(price);
                }, this);
                this.recommend = data;
            })
        },
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        showDetails(id){
            console.log(id);
            this.$router.push({
                // path:'/cart',
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
