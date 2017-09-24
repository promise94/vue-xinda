<template>
    <div id="numberTime">
        <p>
            <span>订单号 : {{orderID}}</span>
            <span>下单时间 : {{time}}</span>
        </p>
    </div>
</template>

<script>

export default {
  name: 'numberTime',
  props: {orderID: String, time: String}
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