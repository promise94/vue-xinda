<template>
    <div id="company">     
        <img src="../../../common/images/logo.png" alt="">
        <p>
            <span>信达北京服务中心</span>
            <span>注册分公司</span>
        </p>
        <p>￥800.00</p>
        <p>1</p>
        <div>￥800.00</div>
        <div>等待买家付款</div>
        
    </div>
</template>

<script>

export default {
  name: 'company'
};
</script>

<style lang="less" scoped>
#company{
    border-top: 1px solid #e8e8e8;
    display: flex;
    img{
        width:50px;
        height:50px;
        margin:10px 15px;
    }
    p:nth-of-type(1){
        text-align:left;
        width:225px;
        padding: 10px 0;
        span{
            display: block;
            line-height: 25px; 
        }
                             
    }
    p:nth-of-type(2){
        width:125px;
        line-height: 70px; 
    }
    p:nth-of-type(3){
        width:100px;
        line-height: 70px; 
    }
    div{
        width:143px;
        color:#2594d4;
        line-height: 70px; 
    }
}
</style>