<template>
    <div id="evaluntion">
        <div v-show="mypingjia === 0">
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
                    <div><button  @click="gotosaid(1)" >去评价</button></div>
                </div> 
                <div>
                    <hasBuy></hasBuy>
                    <div><button  @click="gotosaid(1)">去评价</button></div>               
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
        <div  v-show="mypingjia === 1">
            <div class="evaluntionTop">
                <p>评价</p>
            </div>
            <div class="neirong">
                <div>
                    <p>服务单号：</p><span>B11111</span>
                    <p>购买内容：</p><span>B11111</span>
                    <p>购买时间：</p><span>2016-05-21</span>
                </div>
                <div>
                    <p>评价：</p>
                    <input type="radio" name="ping"><span>好评</span>
                    <input type="radio" name="ping"><span>中评</span>
                    <input type="radio" name="ping"><span>差评</span>
                </div>
                <div>
                    <p>评分：</p>
                    <span class="xd xd-xingxing"></span>
                    <span class="xd xd-xingxing"></span>
                    <span class="xd xd-xingxing"></span>
                    <span class="xd xd-xingxing"></span>
                    <span class="xd xd-xingxing"></span>
                </div>
                <div>
                    <p>感受：</p>
                    <input type="textarea">
                </div>
                <button>提交</button>

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
            mypingjia: 0,
        }
    },
    methods:{
        blueColor(x) {
            this.said=x;
        },
        gotosaid(n){
            this.mypingjia = n;
        }
    },
};
</script>

<style lang="less" scoped>
@import '../../common/less/vip/evaluntion.less';
</style>