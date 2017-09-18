<template>
    <div>
        <xd-header></xd-header>
        <router-view></router-view>
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
    }
};
</script>

<style>

</style>