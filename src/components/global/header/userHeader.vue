<template>
<div class="header">
    <xd-top></xd-top>
    <xd-logo></xd-logo>
</div>
</template>

<script>
import xdTop from './top';
import xdLogo from './logo';
export default {
    name: 'Header',
    components: {
        xdTop,
        xdLogo
    }
};
</script>

<style lang="less">

</style>