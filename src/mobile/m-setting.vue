<template>
    <div id="setting">
        <div class="zhanghu">
            <h4>账户设置</h4>
            <div>
                <span>当前头像 :</span>
                <div>
                    <div class="userimg">
                        <img :src="headImgSrc" alt="">
                        <input @change="getFile($event)" type="file">
                    </div>
                </div>
            </div>
            <div>
                <span>姓名 :</span>
                <input v-model="name" type="text">
            </div>
            <div class="sex">
                <span>性别 :</span>
                <mt-radio v-model="sex" :options="radioOption"></mt-radio>
            </div>
            <div class="email">
                <span>邮箱 :</span>
                <v-input @getValue="getEmail" :value="email.sync" @blur="isEmail()" @focus="isEmail(1)" :info="info.emailInfo" :infoType="type.emailType" placeholder="请输入邮箱">
                </v-input>
            </div>
            <div class="diqu">
                <span>所在地区 :</span>
                <province @province="getProv" :regionId="370203"></province>
            </div>
            <button @click="saveInfo">保存</button>
        </div>
        <!-- 密码修改 -->
        <div class="change">
            <h4>修改密码</h4>
            <div>
                <span>旧密码 :</span>
                <v-input @getValue="getOldPassword" @blur="isPassword({sign:'old'})" @focus="isPassword({sign:'old',n:1})" type="password" :info="info.oldInfo" :infoType="type.oldType" placeholder="请输入旧密码(8-16位数字和字母)">
                </v-input>
            </div>
            <div>
                <span>新密码 :</span>
                <v-input @getValue="getPassword" @blur="isPassword({})" @focus="isPassword({n:1})" type="password" :info="info.pwdInfo" :infoType="type.pwdType" placeholder="请输入新密码(8-16位数字和字母)">
                </v-input>
            </div>
            <div>
                <span>再次输入新密码 :</span>
                <v-input @getValue="getSecondPwd" @blur="isSecondPwd" @focus="isSecondPwd(1)" type="password" :info="info.SecondInfo" :infoType="type.SecondType" placeholder="请再次输入新密码(8-16位数字和字母)">
                </v-input>
            </div>
            <button @click="savePassword">保存</button>
        </div>
        <v-alert :type="alert_options.type" :info="alert_options.info" ref="alert"></v-alert>
    </div>
</template>

<script>
import province from '@/components/global/province';
import vInput from '@/components/user/input';
import vAlert from '@/components/global/alert';
import reg from '@/common/js/reg';
import md5 from 'md5';
// vuex
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

export default {
    name: 'setting',
    components: {
        province,
        vInput,
        vAlert,
    },
    data() {
        return {
            headImg: '', // 用户头像
            saveImg: '', // 用户头像提交后台数据
            name: '', // 用户名
            prov: '', // 省市区
            email: '', // 邮箱
            oldPassword: '', // 旧密码
            password: '', // 新密码
            secondPwd: '', // 再次输入密码
            info: { oldInfo: '', pwdInfo: '', SecondInfo: '', emailInfo: '' }, // 提示信息
            type: { oldType: '', pwdType: '', SecondType: '', emailType: '' }, // 提示类型
            alert_options: { type: 'success', info: '' }, // 提示框设置
            sex: '',
            radioOption: [{ label: '男', value: 1 }, { label: '女', value: 2 }]
        }
    },
    created() {
        setTimeout(() => {
            let info = this.userInfo.info;
            this.name = info.name;
            this.sex = info.gender ? info.gender : '';
            this.email = info.email ? info.email : '';
            this.headImg = info.headImg;
        }, 500);
    },
    computed: {
        ...mapGetters({ userInfo: 'getUser' }),
        headImgSrc() { // 头像图片
            let src = this.headImg ? this.headImg : '../../../static/images/user.png';
            return src;
        }
    },
    methods: {
        ...mapActions(['infoAction']),
        getProv(val) { // 获取省市区
            this.prov = val;
        },
        getEmail(email) { // 获取邮箱
            this.email = email;
        },
        getOldPassword(v) { // 获取输入的旧密码
            this.oldPassword = v;
        },
        getPassword(v) { // 获取输入的新密码
            this.password = v;
        },
        getSecondPwd(v) { // 获取用户再次输入的密码
            this.secondPwd = v;
        },
        isPassword({ sign, n }) { // 密码验证
            let type, info, s;
            if (sign) {
                type = 'oldType';
                info = 'oldInfo';
                s = 'oldPassword';
            } else {
                type = 'pwdType';
                info = 'pwdInfo';
                s = 'password';
            }
            if (n === 1) {  // 获取焦点,移除错误提示
                this.info[info] = '';
                this.type[type] = '';
            } else {
                this.type[type] = 'error';
                if (this[s] && !reg.isPassword(this[s])) {
                    this.info[info] = '密码格式错误';
                    return false;
                } else if (!this[s]) {
                    this.info[info] = '密码不能为空';
                    return false;
                } else {
                    this.info[info] = '';
                    this.type[type] = '';
                    return true;
                }
            }
        },
        isSecondPwd(n) { // 重复输入密码验证
            if (n === 1) {  // 获取焦点,移除错误提示
                this.info.SecondInfo = '';
                this.type.SecondType = '';
            } else {
                this.type.SecondType = 'error';
                if (this.password && this.password !== this.secondPwd) {
                    this.info.SecondInfo = '两次输入密码不一致';
                    return false;
                } else if (!this.password) {
                    this.info.SecondInfo = '再次输入密码不能为空';
                    return false;
                } else {
                    this.info.SecondInfo = '';
                    this.type.SecondType = '';
                    return true;
                }
            }
        },
        isEmail(n) {  // 邮箱验证
            if (n === 1) {  // 获取焦点,移除错误提示
                this.info.emailInfo = '';
                this.type.emailType = '';
            } else {
                this.type.emailType = 'error';
                if (this.email && !reg.isEmail(this.email)) {
                    this.info.emailInfo = '邮箱格式错误';
                    return false;
                } else {
                    this.info.emailInfo = '';
                    this.type.emailType = '';
                    return true;
                }
            }
        },
        saveInfo() { // 保存个人信息
            let data = {
                name: this.name ? this.name : this.userInfo.name,
                gender: this.sex ? this.sex : '',
                email: this.email ? this.email : '',
                regionId: this.prov ? this.prov[2].code : this.userInfo.regionId,
                headImg: this.saveImg,
            }
            let info = this.userInfo.info;
            this.$http.post('/member/update-info', data).then((res) => {
                this.alert_options.info = res.msg;
                if (res.status === 1) {
                    this.alert_options.type = 'success';
                    Object.assign(info, data);
                    this.infoAction(info);
                } else {
                    this.alert_options.type = 'error';
                }
                this.$refs.alert.alert();
            })
        },
        getFile(ev) { // 更改头像
            let formData = new FormData();
            let reader = new FileReader();

            formData.append('head', ev.target.files[0]);

            reader.readAsDataURL(formData.get('head'));
            // reader.readAsDataURL(ev.target.files[0]);
            reader.onloadend = (res) => {
                let dataURI = res.target.result;
                this.headImg = dataURI;
                // this.saveImg = JSON.stringify(formData.get('headImg'));
            };
        },
        savePassword() { // 保存密码
            if (this.isPassword({}) && this.isSecondPwd() && this.isPassword({ sign: 'old' })) {
                this.$http.post('/sso/change-pwd', { oldPwd: md5(this.oldPassword), newPwd: md5(this.password) })
                    .then((res) => {
                        if (res.status === 1) {
                            this.alert_options.type = 'success';
                        } else {
                            this.alert_options.type = 'error';
                        }
                        this.alert_options.info = res.msg;
                        this.$refs.alert.alert();
                    });
            }
        }
    },
};
</script>

<style lang="less">
#setting {
    font-size: 14px;
    color: #676767;
    margin-top: .55rem;
    margin-bottom: .2rem;
    input[type=button] {
        outline: none;
        border: 0;
    }
    input {
        text-indent: .05rem !important;
    }
    h4 {
        position: relative;
        margin-bottom: .15rem;
        padding-bottom: .05rem;
        font-size: .18rem;
        font-weight: 500;
        text-indent: .2rem;
        border-bottom: 1px solid #2693d4;
        &::after {
            content: "";
            display: block;
            width: 0;
            height: 0;
            position: absolute;
            left: .5rem;
            border-bottom: .05rem solid #2693d4;
            border-right: .03rem solid transparent;
            border-left: .03rem solid transparent;
        }
    }
    button {
        border: 0;
        width: .75rem;
        height: .3rem;
        margin: .2rem 0 0 1.25rem;
        color: #2493d3;
        background: #fff;
        border: 1px solid #2693d4;
        border-radius: 5px;
    }
    .zhanghu {
        >div {
            box-sizing: border-box;
            padding-right: .225rem;
            padding-left: .225rem;
            display: flex;
            >span {
                width: 1rem;
                font-size: 16px;
                text-align: justify;
            }
            input[type="text"] {
                width: 2rem;
                height: .25rem;
                border-radius: .03rem;
                border: 1px solid #bbb;
            }
        }
        >div:nth-of-type(1) {
            span {
                line-height: .6rem;
            }
            >div {
                position: relative;
                width: .6rem;
                height: .6rem;
                text-align: center;
                background-color: #fff;
                >div {
                    width: 100%;
                    height: 100%;
                    color: #fff;
                    border-radius: 50%;
                    background: #2493d3;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
                input {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                    font-size: 14px;
                    opacity: 0;
                }
            }
        }
        .sex {
            align-items: center;
            >div {
                display: flex;
            }
        }
        .diqu {
            .prov {
                select {
                    width: .67rem;
                }
            }
        }
        .email {
            .iconClear {
                top: 0.03rem;
            }
        }
    }
    .change {
        margin-top: .15rem;
        padding-top: .15rem;
        border-top: .03rem solid #dfdfdf;
        >div {
            box-sizing: border-box;
            padding-right: .225rem;
            padding-left: .225rem;
            display: flex;
            >span {
                width: 1.2rem;
            }
            input {
                width: 2rem;
                height: .25rem;
                font-size: .12rem;
                border-radius: .03rem;
                border: 1px solid #bbb;
            }
            .iconClear {
                top: 0.03rem;
                right: .05rem;
            }
        }
    }
}
</style>