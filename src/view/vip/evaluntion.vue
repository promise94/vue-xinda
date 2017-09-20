<template>
    <div id="evaluntion">
        <div class="evaluntionTop">
            <p>我的评价</p>
        </div>
        <div class="evaluntionCenter">
            <div @click="blueColor(1)" :class="{blue: said===1}">未评价<p></p></div>
            <div @click="blueColor(2)" :class="{blue: said===2}">已评价<p></p></div>
        </div>
        <div class="evaluntionBottom"  v-show="said === 1"> 
            <div>
                <hasBuy></hasBuy>
                <div><button>去评价</button></div>
            </div> 
            <div>
                <hasBuy></hasBuy>
                <div><button>去评价</button></div>               
            </div>  
                    
        </div>
        <div class="evaluntionBottom"  v-show="said === 2"> 
            <div>
                <hasBuy></hasBuy>
                <div><p>已评价</p></div>
            </div> 
            <div>
                <hasBuy></hasBuy>
                <div><p>已评价</p></div>               
            </div>  
                    
        </div>
    </div>
</template>

<script>
import hasBuy from './little/hasBuy';
export default {
    name: 'evaluntion',
    components: {
       hasBuy,
    },
    data() {
        return {
            said: 1,
        }
    },
    methods:{
        blueColor(x) {
            this.said=x;
        },
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/evaluntion.less';
</style>