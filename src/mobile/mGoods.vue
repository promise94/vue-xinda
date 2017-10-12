<template>
    <div id="asd">
        <mt-header fixed class="headera" :title="title" >
            <div slot="left" @click="go(-1)">
                <span class="back xd xd-fanhui"></span>
            </div>
        </mt-header>
        <div class="img">
            <div>
                <img :src="img" alt="">
                <div>
                    <p>{{serviceName}}</p>
                    <p>{{serviceInfo}}</p>
                </div>
            </div>
        </div>
        <div class="price">
            <div>
                <p>区域：
                    <span>{{datas.regionText}}</span>
                </p>
            </div>
            <div>
                <p>价格：
                    <span>
                        {{fmtPrice(xianjia)}}
                    </span>
                    <span>
                        ￥{{fmtPrice(shichang)}}
                    </span>
                </p>
            </div>
        </div>
        <div class="headline">
            <span>服务商家</span>
            <div class="arrows"></div>
        </div>
        <div class="shop">
            <div>
                <div>
                    <img :src="shopimg" alt="">
                </div>
                <div>
                    <span>金牌服务商</span>
                </div>
            </div>
            <div>
                <p>{{shopname}}</p>
                <p>
                    <span>
                        信誉
                    </span>
                    <span class="xd xd-dengji"></span>
                    <span class="xd xd-dengji"></span>
                    <span class="xd xd-dengji"></span>
                    <span class="xd xd-dengji"></span>
                    <span class="xd xd-dengji"></span>
                </p>
                <p>{{shopsite}}</p>
                <p>累计服务客户次数：
                    <span>{{orderNum}}</span>
                </p>
                <div @click="dianpu(Id)">进入店铺</div>
            </div>
        </div>
        <div class="headline">
            <span>服务介绍</span>
            <div class="arrows"></div>
        </div>
        <!-- 没获取到 -->
        <div v-show="show">
            <span class="xd xd-weizhaodaoshuju" id="noe"><br>
                <span id="noer">未找到数据</span>
            </span>
        </div>
        <div class="serve">
            <div v-html="htmle">
                {{htmle}}
            </div>
        </div>
        <div class="headline">
            <span>用户评价</span>
            <div class="arrows"></div>
        </div>
        <div>
            <span class="xd xd-weizhaodaoshuju " id="noe"> <br>
                <span id="noer">未找到数据</span>
            </span>

        </div>
        <!-- <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert"></v-alert> -->
        <div class="caidan">
            <div @click="tanchukuang()">
                <span class="xd xd-kefu"></span>
                <span>联系商家</span>
            </div>
            <div @click="jiarugouwuche(1)">加入购物车</div>
            <div @click="jiarugouwuche(0)">立即购买</div>
        </div>
        <modal ref="name" class="dianhua">
            <div slot="header" class="header">
                <h3>免费电话咨询</h3>
            </div>
            <div slot="body" class="body">
                <div v-show="a === 1">
                    <p>本次电话咨询完全免费，我们将对你的号码完全保密，请放心使用。</p>
                </div>
                <div>
                    <ul class="form" v-show="a === 1">
                        <li class="huoqu">
                            <xd-input class="qingshuru" @getValue="getPhone" @blur="isPhone" @focus="isPhone(1)" :info="info.phoneInfo" :infoType="type.phoneType" placeholder="请输入手机号"></xd-input>
                        </li>
                        <li class="message huoqu">
                            <xd-captcha :info="info.captInfo" :upload="isload" :infoType="type.captType" @value="getValue " class="qingshuru"></xd-captcha>
                        </li>
                        <div class="message huoqu">
                            <xd-input @getValue="getCodeValue" @focus="isCodeNull(1)" @blur="isCodeNull" :info="info.msgInfo" :infoType="type.msgType" placeholder="请输入验证码" class="aaa"></xd-input>
                            <input @click="getCode" :disabled="btnEabale" type="button" :value="text" class="bbb">
                        </div>
                        <li class="btn"><input @click.13="changePassword(2)" type="button" value="开始免费咨询" class="mianfeizixun"></li>
                    </ul>
                </div>
            </div>
            <div slot="body" class="body2" v-show=" a  === 2">
                <div><img src="../../static/images/u1730.png" alt=""></div>
            </div>
            <div slot="button" class=" button1">
            </div>
        </modal>
    </div>
</template>

<script>
import modal from '@/components/global/modal';
import xdInput from '@/components/user/input';
import vAlert from '@/components/global/alert';
import reg from '@/common/js/reg';
import xdCaptcha from '@/components/user/captcha';
// box
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
// import { mapActions } from 'vuex';//vuex的引入
import { mapGetters } from 'vuex';//vuex的引入
import { Toast } from 'mint-ui';
export default {
    name: 'Mgoods',
    components: {
        modal,
        xdCaptcha,
        xdInput,
        vAlert,
    },
    data() {
        return {
            title: '商品详情', // header文字信息
            // show: false, // header是否显示
            a: 1,
            modal_info: '',
            // info: { phoneInfo: '', captInfo: '', msgInfo: '', pwdInfo: '', SecondInfo: '' }, // 提示信息
            // type: { phoneType: '', captType: '', msgType: '', pwdType: '', SecondType: '' }, // 提示类型
            num: 1,
            // shopTypeId:'',
            // 没获取到 默认不显示
            show: false,
            // 商家logo
            shopimg: '',
            // 服务次数
            orderNum: 0,
            // 商家地址
            shopsite: '',
            // 商家名字
            shopname: '',
            // 空数组
            Arre: '',
            datas: '',
            // 服务内容
            htmle: '',
            // 市场价
            shichang: '',
            // 现价
            xianjia: '',
            // 图片
            img: '',
            serviceName: '',
            serviceInfo: '',
            sId: '',
            shangpinxiangqing: '',
            Id: '',
            conf: {
                start: 0, //分页起始数
                limit: 2, //每页数量
                productTypeCode: '', //产品类型
                regionId: '', //省市区地址区号
                sort: 1,//价格升序排列,
                // id: this.Id,
            },
            arr: '',


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
    created() {
        this.sId = this.$route.query.id;
        this.Id = this.$route.query.Id;
        this.getninumShuliang();
        this.getStoreList();
        Indicator.open('加载中...'); // 页面初始加载提示
        watch: {
            // console.log(this.$route.path);
            if (this.$route.path === '/mGoods') {
                // console.log(1);
            }
        }
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    methods: {
        go(n) {
            history.go(n);
        },
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
                this.a = n;
            }
        },



        tanchukuang() {
            this.$refs.name.confirm().then(() => {
                this.$refs.name.show = false;
            }).catch(() => {

            })
        },
        fmtPrice(p) {
            return (parseFloat(p) * 0.01).toFixed(2);
        },
        jiarugouwuche(ev) {
            if (ev === 0) {

                this.$http({
                    method: 'post',
                    url: '/cart/add',
                    data: {
                        id: this.sId,
                        num: this.num,
                    }
                }).then((res) => {
                    // this.$store.dispatch('cartAction');
                    this.$router.push({ path: '/m/cart', });
                })
            } else {
                if (!this.getUser.status) {
                    this.$router.push('/m/my/login');
                    return false;
                }
                this.$http({
                    method: 'post',
                    url: '/cart/add',
                    data: {
                        id: this.sId,
                        num: this.num,
                    }
                }).then((res) => {
                    // 弹出框提醒
                    Toast({
                        message: '操作成功',
                        // position: 'bottom',
                        duration: 1000,
                    });
                    // this.alert_options.info = res.msg;
                    // this.alert_options.type = 'success';
                    // this.$refs.alert.alert();
                    // this.$store.dispatch('cartAction');
                })
            }
        },
        dianpu(id) {
            this.$router.push({
                path: '/m/storeindex',
                query: { id }
            });
        },
        getninumShuliang() {
            this.$http({
                method: 'post',
                url: '/product/package/detail',
                data: {
                    sId: this.sId,
                }
            }).then((result) => {
                let data = result.data.serviceList;
                this.datas = result.data;
                // 图片
                this.img = 'http://115.182.107.203:8088/xinda/pic' + result.data.product.img;
                // console.log(result);
                this.htmle = result.data.providerProduct.serviceContent;
                // console.log(this.htmle);
                if (this.htmle === '') {
                    this.show = true;
                    // console.log('1');
                }
                // this.shopTypeId = 
                // console.log(result);
                // 市场价
                this.shichang = result.data.product.marketPrice;
                // 现价
                this.xianjia = result.data.providerProduct.price;
                // 商品名字
                this.serviceName = result.data.providerProduct.serviceName;
                // 商品介绍
                this.serviceInfo = result.data.providerProduct.serviceInfo;
                // this.leixing = result.data.product.name;
                // this.id = this.datas.providerProduct.providerId;
                data.forEach(function(item, index) {

                }, this);
                this.shangpinxiangqing = data;
            })
        },
        //店铺列表后台数据获取
        getStoreList() {
            this.$http({
                method: 'post',
                url: '/provider/grid',
                data: this.conf,
            }).then((result) => {
                let data = result.data;
                // console.log(data);
                this.arr = data;
                data.forEach(function(item) {
                    if (this.Id === item.id) {
                        this.Arre = item.id;
                        // 商家名字
                        this.shopname = item.providerName;
                        // 商家地址
                        this.shopsite = item.regionName;
                        // 服务次数
                        this.orderNum = item.orderNum;
                        // 商家图片
                        this.shopimg = 'http://115.182.107.203:8088/xinda/pic' + item.providerImg;
                        // console.log(item);
                        return;
                    }
                }, this);
                // this.arr = data;
                // console.log(data);
                if (this.shangpinxiangqing && this.arr) {
                    Indicator.close(); // 加载提示关闭 
                }
            })
        },

    }
};
</script>

<style lang="less">
.headera {
    height: .38rem;
    background-color: #e5e5e5;
    color: #000;
    .back {
        color: #676767;
    }
}
// 未找到数据
#noe {
    font-size: 1rem;
    text-align: center;
    display: block;
}

#noer {
    width: 3.75rem;
    text-align: center;
    font-size: 0.2rem;
    display: block;
}

.body2 {
    >div {
        >img {
            width: 3rem;
            height: 3rem;
        }
    }
}

.dianhua {
    width: 80%;
    height: 80%;
    >div {
        min-width: 2rem!important;
    }
    .button1 {
        font-size: 0.14rem;
    }
    .body {
        >div:nth-child(1) {
            >p {
                width: 2.8rem;
            }
        }
        >div:nth-child(2) {
            >ul {
                >li:nth-child(1) {
                    >input {
                        width: 2.8rem; // margin-top: 0.1rem;
                    }
                }
                >li:nth-child(2) {
                    >div {
                        >div {
                            margin-top: 0.1rem;
                            >input {
                                width: 1.8rem;
                            }
                        }
                    }
                }
                >div:nth-child(3) {
                    .aaa {
                        input {
                            width: 1.8rem;
                        }
                    }
                    .bbb {
                        margin-left: 0.1rem;
                        width: 0.8rem;
                        height: 0.36rem;
                    }
                }
                .btn {
                    margin-top: 0.1rem;
                    input {
                        width: 100%;
                        height: 0.36rem;
                    }
                }
            }
        }
        div:nth-child(3) {}
    }
}

.dada {
    width: 2rem;
}

.caidan {
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 1.1rem;
    background: #f8f8f8;
    >div {
        width: 33%;
        height: 0.575rem *2;
        font-size: 0.14rem;
        line-height: 0.575rem;
        text-align: center;
    }
    div:nth-child(1) {
        width: 34%;
        background: #eeeff3;
    }
    div:nth-child(2) {
        width: 33%; // text-align: center;
        color: #fff;
        background: #2693d4;
    }
    div:nth-child(3) {
        width: 33%;
        color: #fff;
        background: #fb4146;
    }
}

.img {
    div:nth-child(1) {
        position: relative;
        img {
            width: 3.75rem;
            height: 2.385rem;
        }
        div:nth-child(2) {
            width: 100%;
            position: absolute;
            bottom: 0;
            background: rgba(130, 130, 130, 0.8);
            opacity: 0.8;
            >p:nth-child(1) {
                font-size: 0.15rem;
                line-height: 0.295rem;
                font-weight: bold;
                color: #fefefe;
                margin-left: 0.16rem;
            }
            >p:nth-child(2) {
                color: #fefefe;
                margin-left: 0.16rem;
                font-size: 0.11rem;
                line-height: 0.295rem;
            }
        }
    }
    div:nth-child(2) {
        >p:nth-child(1) {
            font-size: 0.15rem;
            line-height: 0.295rem;
            font-weight: bold;
        }
        >p:nth-child(2) {
            font-size: 0.11rem;
            line-height: 0.295rem;
        }
    }
}

.price {
    border-bottom: 0.025rem solid #ebebeb;
    div:nth-child(1) {
        margin-left: 0.215rem;
        border-bottom: 0.005rem solid #c5c5c5;
        p {
            line-height: 0.32rem;
        }
    }
    div:nth-child(2) {
        margin-left: 0.215rem;
        p {
            font-size: 0.12rem;
            line-height: 0.32rem;
            span:nth-child(1) {
                color: #fd0100;
                font-weight: bold;
                font-size: 0.2rem;
            }
            span:nth-child(2) {
                margin-left: 0.1rem;
                text-decoration: line-through;
            }
        }
    }
}

// 标题
.headline {
    height: 0.35rem;
    width: 100%;
    position: relative;
    border-bottom: 0.01rem solid #2693d4;
    span {
        line-height: 0.35rem;
        margin-left: 0.2rem
    }
}

// 三角
.arrows {
    width: 0rem;
    height: 0rem;
    border-left: 0.01rem solid transparent;
    border-right: 0.01rem solid transparent;
    border-bottom: 0.03rem solid #2693d4;
    font-size: 0;
    line-height: 0;
    position: absolute;
    left: 0.45rem;
    top: 0.32rem;
}

// 商铺
.shop {
    // height: 1.21rem;
    border-bottom: 0.025rem solid #c5c5c5;
    display: flex;
    >div:nth-child(1) {
        margin-left: 0.2rem;
        width: 1.23rem;
        height: 1.21rem;
        div:nth-child(1) {
            height: 0.96rem;
            img {
                width: 100%;
                height: 100%;
            }
        }
        div:nth-child(2) {
            text-align: center;
            font-size: 0.07rem;
        }
    }
    >div:nth-child(2) {
        margin-left: 0.2rem;
        font-size: 0.07rem;
        >p:nth-child(1) {
            margin-top: 0.175rem;
        }
        >p:nth-child(2) {
            margin-top: 0.075rem;
            text-align: center;
            span {
                color: red;

                margin-top: 0.1rem;
            }
            span:nth-of-type(1) {
                margin-top: 0;
                color: #000; // line-height: 0.2rem;
            }
        }
        >p:nth-child(3) {}
        >p:nth-child(4) {
            margin-top: 0.075rem;
        }
        >p:nth-child(5) {}
        >div {
            line-height: 0.165rem;
            text-align: center;
            color: #fff;
            font-size: 0.06rem;
            width: 0.51rem;
            height: 0.165rem;
            background: #ff591b;
            border-radius: 0.025rem;
        }
    }
}

// 服务介绍
.serve {
    border-bottom: 0.025rem solid #c5c5c5;
    div {
        margin: 0.1rem 0 0.1rem 0.15rem;
    }
    table {
        width: 96% !important;
        img {
            width: 100% !important;
        }
    }
    blockquote {
        width: 100% !important;
    }
}
</style>
