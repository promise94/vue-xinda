<template>
    <div class="container contan" id="div_pay">
        <!-- 首页/支付 -->
        <div class="con-header">
            <span>首页/</span>
            <span>支付</span>
        </div>
        <div class="qiehuan">
            <!-- 1 -->
            <div class="div_xiangqing" v-show="itms ===0">
                <p class="pp">订单详情</p>
                <!-- 订单列表 -->
                <div class="pay-list">
                    <div>
                        <span>订单编号：
                            <a>{{recommend.businessNo}}</a>
                        </span>
                        <span>创建时间：
                            <a>{{recommend.createTime}}</a>
                        </span>
                        <span>
                            <p>订单总额:
                                <a>￥{{recommend.price}}</a>元</p>
                            <p @click="getMingxi(),fn()">订单明细
                                <a class="xd xd-icon-up"></a>
                            </p>
                        </span>
                    </div>
                </div>
                <!-- 订单明细 -->
                <div class="mingxi" v-if="willShow">
                    <div v-for="(item1, k) of recommend1" :key="k">
                        <span>服务名称：
                            <a>{{item1.serviceName}}</a>
                        </span>
                        <span>单价：
                            <a>￥{{item1.unitPrice}}元</a>
                        </span>
                        <span>数量：
                            <a>{{item1.buyNum}}</a>
                        </span>
                        <span>服务总额：
                            <a>￥{{item1.totalPrice}}</a>元</span>
                    </div>
                </div>
                <!-- 支付方式 -->
                <div class="pay-way">
                    <p>支付方式</p>
                </div>
                <!-- 支付列表 -->
                <div class="way-list">
                    <!-- 方式 -->
                    <div>
                        <p>非网银支付</p>
                        <div>
                            <input type="radio" name="a" @click="fangshi='1'">
                            <img src="../../common/images/yinlian.jpg" alt="">
                        </div>
                        <p>平台支付</p>
                        <div>
                            <div>
                                <input type="radio" name="a" @click="fangshi='2'">
                                <span class="xd xd-weixin">
                                    <a>微信支付</a>
                                </span>
                            </div>
                            <div>
                                <input type="radio" name="a" @click="fangshi='3'">
                                <img src="../../common/images/zhifubao.jpg" alt="">
                            </div>
                        </div>
                        <p>自助转账</p>
                        <div>
                            <input type="radio" name="a" @click="fangshi='4'">&nbsp;&nbsp;&nbsp;
                            <img src="../../common/images/zizhu.png" alt="">
                            <div class="kaihuhang">
                                <p>开户账号：
                                    <a>110916853310605</a><br> 开户名：
                                    <a>北京爱蓝领网络科技有限公司</a><br> 开户行：
                                    <a>招商银行股份有限公司北京东三环支行</a>
                                </p>
                            </div>
                        </div>
                        <p class="p">注：转账时请将订单编号备注在付款信息里；转账完成后，请通知客服</p>
                    </div>
                    <!-- 二维码 -->
                    <div v-show="index === 1">
                        <div>
                            <p>微信支付</p>
                            <p class="xd xd-guanbi" v-on:click="fanhui(0)"></p>
                        </div>
                        <img src="" alt="">
                        <p>请使用微信扫一扫 进行扫码支付</p>
                        <span v-on:click="wanchang(1)">
                            <a>已完成支付</a>
                        </span>
                        <span v-on:click="wanchang(2)">
                            <a>支付遇到问题</a>
                        </span><br>
                        <a class="a" v-on:click="fanhui(0)">返回重新选择支付方法</a>
                    </div>
                </div>
                <!-- 立即支付 -->
                <div class="pay-pay">
                    <p>金额总计
                        <span>￥{{recommend.price}}</span>
                    </p>
                    <span @click="submit(),ckpay(1)">立即支付</span>
                </div>
            </div>
            <!-- 弹出框 -->
            <modal ref="name2" >
                <div slot="body">
                    <h1>{{modal_info}}</h1>
                </div>
            </modal>
            <!-- 反馈框 -->
            <modal ref="name3" :options="options">
                <div slot="body">
                    <h1>{{modal_info}}</h1>
                </div>
            </modal>
            <!-- 2 -->
            <div v-show="itms === 1">
                <p class="pp">支付成功</p>
                <div class="pay-list">
                    <div class="div_succeed">
                        <div>
                            <img src="../../common/images/xiaolian.png" alt="">
                        </div>
                        <div>
                            <p>支付成功！</p>
                            <p>感谢您的购买！</p>
                            <p>我们将尽快确认您的（订单号为：
                                <a>{{recommend.businessNo}}</a>）付款信息。</p>
                            <p>如有问题，请联系客服：
                                <span>010-83421842</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 3 -->
            <div v-show="itms === 2">
                <p class="pp">支付失败</p>
                <div class="pay-list">
                    <div class="div_succeed">
                        <div>
                            <img src="../../common/images/kulian.png" alt="">
                        </div>
                        <div>
                            <p>支付失败！</p>
                            <p>&nbsp</p>
                            <p>支付未成功：让我们再试一次吧！
                                <span v-on:click="fanhui(0)">返回支付页</span>
                            </p>
                            <p>如有问题，请联系客服：
                                <span>010-83421842</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import modal from '@/components/global/modal';
export default {
    name:'div_pay',
    components:{
        // numberTime,
        modal,
    },
    created() {
        this.getDingdan();
    },
    data() {
        return {
            itms: 0,
            index: 0,
            willShow: false,
            fangshi: 0,
            recommend: '',
            recommend1: '',
            money: 0,
            unionPay: '',
            modal_info:'',
            options:{confirmButtonText:'支付成功',cancelButtonText:'支付失败'}
        }
    },
    methods: {
        // 订单获取
        getDingdan() {
            this.$http.post(
                '/pay/detail',
                {
                    businessNo: this.$route.query.val
                }
            ).then((res) => {
                let data = res.data;
                data.price = this.fmtPrice(data.price);
                let d=new Date(data.createTime);
                data.createTime = this.formatDate(d);
                this.recommend = data;
            })
        },
        //订单明细
        getMingxi() {
            this.$http.post(
                '/business-order/detail',
                {
                    businessNo: this.$route.query.val
                }
            ).then((res) => {
                if (res.status == 1) {
                    let data = res.data.serviceOrderList;
                    data.forEach(function(item) {
                        let unitPrice = item.unitPrice;
                        let totalPrice = item.totalPrice;
                        item.unitPrice = this.fmtPrice(unitPrice);
                        item.totalPrice = this.fmtPrice(totalPrice);
                    }, this);
                    this.recommend1 = data;
                }
            })
        },
        // 订单详情的显示、隐藏
        fn() {
            if (this.willShow == false) {
                this.willShow == true
            } else {
                this.willShow == false
            }
        },
        //价格转化
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        //时间戳转换时间
        formatDate(now) {     
              let   year=now.getYear();     
              let   month=now.getMonth()+1;     
              let   date=now.getDate();     
              let   hour=now.getHours();     
              let   minute=now.getMinutes();     
              let   second=now.getSeconds();     
              return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
              },
        //立即支付
        submit() {
            if (this.fangshi == 0) {
                this.getKuang();
            } else if (this.fangshi == 1) {
                this.getYinlian();
            } else if (this.fangshi == 2) {
                this.getTanChuKuang();
            } else if (this.fangshi == 3) {
                this.getTanChuKuang();
            } else if (this.fangshi == 4) {
                this.getTanChuKuang();
            }
        },
        // 银联支付
        getYinlian() {
            this.$http.post(
                '/pay/china-pay',
                {
                    businessNo:this.recommend.businessNo
                }
            ).then((res) => {
                sessionStorage.setItem("payment", res);//暂存数据
                window.open('/#/yinlian');//跳转页面
                this.getFanKui();
            })
        },
        // --
        ckpay(n) {
        //     this.index = n;
        },
        wanchang(m) {
            this.itms = m;
        },
        fanhui(z) {
            this.itms = z;
            this.index = 4;
        },
        //支付明细
        fn() {
            if (this.willShow == true) {
                this.willShow = false;
            } else {
                this.willShow = true
            }
        },
        //弹出框
        getTanChuKuang(){
            this.modal_info = '请选择其他支付方式！';
            this.$refs.name2.confirm().then(()=>{
                this.$refs.name2.show = false;
            }).catch(()=>{
                //取消回掉函数
            })
        },
        //反馈框
        getFanKui(){
            this.modal_info = '支付是否成功？';
            this.$refs.name3.confirm().then(()=>{
                this.$refs.name3.show = false;
                this.fanhui(1);
            }).catch(()=>{
                this.fanhui(2);
            })
        },
        //没有选支付的弹出框
        getKuang(){
            this.modal_info = '请选择支付方式！！！';
            this.$refs.name2.confirm().then(()=>{
                this.$refs.name2.show = false;
            }).catch(()=>{
                //取消回掉函数
            })
        }
    }
};
</script>

<style lang="less" scoped>
@import url('../../common/less/global/base.less');
@import url('../../common/less/pay/pay.less');
</style>
