<template>
  <div id="storeList">
    <div class="chance"><a href="#/storeList">首页</a>&nbsp;/&nbsp;<a href="#/storeIndex">店铺列表</a></div>
    <div class="area-type">
      <div class="area">
        <div class="area-left">服务区域</div>
        <div class="area-center">省市区</div>
      </div>
      <div class="type">
        <div class="type-left">产品类型</div>
        <div class="type-center">
          <ul>
            <li @click="blueColor(1)" :class="{all: checked ===1}">所有</li>
            <li @click="blueColor(2)" :class="{all: checked ===2}">专利申请</li>
            <li @click="blueColor(3)" :class="{all: checked ===3}">版权保护</li>
            <li @click="blueColor(4)" :class="{all: checked ===4}">商标注册</li>
            <li @click="blueColor(5)" :class="{all: checked ===5}">代理记账</li>
            <li @click="blueColor(6)" :class="{all: checked ===6}">公司注册</li>
            <li @click="blueColor(7)" :class="{all: checked ===7}">企业社保</li>
            <li @click="blueColor(8)" :class="{all: checked ===8}">公司变更</li>
            <li @click="blueColor(9)" :class="{all: checked ===9}">税务代办</li>
            <li @click="blueColor(10)" :class="{all: checked ===10}">个人社保</li>
            <li @click="blueColor(11)" :class="{all: checked ===11}">审计报告</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mainBox">
      <div class="order">
        <div @click="blue(1)" :class="{blue: change ===1}">
          <p>综合排序</p>
          <div></div>
        </div>
        <div @click="blue(2)" :class="{blue: change ===2}">
          <p>价格<span class="xd xd-paixu"></span></p>
          <div></div>
        </div>
        <div @click="blue(3)" :class="{blue: change ===3}">
          <p>接单数<span class="xd xd-paixu"></span></p>
          <div></div>
        </div>
      </div>

      <div class="main">
        
        <div class="store">
          <div class="imgs">
            <div>
              <img src="../../common/images/logo.png" alt="">
              <p>信达</p>
            </div>
            <div>
              <img src="../../common/images/logo.png" alt="">
              <p>金牌服务商</p>
            </div>
          </div>

          <div class="text">
            <p>信达北京服务中心</p>
            <p>信誉<span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span></p>
            <p>北京-北京市-朝阳区</p>
            <div>
              <p>累计服务客户次数&nbsp;：&nbsp;<span>8272</span></p>
              <span class="xd xd-shouye_shugang_shijiantixing"></span>
              <p>好评率&nbsp;：&nbsp;<span>100%</span></p>
            </div>
            <ul>
              <li>税务代办</li>
              <li>代理记账</li>
              <li>个人社保</li>
              <li>公司变更</li>
            </ul>
            <a href="#/storeIndex" >进入店铺</a>
          </div>
        </div>

        <div class="store">
          <div class="imgs">
            <div>
              <img src="../../common/images/logo.png" alt="">
              <p>信达</p>
            </div>
            <div>
              <img src="../../common/images/logo.png" alt="">
              <p>金牌服务商</p>
            </div>
          </div>

          <div class="text">
            <p>信达北京服务中心</p>
            <p>信誉<span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span></p>
            <p>北京-北京市-朝阳区</p>
            <div>
              <p>累计服务客户次数&nbsp;：&nbsp;<span>8272</span></p>
              <span class="xd xd-shouye_shugang_shijiantixing"></span>
              <p>好评率&nbsp;：&nbsp;<span>100%</span></p>
            </div>
            <ul>
              <li>税务代办</li>
              <li>代理记账</li>
              <li>个人社保</li>
              <li>公司变更</li>
            </ul>
            <a href="#/storeIndex">进入店铺</a>
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
  name: 'storeList',
  
  data(){
    return {
      checked: 1,
      change: 1
    }
  },
  methods: {
    blueColor(n){
      this.checked = n;
    },
    blue(m){
      this.change = m;
    }
  },
  components: {     
      pagingQuery
  },

  getstorelist(){
              this.$http({
                  method: 'post',
                  url: '/provider/grid',
                  data: {
                    start:0,
                    limit:6,
                    productTypeCode:10,
                    regionId: 110102,
                    sort:	1
                  }
              }).then((result)=>{
                console.log("data===" data);
                  let data = result.data.hq;
                  // data.forEach(function(item) {
                  //     item.marketPrice = item.marketPrice + '.00';
                  // }, this);
                  // this.recommend = data;
                  
              })
          },
          // showDetails(id){
          //     console.log(id);
          // }

};



// import axios from 'axios';

// import qs from 'qs';

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// var canshu = qs.stringify({
//     id: '0cb85ec6b63b41fc8aa07133b6144ea3',
//     num: 1,
// });
// axios.post('http://115.182.107.203:8088/xinda/xinda-api/cart/add', canshu, {})
//     .then(function(data) {
//         console.log('axios data', data);
//     })
//     .catch(function(error) {
//         console.log('axios error', error);
//     });
</script>

<style lang="less" scoped>
@import '../../common/less/store/storeList.less';

</style>