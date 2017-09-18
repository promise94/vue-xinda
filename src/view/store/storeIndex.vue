<template>
  <div id="storeIndex" class="container">
    <div class="logosay">
      <img v-bind:src="date.providerImg">
      <div>
        <h1>{{date.name}}</h1>
        <p>{{date.regionName}}</p>
      </div>
    </div>

    <div class="company">
      <div class="introduce">
        <div class="text">
          <p>公司介绍</p>
          <span>{{date.providerInfo}}</span>
        </div>
        <div class="assure">
          <div>
            <div class="xd xd-trade"></div>
            <p>平台担保</p>
          </div>
          <div>
            <div class="xd xd-99zhuanhuan"></div>
            <p>优质服务</p>
          </div>
          <div>
            <div class="xd xd-icon_xiangmujiandu"></div>
            <p>过程监督</p>
          </div>
          <div>
            <div class="xd xd-qianbao"></div>
            <p>增值服务</p>
          </div>
        </div>
      </div>
      <div class="service">
        <div class="namechange">
          <p @click="blues(1)" :class="{blues: check ===1}">服务产品</p>
          <p @click="blues(2)" :class="{blues: check ===2}">客服</p>
          <p @click="blues(3)" :class="{blues: check ===3}">资质证书</p>
        </div>
        <div class="box">
          <div v-show="check === 1">
            <h1>服务内容</h1>
            <div class="message">
              <div class="mess" v-for="item of mess">
                <p>{{item.serviceInfo}}</p>
                <div><span></span><span></span></div>
                <p>{{item.serviceName}}</p>
                <p>销量：<span>{{item.buyNum}}</span></p>
                <div>￥<span>{{fmtPrice(item.price)}}</span></div>
                <div>
                  <div>原价：￥<span>{{fmtPrice(item.marketPrice)}}</span>&nbsp;&nbsp;</div>
                  <!--  -->
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
            </div>
          </div>
          
          <div v-show="check === 2">
            <h1>工作时间：{{date.workTime}}</h1>
            <div>
              <h1>QQ咨询：{{date.qq}}</h1></br>
              
            </div>
          </div>

          <div v-show="check === 3">
            <img v-bind:src="date.businessCertPath">
          </div>

        </div>
      </div>
    </div>

    <div class="page-changes">
      <pagingQuery></pagingQuery> 
    </div>
    
  </div>
</template>

<script>
import pagingQuery from './pagingQuery';
export default {
  name: 'storeIndex',
  data(){
    return {
      check: 1,
      mess: '',
      date: '',

    }
  },
  //axios后台数据获取
  created() {

    this.$http({
                  method: 'post',
                  url: '/provider/detail',
                  data: {
                    id: this.$route.query.storeCode,
                  }
              }).then((res)=>{
                 this.date = res.data;
                 
                 // 服务商头像图片数据处理，加上前缀
                 this.date.providerImg.substring(0,3)=='http'?this.date.providerImg=this.date.providerImg:this.date.providerImg="http://115.182.107.203:8088/xinda/pic"+this.date.providerImg;
                 //营业执照图片数据处理，加上前缀
                 this.date.businessCertPath.substring(0,3)=='http'?this.date.businessCertPath=this.date.businessCertPath:this.date.businessCertPath="http://115.182.107.203:8088/xinda/pic"+this.date.businessCertPath;
                
                //  console.log(this.date);

                  
              }),


              this.$http({
                  method: 'post',
                  url: '/product/package/grid',
                  data: {
                    start:0,
                    limit:8,
                    productTypeCode: "1",
                    productId: "8a82f52b674543e298d2e5f685946e6e",
                    sort:2,
                  }
              }).then((res)=>{
                this.mess = res.data;
                this.mess.marketPrice=this.fmtPrice(this.mess.marketPrice);//处理市场价格余两位数
                this.mess.price=this.fmtPrice(this.mess.price);//处理销售价格余两位数

                // console.log(this.mess);
  
              })

               
  },

  methods: {
    blues(n){
      this.check = n;
    },

    //函数处理价格，余两位数
                fmtPrice(p) {
                  return (parseFloat(p) * 0.01).toFixed(2);
                }
   
  },
  components: {
      
      pagingQuery,
  },
};
</script>

<style lang="less" scoped>
@import '../../common/less/store/storeIndex.less';

</style>