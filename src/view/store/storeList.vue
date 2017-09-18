<template>
  <div id="storeList">
    <div class="chance">
      <a href="#/storeList">首页</a>&nbsp;/&nbsp;
      <a href="#/storeIndex">店铺列表</a>
    </div>
    <div class="area-type">
      <div class="area">
        <div class="area-left">服务区域</div>
        <div class="area-center"><province></province> </div>
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
          <p>价格
            <span class="xd xd-paixu"></span>
          </p>
          <div></div>
        </div>
        <div @click="blue(3)" :class="{blue: change ===3}">
          <p>接单数
            <span class="xd xd-paixu"></span>
          </p>
          <div></div>
        </div>
      </div>

      <div class="main">

        <div class="store" v-for="item of arr">
          <div class="imgs">
            <div>
              <img v-bind:src="item.providerImg">
            </div>
            <div>
              <img src="../../common/images/logo.png" alt="">
              <p>金牌服务商</p>
            </div>
          </div>

          <div class="text">
            <p>{{item.providerName}}</p>
            <p>信誉:&nbsp;
              <span class="xd xd-dengji-copy-copy-copy"></span>
              <span class="xd xd-dengji-copy-copy-copy"></span>
              <span class="xd xd-dengji-copy-copy-copy"></span>
              <span class="xd xd-dengji-copy-copy-copy"></span>
              <span class="xd xd-dengji-copy-copy-copy"></span>
            </p>
            <p>{{item.regionName}}</p>
            <div>
              <p>累计服务客户次数&nbsp;：&nbsp;
                <span>{{item.orderNum}}</span>
              </p>
              <span class="xd xd-shouye_shugang_shijiantixing"></span>
              <p>好评率&nbsp;：&nbsp;
                <span>{{(item.goodJudge/item.totalJudge)*100+"%"}}</span>
              </p>
            </div>
            <ul>
              <li v-for="item of item.productTypes.split(',')">{{item}}</li>
              <!--<li v-for="item of item.productTypes">{{item}}</li>  -->

            </ul>
            <a @click="gotoStore(item.id)">进入店铺</a>
          </div>
        </div>
      </div>
    </div>

    <div class="page-changes">
      <pagingQuery></pagingQuery>
<<<<<<< HEAD
      
=======
>>>>>>> 60c498e5c7d829a0a82c6f046996b973bf0669d0
    </div>

  </div>
</template>

<script>
import pagingQuery from './pagingQuery';
import province from '../../components/global/province';
export default {
  name: 'storeList',

  data() {
    return {
      checked: 1,
      change: 1,
      arr: '',


    }
  },
  //axios后台数据获取
  created() {

    this.$http({
      method: 'post',
      url: '/provider/grid',
      data: {
        start: 0,
        limit: 6,
        producttypecode: 10,
        regionid: 110102,
        sort: 1
      }
    }).then((result) => {
      let data = result.data;
      for (var i = 0; i < data.length; i++) {
        data[i].totalJudge == 0 ? data[i].totalJudge = 1 : "";
        data[i].providerImg.substring(0, 3) == 'http' ? data[i].providerImg = data[i].providerImg : data[i].providerImg = "http://115.182.107.203:8088/xinda/pic" + data[i].providerImg;

        //作双层循环//
        // data[i].productTypes = data[i].productTypes.split(",");

        console.log(data);
      };

      this.arr = data;

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
    blueColor(n) {
      this.checked = n;
    },
    blue(m) {
      this.change = m;
    },
    //跳转页面
    gotoStore(id) {
      this.$router.push({ path: '/storeIndex', query: { storeCode: id } });
    }
  },
<<<<<<< HEAD
  components: {     
      pagingQuery,
      province
=======
  components: {
    pagingQuery
>>>>>>> 60c498e5c7d829a0a82c6f046996b973bf0669d0
  },

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