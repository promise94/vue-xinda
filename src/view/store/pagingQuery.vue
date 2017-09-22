<template>
    <div id="page">
        <ul>
            <li @click="titles('first')">首页</li>
            <li @click="titles('top')">上一页</li>
            <li @click="titles(1)">1</li>
            <li @click="titles(2)">2</li>
            <li @click="titles(3)">3</li>
            <li @click="titles(4)">4</li>
            <li @click="titles('bottom')">下一页</li>
            <li @click="titles('last')">尾页</li>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'page',
  data() {
    return {
      conf:{
        start: 0 ,
        limit: '6',
        productTypeCode:'',
        // productId: "8a82f52b674543e298d2e5f685946e6e",
        sort: 2,//价格升序排列
      },
      m:0,
    }
  },
  
  methods:{
    //封装的axios插件
    getStore(){
      this.$http({
      method: 'post',
      url: '/product/package/grid',
      data: this.conf,
    }).then((result) => {
        let dates = result.data;
        console.log(dates);
      })
    },
    //***** */
    titles(n){
        if(n=='first'){
            n=1;
        }else if(n=='last'){
            n=4;
        }else if(n=='top'){
            n=this.conf.start/this.conf.limit;
        }else if(n=='bottom'){
            n=this.conf.start/this.conf.limit+2;
        }
        this.conf.start=(n-1)*this.conf.limit;
        console.log(n);
        this.getStore(); 
        
        
    }
  }
};
</script>

<style lang="less" scoped>
#page{
    ul{
        margin:0 auto;
        display:flex;
        li{
            color:#9c9c9c;
            background:#f4f4f4;
            padding:13px 15px;
            margin:4px;
            border:1px solid #b0b0b0;
            cursor:pointer;
        }
        li:first-child{
            margin-right:12px;
        }
        li:last-child{
            margin-left:12px;
        }
    }   
}
</style>