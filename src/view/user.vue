<template>
    <div>
        <xd-header></xd-header>
        <xd-footer></xd-footer>
    </div>
</template>

<script>

import xdHeader from '@/components/global/header/userHeader';
import xdFooter from '@/components/global/footer/copyRight';
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