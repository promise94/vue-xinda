<template>
  <div id="storeIndex" class="container">
    <div class="logosay">
      <img src="../../common/images/logo.png" alt="">
      <div>
        <h1>信达北京服务中心</h1>
        <p>北京-北京市-朝阳区</p>
      </div>
    </div>

    <div class="company">
      <div class="introduce">
        <div class="text">
          <p>公司介绍</p>
          <span>为给客户提供更加标准化的体验，信达北京服务中心采用自营模式，打造一站式企业服务平台，帮助企业快速解决发展遇到的问题，提供工商注册，财税服务，知识产权，人事外包，证件办理等全方位企业解决方案，为你的企业发展保驾护航。</span>
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
              <div class="mess">
                <p>商标快速注册通道（5个小时之后即可成功）</p>
                <div><span></span><span></span></div>
                <p>为给客户提供更加标准化</p>
                <p>销量：<span></span></p>
                <div>￥<span>1400.00</span></div>
                <div>
                  <div>原价：￥<span>2000.00</span>&nbsp;&nbsp;</div>
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
              <div class="mess">
                <p>商标快速注册通道（5个小时之后即可成功）</p>
                <div><span></span><span></span></div>
                <p>为给客户提供更加标准化</p>
                <p>销量：<span></span></p>
                <div>￥<span>1400.00</span></div>
                <div>
                  <div>原价：￥<span>2000.00</span>&nbsp;&nbsp;</div>
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
              <div class="mess">
                <p>商标快速注册通道（5个小时之后即可成功）</p>
                <div><span></span><span></span></div>
                <p>为给客户提供更加标准化</p>
                <p>销量：<span></span></p>
                <div>￥<span>1400.00</span></div>
                <div>
                  <div>原价：￥<span>2000.00</span>&nbsp;&nbsp;</div>
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
              <div class="mess">
                <p>商标快速注册通道（5个小时之后即可成功）</p>
                <div><span></span><span></span></div>
                <p>为给客户提供更加标准化</p>
                <p>销量：<span></span></p>
                <div>￥<span>1400.00</span></div>
                <div>
                  <div>原价：￥<span>2000.00</span>&nbsp;&nbsp;</div>
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
              <div class="mess">
                <p>商标快速注册通道（5个小时之后即可成功）</p>
                <div><span></span><span></span></div>
                <p>为给客户提供更加标准化</p>
                <p>销量：<span></span></p>
                <div>￥<span>1400.00</span></div>
                <div>
                  <div>原价：￥<span>2000.00</span>&nbsp;&nbsp;</div>
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
              <div class="mess">
                <p>商标快速注册通道（5个小时之后即可成功）</p>
                <div><span></span><span></span></div>
                <p>为给客户提供更加标准化</p>
                <p>销量：<span></span></p>
                <div>￥<span>1400.00</span></div>
                <div>
                  <div>原价：￥<span>2000.00</span>&nbsp;&nbsp;</div>
                  <a href="#/storeList">查看详情>>></a>
                </div>
              </div>
            </div>
          </div>
          
          <div v-show="check === 2">
            <h1>工作时间：</h1>
            <!-- {{item.workTime}} -->
            <div>
              <h1>QQ咨询：</h1>
              <img src="../../common/images/logo.png" alt="">
            </div>
          </div>

          <div v-show="check === 3">
            <img src="">
            <!-- <img v-bind:src="item.businessCertPath"> -->
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
      id:'',

    }
  },
  //axios后台数据获取
  created() {

    this.$http({
                  method: 'post',
                  url: '/provider/grid',
                  data: {
                    id:this.$route.query.storeCode,
                  }
              }).then((res)=>{
                let data = res;
                console.log(data.data);
                console.log(this.$route.query.storeCode);
                // for(var i=0;i<data.length;i++){
                //   
                //   data[i].businessCertPath.substring(0,3)=='http'?data[i].businessCertPath=data[i].businessCertPath:data[i].businessCertPath="http://115.182.107.203:8088/xinda/pic"+data[i].businessCertPath;

                

                //   console.log(this.types);                
                // };

                this.mess = data;
                
                



                //  address[0] = data[0].regionName;
                //  data.foreach(function(item) {
                //       item.address[0] = item.regionName;
                //   }, this);
                  // let data = result.data.hq;
                  // data.foreach(function(item) {
                  //     item.marketprice = item.marketprice + '.00';
                  // }, this);
                  // this.recommend = data;
                  
              })
  },

  methods: {
    blues(n){
      this.check = n;
    },
   
  },
  components: {
      
      pagingQuery,
  },
};
</script>

<style lang="less" scoped>
@import '../../common/less/store/storeIndex.less';

</style>