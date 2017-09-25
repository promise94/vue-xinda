<template>
    <div id="setting">
        <div>
            <p @click="changes(1)" :class="{blue: says===1}">账户设置</p>
            <p @click="changes(2)" :class="{blue: says===2}">修改密码</p>
        </div>
        <div class="zhanghu" v-show="says === 1">
            <div>
                <span>当前头像 :</span>
                <div>
                    <div class="xd xd-user" v-if="!userInfo.info.headImg">
                        <input @change="getFile" type="file">
                    </div>
                    <div v-if="userInfo.info.headImg">
                        <input @change="getFile" type="file">
                    </div>
                </div>
            </div>
            <div>
                <span>姓名 :</span>
                <input v-model="name" type="text">
            </div>
            <div>
                <span>性别 :</span>
                <input id="man" v-model="sex" type="radio" name="sex" value="1">
                <label for="man">男</label>
                <input id="woman" v-model="sex" type="radio" name="sex" value="2">
                <label for="woman">女</label>
            </div>
            <div>
                <span>邮箱 :</span>
                <v-input @getValue="getEmail" :value="email" @blur="isEmail()" @focus="isEmail(1)" :info="info.emailInfo" :infoType="type.emailType" placeholder="请输入邮箱">
                </v-input>
            </div>
            <div>
                <span>所在地区 :</span>
                <province @province="getProv" :regionId="370203"></province>
            </div>
            <button @click="saveInfo">保存</button>
        </div>
        <!-- 密码修改 -->
        <div class="change" v-show="says === 2">
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
                <!-- <input type="text" placeholder="请再次输入新密码"> -->
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
            says: 1,
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
        }
    },
    created() {
        setTimeout(() => {
            let info = this.userInfo.info;
            this.name = info.name;
            this.sex = info.gender ? info.gender : '';
            this.email = info.email ? info.email : '';
        }, 500);
    },
    computed: {
        ...mapGetters({ userInfo: 'getUser' }),
    },
    watch: {
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
        changes(n) { // 列表切换
            this.says = n;
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
                headImg: '/2016/10/28/152843b6d9a04abe83a396d2ba03675f'
            }
            let info = this.userInfo.info;
            this.$http.post('/member/update-info', data).then((res) => {
                this.alert_options.info = res.msg;
                if (res.status === 1) {
                    this.alert_options.type = 'success';
                    Object.assign(info,data);
                    this.infoAction(info);
                } else {
                    this.alert_options.type = 'error';
                }
                this.$refs.alert.confirm();
                console.log('saveInfo---', res);
            })
        },
        getFile() { // 更改头像
            console.log('run in img');
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
                        this.$refs.alert.confirm();
                    });
            }
        }
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/setting.less';
</style>