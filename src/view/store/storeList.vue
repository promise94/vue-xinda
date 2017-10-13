<template>
  <div id="storeList" v-loading.body="loading" element-loading-text="拼命加载中...">
    <div class="chance">
      <a href="#/storeList">首页</a>&nbsp;/&nbsp;
      <a href="#/storeIndex">店铺列表</a>
    </div>
    <div class="area-type">
      <div class="area">
        <div class="area-left">服务区域</div>
        <div class="area-center">
          <province @province="getProv"></province>
        </div>
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
    <div class="mainBox" v-if="arr.length != 0">
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
              <li v-for="item of item.productTypes.split(',')">{{item}}</li>
              <!--<li v-for="item of item.productTypes">{{item}}</li>  -->
              <!-- v-show="chance===1" -->
            </ul>
            <a @click="gotoStore(item.id)">进入店铺</a>
          </div>
        </div>
      </div>
    </div>
    <nothing title="未搜索到结果" v-if="showNothing"></nothing>

    <div class="page-changes" v-if="arr.length != 0">
      <v-page @page="titles" :amount="count" :limit="conf.limit"></v-page>
    </div>

  </div>
</template>

<script>
import nothing from '@/components/global/nothing.vue';//引用无数据时的nothing组件
import vPage from '@/components/global/page';//引用分页组件
import province from '@/components/global/province';//引用省市区组件
export default {
  name: 'storeList',
  components: {
    vPage,
    province,
    nothing,
  },
  data() {
    return {
      loading: true,
      showNothing: false, // 无数据显示隐藏
      checked: '', //产品类型颜色改变
      change: 1, //排序颜色改变
      arr: '', //总数据获取
      count: '',//服务产品内总产品数量
      conf: {
        start: 0, //分页起始数
        limit: 2, //每页数量
        productTypeCode: '', //产品类型
        regionId: '', //省市区地址区号
        sort: 1,//价格升序排列,
      },
      i: 0,

    }
  },

  created() {
    this.getStoreList();
  },
  methods: {
    //店铺列表后台数据获取
    getStoreList() {
      this.loading = true;
      this.$http({
        method: 'post',
        url: '/provider/grid',
        data: this.conf,
      }).then((result) => {
        this.count = result.totalCount;
        let data = result.data;
        let len = data.length;
        for (var i = 0; i < len; i++) {
          data[i].totalJudge == 0 ? data[i].totalJudge = 1 : ""; //好评率数据处理
          data[i].providerImg.substring(0, 3) == 'http' ? data[i].providerImg = data[i].providerImg : data[i].providerImg = "http://115.182.107.203:8088/xinda/pic" + data[i].providerImg;//图片数据处理，加上前缀
        };
        this.arr = data;
        this.loading = false;
        if (data.length == 0) {
          this.showNothing = true;
        }
      }, (err) => {
        this.showNothing = true;
      })
    },
    //产品类型选择筛选店铺
    blueColor(n) {
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
    //跳转页面到店铺首页，传一个id
    gotoStore(id) {
      this.$router.push({ path: '/storeIndex', query: { id: id } });
    },
    //省市区选择筛选店铺
    getProv(pro) {
      if (pro !== "") {
        this.conf.regionId = pro[2].code;
        this.getStoreList();
      } else {
        this.conf.regionId = "";
        this.getStoreList();
      }
    },
    //调取自定义分页函数
    titles(n) {
      this.conf.start = n;
      this.getStoreList();
    }
  },
};

</script>

<style lang="less" scoped>
@import '../../common/less/store/storeList.less';
</style>