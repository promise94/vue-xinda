<template>
    <div id="div_goods">
        <div class="container">
            <div class="biaoti">
                <p>首页/公司注册</p>
            </div>
            <div class="xiangqing">
                <img :src="img" alt="">
                <div>
                    <p>{{serviceName}}</p>
                    <p>{{serviceInfo}}</p>
                    <div>
                        <p>市场价:
                            <span>￥
                                <span>{{fmtPrice(shichang)}}</span>
                            </span>
                        </p>
                        <p>价&nbsp;&nbsp;&nbsp;格: ￥
                            <span>{{fmtPrice(xianjia)}}</span>元
                        </p>
                    </div>
                    <div>
                        <div>
                            <p>类&nbsp;&nbsp;&nbsp;型：</p>
                        </div>
                        <div>
                            <div class="bunumShuliang">

                                <p v-for="(item,indexe) in shangpinxiangqing">
                                    <span @click="huoquid(item.id,indexe)" v-bind:class="{leixing :color=== indexe }"> &nbsp;{{item.serviceName}}&nbsp;</span>
                                </p>

                            </div>
                        </div>
                    </div>
                    <p class="diqu">地&nbsp;&nbsp;&nbsp;区：
                        <span>{{datas.regionText}}</span>
                    </p>
                    <ul class="btn-numbox">
                        <span>购买数量：</span>
                        <li>
                            <ul class="count">
                                <li>
                                    <span id="num-jian" class="num-jian" v-on:click="numShuliang(0)">-</span>
                                </li>
                                <li><input @blur="onblur($event )" type="text" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')/1}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" v-model="num" class="input-num" id="input-num" /></li>
                                <li>
                                    <span id="num-jia" class="num-jia" v-on:click="numShuliang(1)"> +</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <div>
                        <a href="#/cart" @click="jiarugouwuche()">立即购买</a>
                        <button @click="jiarugouwuche($event)">加入购物车</button>
                    </div>
                </div>
                <div>
                    <div>
                        <p>顶级服务商</p>
                        <p>北京信达服务中心</p>
                        <a href="javascript:void(0)" @click="tanchukuang()">马上咨询</a>
                    </div>
                    <div>
                        <a href="javascript:void(0)" @click="dianpu(id)">查看服务商</a>
                    </div>
                </div>
            </div>
            <div class="guanggao">
                <img src="./../../common/images/u1225.png" alt="">
            </div>
            <div class="pinglun">
                <div>
                    <div v-on:click="myhover(0)" :class="{yanse:index ===0}">
                        服务内容
                    </div>
                    <div v-on:click="myhover(1)" v-bind:class="{yanse:index ===1}">
                        商品评价
                    </div>
                </div>
            </div>
            <!-- 服务内容显示 -->
            <div id="xianshi1" v-show="index === 0" v-html="htmle">
                {{htmle}}
            </div>
            <!-- 评论显示 -->
            <div id="xianshi2" v-show="index === 1">
                <div>
                    <div>
                        0%
                    </div>
                    <div>
                        <div>
                            <p>好评(0%)</p>
                            <p>中评(0%)</p>
                            <p>差评(0%)</p>
                        </div>
                        <div>
                            <div>
                                <div>

                                </div>
                            </div>
                            <div>
                                <div>

                                </div>
                            </div>
                            <div>
                                <div>

                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <p>客户印象</p>
                        <p>暂无印象标签</p>
                    </div>
                </div>
                <div>
                    <div v-on:click="erjiyincang(0)" :class="{yanse1:indexer ===0}">全部评价(
                        <span>0</span>)</div>
                    <div v-on:click="erjiyincang(1)" v-bind:class="{yanse1:indexer ===1}">好评(0)</div>
                    <div v-on:click="erjiyincang(2)" v-bind:class="{yanse1:indexer ===2}">中评(0)</div>
                    <div v-on:click="erjiyincang(3)" v-bind:class="{yanse1:indexer ===3}">差评(0)</div>
                </div>
                <div id="pingjia" v-show="indexer === 0">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价，第1页</div>
                </div>
                <div id="pingjia" v-show="indexer === 1">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价，第2页</div>
                </div>
                <div id="pingjia" v-show="indexer === 2">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价，第3页</div>
                </div>
                <div id="pingjia" v-show="indexer === 3">
                    <div>
                        <div>
                            <p>评价</p>
                        </div>
                        <div>
                            <p>满意度</p>
                        </div>
                        <div>
                            <p>用户</p>
                        </div>
                    </div>
                    <div>无评价，第4页</div>
                </div>
            </div>
        </div>

        <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert"></v-alert>
        <modal ref="name" class="dianhua">
            <div slot="header" class="header">
                <h3>免费电话咨询</h3>
            </div>
            <div slot="body" class="body" v-show="show === 1">
                <div><img src="../../../static/images/u1713.png" alt=""></div>
                <div>
                    <ul class="form">
                        <li class="huoqu">
                            <xd-input class="qingshuru" @getValue="getPhone" @blur="isPhone" @focus="isPhone(1)" :info="info.phoneInfo" :infoType="type.phoneType" placeholder="请输入手机号"></xd-input>
                        </li>
                        <li class="message huoqu">
                            <xd-captcha :info="info.captInfo" :upload="isload" :infoType="type.captType" @value="getValue " class="qingshuru"></xd-captcha>
                        </li>
                        <div class="message huoqu">
                            <xd-input @getValue="getCodeValue" @focus="isCodeNull(1)" @blur="isCodeNull" :info="info.msgInfo" :infoType="type.msgType" placeholder="请输入验证码" class="qingshuru"></xd-input>
                            <input @click="getCode" :disabled="btnEabale" type="button" :value="text" class="dianjihuoqu">
                        </div>
                        <li class="btn"><input @click.13="changePassword(2)" type="button" value="开始免费咨询" class="mianfeizixun"></li>
                    </ul>
                </div>
            </div>
            <div slot="body" class="body2" v-show="show === 2">
                <div><img src="../../../static/images/u1730.png" alt=""></div>
            </div>
            <div slot="button" class=" button1">
                <p>本次电话咨询完全免费，我们将对你的号码完全保密，请放心使用。</p>
            </div>
        </modal>

    </div>
</template>

<script>
import { mapActions } from 'vuex';//vuex的引入
import modal from '@/components/global/modal'; //弹出框引入
import vAlert from '@/components/global/alert';

import xdCaptcha from '@/components/user/captcha';
import xdInput from '@/components/user/input';
import reg from '@/common/js/reg';
import md5 from 'md5';
export default {
    name: 'div_goods',
    components: {
        modal,
        xdCaptcha,
        xdInput,
        vAlert,
    },
    created() {
        this.shopTypeId = this.$route.query.id;
        console.log(this.shopTypeId);
        this.getninumShuliang();
        let user = JSON.parse(sessionStorage.getItem('temp'));
        if (user && user.tempPhone) {
            this.phone = user.tempPhone;
        }
        // this.huoquid(id, indexe);
    },
    data() {
        return {
            shopTypeId: '',
            show: 1,
            modal_info: '',
            index: 0,//类型第几个
            color: 0, //类型颜色
            indexer: 0,
            num: 1,  //input 数量默认值
            shangpinxiangqing: '',
            datas: '',
            htmle: '',
            img: '',
            shichang: '',
            xianjia: '',
            leixing: '',
            serviceName: '',
            serviceInfo: '',

            id: '',

            info: { phoneInfo: '', captInfo: '', msgInfo: '', pwdInfo: '', SecondInfo: '' }, // 提示信息
            type: { phoneType: '', captType: '', msgType: '', pwdType: '', SecondType: '' }, // 提示类型
            code: '', // 图片验证码
            msgCode: '', // 短信验证码
            phone: '', // 电话号码
            password: '', // 密码
            secondPwd: '',
            time: 60,
            btnEabale: false,
            text: '点击获取',
            isload: '', // 是否重新加载图片验证码
            alert_options: { type: 'success', info: '' }, // 提示框设置
            fall: 0,
        }
    },
    methods: {
        ...mapActions(['cartAction']),

        // 获取用户输入图片验证码
        getValue(v) {
            this.code = v;
            this.isNull(1);
        },
        // 获取用户输入手机号
        getPhone(phone) {
            this.phone = phone;
        },
        // 获取密码
        getPassword(v) {
            this.password = v;
        },
         // 获取用户再次输入的密码
        getSecondPwd(v) {
            this.secondPwd = v;
        },
        // 获取用户输入验证码
        getCodeValue(v) {
            this.msgCode = v;
        },
        // 手机号验证
        isPhone(n) {
            if (n === 1) {  
                // 获取焦点,移除错误提示
                this.info.phoneInfo = '';
                this.type.phoneType = '';
            } else {
                this.type.phoneType = 'error';
                if (this.phone && !reg.isPhone(this.phone)) {
                    this.info.phoneInfo = '手机号格式错误';
                    return false;
                } else if (!this.phone) {
                    this.info.phoneInfo = '手机号不能为空';
                    return false;
                } else {
                    this.info.phoneInfo = '';
                    this.type.phoneType = '';
                    return true;
                }
            }
        },
        // 判断图片验证码是否为空
        isNull(n) {
            if (n === 1) {
                this.info.captInfo = '';
                this.type.captType = '';
            } else {
                if (!this.code) {
                    this.type.captType = 'error';
                    this.info.captInfo = '请输入验证码';
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 判断短信验证码是否为空
        isCodeNull(n) {
            if (n === 1) {
                this.info.msgInfo = '';
                this.type.msgType = '';
            } else {
                if (!this.code) {
                    this.type.msgType = 'error';
                    this.info.msgInfo = '请输入验证码';
                    return false;
                } else {
                    return true;
                }
            }
        },
        // 点击获取验证码
        getCode(v) {
            if (this.isPhone() && this.isNull()) {
                // 发送请求
                this.$http.post('/register/sendsms', { cellphone: this.phone, smsType: 2, imgCode: this.code })
                    .then((res) => {
                        if (res.status === 1) {
                            this.info.captInfo = res.msg;
                            this.type.captType = 'success';
                            this.btnEabale = true; // 禁用按钮
                            this.alert_options.type = 'success';
                            this.alert_options.info = res.msg;
                            this.$refs.alert.alert();
                            // 启动读秒进度
                            this.text = this.time + 's';
                            let t = setInterval(() => {
                                this.text = (this.time -= 1) + 's';
                                if (this.time == 0) {
                                    clearInterval(t);
                                    this.time = 60;
                                    this.text = '点击获取';
                                    this.btnEabale = false;
                                }
                            }, 1000);
                        } else {
                            this.info.captInfo = res.msg;
                            this.type.captType = 'error';
                            this.isload = Math.random().toString().substr(2, 4);
                        }
                    });
            }
        },
        // 免费咨询
        changePassword(n) {
            if (this.isPhone() && this.isNull() && this.isCodeNull()) {
                this.show = n;

            }
        },
        // 点击切换样式
        myhover(n) {
            this.index = n;
        },
        // 二级隐藏
        erjiyincang(c) {
            this.indexer = c;
        },
        // 处理价格
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        // 加减
        numShuliang(n) {
            // console.log(n);
            if (n === 0) {
                this.num === 1 ? '' : this.num--;
            } else if (n === 1) {
                this.num++;
            }
        },
        // 加入购物车
        jiarugouwuche(ev) {
            this.$http({
                method: 'post',
                url: '/cart/add',
                data: {
                    id: this.$route.query.id,
                    num: this.num,
                }
            }).then((res) => {
                this.alert_options.info = res.msg;
                this.alert_options.type = 'success';

                this.$refs.alert.alert();
            })
            this.$root.eventHub.$emit('add', ev);
        },
        // 视角时间
        onblur(eiv) {
            let infor = eiv.target.value;
            this.num = infor;
            console.log(this.num);
        },
        // 获取id
        huoquid(id, indexe) {
            this.shopTypeId = id;
            this.getninumShuliang();
            this.color = indexe;
        },
        // 商品详情获取
        getninumShuliang() {
            this.$http({
                method: 'post',
                url: '/product/package/detail',
                data: {
                    sId: this.shopTypeId,
                }
            }).then((result) => {
                let data = result.data.serviceList;
                this.datas = result.data;
                // 图片
                this.img = 'http://115.182.107.203:8088/xinda/pic/' + result.data.product.img;
                this.htmle = result.data.providerProduct.serviceContent;
                this.shichang = result.data.product.marketPrice;
                this.xianjia = result.data.providerProduct.price;
                this.serviceName = result.data.providerProduct.serviceName;
                this.serviceInfo = result.data.providerProduct.serviceInfo;
                this.leixing = result.data.product.name;
                this.id = this.datas.providerProduct.providerId;
                data.forEach(function(item, index) {
                }, this);
                this.shangpinxiangqing = data;
            })
        },











        dianpu(id) {
            this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            }),
                this.$router.push({
                    path: '/storeIndex',
                    query: { id }
                }),
                console.log(id);
        },
        // 弹出框
        tanchukuang() {
            this.$refs.name.confirm().then(() => {
                this.$refs.name.show = false;
            }).catch(() => {

            })
        },
    }
}
</script>

<style lang="less" >
@import '../../common/less/global/cssreset.less';
@import '../../common/less/global/cssreset.less';
@import '../../common/less/goods/goods.less';
.body2 {
    width: 500px;
    height: 200px;
    div {
        margin: 0 auto;
    }
}

.leixing {
    color: #2693d4 !important;
    border: 1px solid #2693d4 !important;
}

.quanbuchanpin {
    .yincang {
        display: none;
    }
    &:hover {
        .yincang {
            display: block;
        }
    }
}
</style>