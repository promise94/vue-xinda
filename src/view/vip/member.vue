<template>
    <div id="member">
        <div class="memberLeft">
            <p>首页/公司工商</p>
            <div>
                <div class="xd xd-user"></div>
                <h2>12345678901</h2>
            </div>
            <div>
                <div @click="e9Color(1)" :class="{e9: back===1}"><a class="xd xd-dingdan" href="#order"> 我的订单</a></div>
                <div @click="e9Color(2)" :class="{e9: back===2}"><a class="xd xd-pingjia" href="#evaluntion"> 用户评价</a></div>
                <div @click="e9Color(3)" :class="{e9: back===3}"><a class="xd xd-shezhi" href="#setting"> 账户设置</a></div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'member',
    data() {
        return {
            back: 1,
        }
    },
    methods:{
        e9Color(m) {
            this.back=m;
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/member.less';
</style>