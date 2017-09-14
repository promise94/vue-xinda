<template>
    <div>
        <xd-header></xd-header>
        <router-view></router-view>
    </div>
</template>

<script>
import xdHeader from '../components/global/header/header';
export default {
    name: 'main',
    components: {
        xdHeader
    }
};
</script>

<style>

</style>