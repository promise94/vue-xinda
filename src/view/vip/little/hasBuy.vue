<template>
    <div id="hasBuy">     
        <div><img src="../../../common/images/logo.png" alt=""></div>
        <div>
            <h3>信达北京服务中心</h3>
            <p>服务单号 ： <span>B1823</span></p>
            <p>购买内容 ： test</p>
        </div>
        <div>购买时间 : 2017-04-01 01:23:32</div> 
    </div>
</template>

<script>

export default {
  name: 'hasBuy'
};
</script>

<style lang="less" scoped>
#hasBuy{
    height:120px;
    padding:15px 0;
    display: flex;
    >div:nth-of-type(1){
            width:80px;
            height:80px;
            padding: 10px;
            margin:15px;
            border: 1px solid #ccc;
            img{
                width:100%; 
            }
        }
        >div:nth-of-type(2){        
            h3{
                font-size: 18px;
            }
            p{
                font-size: 16px;
                margin-top:20px;
                span{
                    color:red;
                }
            }       
        }
        >div:nth-of-type(3){
            width:483px;
            margin-left: 45px;
            line-height: 120px;
        }
}
</style>