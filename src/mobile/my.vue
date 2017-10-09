<template>
    <div>
        <mt-header fixed class="header" :title="title" v-if="show">
            <router-link to="/m/my" slot="left">
                <span class="back xd xd-fanhui"></span>
            </router-link>
        </mt-header>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'My',
    data() {
        return {
            title: '', // header文字信息
            show: false, // header是否显示
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log('to');
        next(vm => {
            if (/my$/.test(to.path)) {
                vm.show = false;
            } else {
                vm.show = true;
                switch (true) {
                    case /order/.test(to.path):
                        vm.title = '我的订单';
                        break;

                    case /set/.test(to.path):
                        vm.title = '账户设置';
                        break;

                    case /login/.test(to.path):
                        vm.title = '登录';
                        break;

                    case /register/.test(to.path):
                        vm.title = '注册';
                        break;

                    case /forget/.test(to.path):
                        vm.title = '忘记密码';
                        break;
                    default:
                        break;
                }
            }
        });
    },
    watch: {
        '$route'(to, from) {
            if (/my$/.test(to.path)) {
                this.show = false;
            } else {
                this.show = true;
                switch (true) {
                    case /order/.test(to.path):
                        this.title = '我的订单';
                        break;

                    case /set/.test(to.path):
                        this.title = '账户设置';
                        break;

                    case /login/.test(to.path):
                        this.title = '登录';
                        break;

                    case /register/.test(to.path):
                        this.title = '注册';
                        break;

                    case /forget/.test(to.path):
                        this.title = '忘记密码';
                        break;
                    default:
                        break;
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    height: .38rem;
    background-color: #e5e5e5;
    color: #000;
    .back {
        color: #676767;
    }
}
</style>
