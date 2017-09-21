<template>
    <div id="order">
        <div class="orderTop">
            <div>
                <p>我的订单</p>
            </div>
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
                        <button @click="modalShow">付款</button>
                        <p>删除订单</p>
                    </div>
                </div>
            </div>
        </div>
        <modal ref="dialog">
            <div slot="body">
                <h1>这是 自定义的</h1>
            </div>
        </modal>
    </div>
</template>

<script>
import numberTime from './little/numberTime';
import company from './little/company';
import modal from '@/components/global/modal';
export default {
    name: 'order',
    components: {
        numberTime,
        company,
        modal,
    },
    data(){
        return {
            time: this.newTime,
        }
    },
    computed: {
        newTime: ()=>{(new Date()).toJSON().substr(0,(new Date()).toJSON().indexOf('T'))}
    },
    created() {
        this.getServiOrder();
    },
    methods: {
        getServiOrder() {
            this.$http.post('/service-order/grid', { businessNo: 1, endTime: '2017-09-21', start: 0 })
                .then((res) => {
                    console.log(res);
                    console.log(this.time);
                })
        },
        modalShow() {
            this.$refs.dialog.confirm().then(() => {
                // 点击确定按钮的回调处理
                this.$refs.dialog.show = false;
            }).catch(() => {
                // 点击取消按钮的回调处理
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/order.less';
</style>