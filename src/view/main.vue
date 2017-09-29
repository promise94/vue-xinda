<template>
    <div id="main">
        <xd-header></xd-header>
        <transition :name="transitionName" mode="out-in">
            <router-view class="child-view"></router-view>
        </transition>
        <xd-footer></xd-footer>
    </div>
</template>

<script>
import xdHeader from '../components/global/header/header';
import xdFooter from '../components/global/footer/footer';
export default {
    name: 'main',
    components: {
        xdHeader,
        xdFooter
    },
    data() {
        return {
            transitionName: '',
        }
    },
    watch: {
        '$route'(to, from) {
            const toDepth = to.path.length;
            const fromDepth = from.path.length;
            this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
        }
    }
};
</script>

<style scoped>
#main{
  min-width: 1300px;
}
.child-view {
    transition: all .25s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
    opacity: 0;
    transform: translate(60px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
    opacity: 0;
    transform: translate(-60px, 0);
}
</style>