<template>
    <div class="footer">
        <div class="container usInfo">
                <h6>关于我们</h6>
                <p>联系我们&nbsp;:&nbsp;contact@xinkehr.com</p>
                <p>公司地址&nbsp;:&nbsp;北京市朝阳区soho现代城5号楼2004室</p>
                <p>官方客服电话&nbsp;:&nbsp;010-83421842</p>
        </div>
        <xd-copy></xd-copy>
    </div>
</template>

<script>
import copy from './copyRight';
export default {
    name: 'footer',
    components: {
        xdCopy: copy
    }
}
</script>

<style lang="less" scoped>
.footer{
    background-color: #f8f8f8;
    overflow: hidden;
    .usInfo{
        height: 200px;
        h6{
            font-size: 16px;
            margin: 35px 0;
        }
        p{
            font-size: 14px;
            padding: 5px;
            text-indent: 4px;
        }
    }
}
</style>