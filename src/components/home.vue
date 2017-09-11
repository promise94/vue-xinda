<template>
    <div>
        <div>这是业务内容的头部，这里有个搜索框</div>
        <router-view></router-view>
        <div>这是业务内容的脚部，关于我们文字说明</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello vue'
        }
    }
}
</script>

<style>

</style>