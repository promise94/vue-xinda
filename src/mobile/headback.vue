<template>
    <mt-header fixed class="header" :title="title" v-if="show">
        <div slot="left" @click="go">
            <span class="back xd xd-fanhui"></span>
        </div>
    </mt-header>
</template>

<script>
export default {
    name: 'headBack',
    props: {
        title: {
            default: '返回上一步'
        },
        gonum: {
            default: -1,
            type: Number,
        }
    },
    methods: {
        go() {
            this.$router.go(this.gonum);
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
