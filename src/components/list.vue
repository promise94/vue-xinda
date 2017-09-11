<template>
    <div>
        <p>欢迎来到list页面</p>
        {{msg}}
        <a href="#/home">跳转到home</a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: 'hello lsit'
        }
    }
}
</script>

<style>
p {
    color: red;
}
</style>