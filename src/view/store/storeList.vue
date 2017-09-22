<template>
  <div id="storeList">
    <div class="chance">
      <a href="#/storeList">首页</a>&nbsp;/&nbsp;
      <a href="#/storeIndex">店铺列表</a>
    </div>
    <div class="area-type">
      <div class="area">
        <div class="area-left">服务区域</div>
        <div class="area-center"><province @province="getProv"></province> </div>
      </div>
      <div class="type">
        <div class="type-left">产品类型</div>
        <div class="type-center">
          <ul>
            <li @click="blueColor('')" :class="{all: checked === ''}">所有</li>
            <li @click="blueColor(10)" :class="{all: checked ===10}">专利申请</li>
            <li @click="blueColor(9)" :class="{all: checked ===9}">版权保护</li>
            <li @click="blueColor(8)" :class="{all: checked ===8}">商标注册</li>
            <li @click="blueColor(1)" :class="{all: checked ===1}">代理记账</li>
            <li @click="blueColor(4)" :class="{all: checked ===4}">公司注册</li>
            <li @click="blueColor(6)" :class="{all: checked ===6}">企业社保</li>
            <li @click="blueColor(5)" :class="{all: checked ===5}">公司变更</li>
            <li @click="blueColor(2)" :class="{all: checked ===2}">税务代办</li>
            <li @click="blueColor(7)" :class="{all: checked ===7}">个人社保</li>
            <li @click="blueColor(3)" :class="{all: checked ===3}">审计报告</li>
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
              <span class="xd xd-dengji"></span>
              <span class="xd xd-dengji"></span>
              <span class="xd xd-dengji"></span>
              <span class="xd xd-dengji"></span>
              <span class="xd xd-dengji"></span>
            </p>
            <p>{{item.regionName}}</p>
            <div>
              <p>累计服务客户次数&nbsp;：&nbsp;
                <span>{{item.orderNum}}</span>
              </p>
              <span class="xd xd-shugang"></span>
              <p>好评率&nbsp;：&nbsp;
                <span>{{(item.goodJudge/item.totalJudge)*100+"%"}}</span>
              </p>
            </div>
            <ul>
              <li v-for="item of item.productTypes.split(',')" >{{item}}</li>
              <!--<li v-for="item of item.productTypes">{{item}}</li>  -->
<!-- v-show="chance===1" -->
            </ul>
            <a @click="gotoStore(item.id)">进入店铺</a>
          </div>
        </div>
      </div>
    </div>

    <div class="page-changes">
      <div id="pagelist">
        <ul>
            <li @click="titles('first')">首页</li>
            <li @click="titles('top')">上一页</li>
            <li @click="titles(1)" :class="{bluestore: changestore=== 1}">1</li>
            <li @click="titles('bottom')">下一页</li>
            <li @click="titles('last')">尾页</li>
        </ul>
    </div>
      <!-- <pagingQuery></pagingQuery> -->
      
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
      checked: '',
      change: 1,
      changestore: 1,
      arr: '',
      count: '',
      conf:{
        start: 0,
        limit: 4,
        productTypeCode: '',
        regionId: '',
        sort: 1,
      },
      i: 0,

    }
  },
  //初始axios后台数据获取
  created() {
      this.getStoreList();
  },
  methods: {
    //封装的axios插件:getStoreList()
    getStoreList(){
      this.$http({
      method: 'post',
      url: '/provider/grid',
      data: this.conf,
    }).then((result) => {
      this.count=result.totalCount;
      let data = result.data;
      // console.log(result.totalCount);
      for (var i = 0; i < data.length; i++) {
        data[i].totalJudge == 0 ? data[i].totalJudge = 1 : "";
        data[i].providerImg.substring(0, 3) == 'http' ? data[i].providerImg = data[i].providerImg : data[i].providerImg = "http://115.182.107.203:8088/xinda/pic" + data[i].providerImg;
        //作双层循环//
        // data[i].producttypes = data[i].producttypes.split(",");
      };
      this.arr = data;
      })
    },
    //产品类型选择筛选店铺
    blueColor(n){
      this.checked = n;
      this.conf.productTypeCode = n;
      this.getStoreList();
    },
    //排序选择筛选店铺
    blue(m) {
      this.change = m;
      this.conf.sort = m;
      this.getStoreList();
    },
    //跳转页面
    gotoStore(id) {
      this.$router.push({ path: '/storeIndex', query: { id: id } });
    },
    //省市区选择筛选店铺
    getProv(pro){
      // if(this.i){//如果省市区有默认的code值
        // this.conf.regionId = pro[2].code;
        // this.getStoreList();
      // }
      // this.i++;
      if(pro!==""){
        this.conf.regionId = pro[2].code;
        this.getStoreList();
      }else{
        this.conf.regionId ="";
        this.getStoreList();
      }
    },
    //分页条
    titles(n){

      var math=Math.floor(this.count/this.conf.limit)+1;
      
        if(n=='first'){
            n=1;
        }else if(n=='last'){
            n=math;
            
        }else if(n=='top'){
            n=this.conf.start/this.conf.limit;
            if(n==0){
              n=1;
            }
        }else if(n=='bottom'){
            n=this.conf.start/this.conf.limit+2;
            if(n==math+1){
              n=math;       
            }
        }
        this.conf.start=(n-1)*this.conf.limit;
        this.changestore=n;
        // console.log(n);
        this.getStoreList();  
      this.changestore=n;
      console.log(this.changestore)
    }
  },
  components: {     
      pagingQuery,
      province
  },

};

</script>

<style lang="less" scoped>
@import '../../common/less/store/storeList.less';
#pagelist{
    ul{
        width:370px;
        margin:0 auto;
        display:flex;
        li{
            color:#9c9c9c;
            background:#f4f4f4;
            padding:10px 15px;
            margin:4px;
            border:1px solid #b0b0b0;
            cursor:pointer;
            &:hover{
              background:#2594d4;
              color:#fff;
            }
        }
        li:first-child{
            margin-right:12px;
        }
        li:last-child{
            margin-left:12px;
        }
    }
    .bluestore{
      background:#2594d4;
      color:#fff;
    }   
}
</style>