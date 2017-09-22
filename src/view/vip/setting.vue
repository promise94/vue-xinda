<template>
    <div id="setting">
        <div>
            <p @click="changes(1)" :class="{blue: says===1}">账户设置</p>
            <p @click="changes(2)" :class="{blue: says===2}">修改密码</p>
        </div>
        <div class="zhanghu" v-show="says === 1">
            <div>
                <span>当前头像 :</span>
                <div class="xd xd-user" v-if="!userInfo.headImg"></div>
                <div v-if="userInfo.headImg"></div>
            </div>
            <div>
                <span>姓名 :</span>
                <input type="text" :value="userInfo.name">
            </div>
            <div>
                <span>性别 :</span>
                <input type="radio" name="sex" :checked="userInfo.gender === 1">男
                <input type="radio" name="sex" :checked="userInfo.gender === 2">女
            </div>
            <div>
                <span>邮箱 :</span>
                <input type="text" :value="userInfo.email ? userInfo.email : ''" placeholder="请输入邮箱">
            </div>
            <div>
                <span>所在地区 :</span>
                <province @province="getProv" :regionId="370203"></province>
            </div>
            <button @click="saveInfo">保存</button>
            
        </div>

        <div class="change" v-show="says === 2">
            <div>
                <span>旧密码 :</span>
                <input type="text" placeholder="请输入旧密码">
            </div>
            <div>
                <span>新密码 :</span>
                <input type="text" placeholder="请输入新密码">
            </div>
            <div>
                <span>再次输入新密码 :</span>
                <input type="text" placeholder="请再次输入新密码">
            </div>
            <button>保存</button>
            
        </div>
    </div>
</template>

<script>
import province from '@/components/global/province';
export default {
    name: 'setting',
    components: {
        province,
    },
    data() {
        return {
            says: 1,
            userInfo: '',  // 用户信息
            prov: '', // 省市区
        }
    },
    created() {
        this.getUserInfo();
    },
    methods: {
        getProv(val) {

        },
        changes(n) {
            this.says = n;
        },
        getUserInfo() { // 获取个人信息
            this.$http.post('/member/info').then((res) => {
                if (res.status === 1) {
                    this.userInfo = res.data;
                }
                console.log(res);
            })
        },
        saveInfo() { // 保存个人信息
            console.log('userInfo', this.userInfo);
        }
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/setting.less';
</style>