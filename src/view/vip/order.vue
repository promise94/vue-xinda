<template>
    <div id="order">
        <div class="orderTop">
            <div><p>我的订单</p></div>
            <div>
                <p>订单号:</p>
                <input type="text" placeholder="  请输入订单号搜索">
                <div>搜索</div>
            </div>
            <div>
                <p>创建时间:</p>
                <input type="text">
                <input type="text">
            </div>
        </div>
        <div class="orderCenter">
            <ul>
                <li>商品名称</li>
                <li>单价</li>
                <li>数量</li>
                <li>总金额</li>
                <li>订单状态</li>
                <li>订单操作</li>
            </ul>
        </div>
        <div class="orderBottom">
            <div>
                <numberTime></numberTime>
                <div>
                    <div>
                        <company></company>  
                    </div>
                    <div>
                        <button>付款</button>
                        <p>删除订单</p>
                    </div>
                </div>
            </div>

            <div>
                <numberTime></numberTime>
                <div>
                    <div>
                        <company></company>  
                        <company></company>   
                    </div>
                    <div>
                        <button>付款</button>
                        <p>删除订单</p>
                    </div>
                </div>
            </div>


            <div>
                <numberTime></numberTime>
                <div>
                    <div>
                        <company></company>  
                        <company></company> 
                        <company></company>   
                    </div>
                    <div>
                        <button>付款</button>
                        <p>删除订单</p>
                    </div>
                </div>
            </div>

            
            
        </div>
    </div>
</template>

<script>
import numberTime from './little/numberTime';
import company from './little/company';
export default {
    name: 'order',
    components: {
       numberTime,
       company
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/order.less';
</style>