<template>
    <div class="header">
        <xd-top></xd-top>
        <div class="container">
            <div class="log">
                <a @click="goto('/')" href="javascript:;"><img src="../../../common/images/logo.png" alt=""></a>
                <span>|</span>
                <span>欢迎登录</span>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import xdTop from './top';
export default {
    name: 'Header',
    components: {
        xdTop,
    },
    methods: {
        goto(url){
            this.$router.push(url);
        }
    }
};
</script>

<style lang="less">

</style>