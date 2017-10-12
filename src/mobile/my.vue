<template>
    <div>
        <mt-header fixed class="header" :title="title" v-if="show">
            <div slot="left" @click="go(-1)">
                <span class="back xd xd-fanhui"></span>
            </div>
        </mt-header>
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'My',
    data() {
        return {
            title: '', // header文字信息
            show: false, // header是否显示
            transitionName: '',
        }
    },
    beforeRouteEnter(to, from, next) {
        // console.log('to',from);
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
            const toDepth = to.path.length;
            const fromDepth = from.path.length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
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
    },
    methods: {
        go(n) {
            // history.go(-2);
            this.$router.push({ path: '/m/my' });
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

.child-view {
    transition: all .25s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(.6rem, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-.6rem, 0);
}
</style>
