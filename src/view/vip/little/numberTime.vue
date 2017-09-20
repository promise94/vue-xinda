<template>
    <div id="numberTime">
        <p>
            <span>订单号 : s347484929274490</span>
            <span>下单时间 : 2017-04-01 01:23:32</span>
        </p>
    </div>
</template>

<script>

export default {
  name: 'numberTime'
};
</script>

<style lang="less" scoped>
#numberTime{
    p{
        width:936px;
        background: #f7f7f7;
    }
    p span{
        height: 40px;
        line-height: 40px; 
        margin-left: 30px; 
    } 
}
</style>