<template>
    <div id="setting">
        <div>
            <p @click="changes(1)" :class="{blue: says===1}">账户设置</p>
            <p @click="changes(2)" :class="{blue: says===2}">修改密码</p>
        </div>
        <div class="zhanghu" v-show="says === 1">
            <div>
                <span>当前头像 :</span>
                <div class="xd xd-user"></div>
                <p class="xd xd-dingdan"></p>
            </div>
            <div>
                <span>姓名 :</span>
                <input type="text">
            </div>
            <div>
                <span>性别 :</span>
                <input type="radio" name="sex">男
                <input type="radio" name="sex">女
            </div>
            <div>
                <span>邮箱 :</span>
                <input type="text" placeholder="请输入邮箱">
            </div>
            <div>
                <span>所在地区 :</span>
                <input type="text" placeholder="请输入所在地区">
            </div>
            <button>保存</button>
            
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

export default {
    name: 'setting',
    data() {
        return {
            says: 1,
        }
    },
    methods:{
        changes(n) {
            this.says=n;
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/setting.less';
</style>