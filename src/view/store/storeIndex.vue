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
                <div>
                  <span></span>
                  <span></span>
                </div>
                <p>{{item.serviceName}}</p>
                <p>销量：
                  <span>{{item.buyNum}}</span>
                </p>
                <div>￥
                  <span>{{fmtPrice(item.price)}}</span>
                </div>
                <div>
                  <div>原价：￥
                    <span>{{fmtPrice(item.marketPrice)}}</span>&nbsp;&nbsp;</div>
                  <!--  -->
                  <a @click="gotoxingqing(item.id)">查看详情>>></a>
                </div>
              </div>
            </div>
          </div>

          <div v-show="check === 2">
            <h1>工作时间：{{date.workTime}}</h1>
            <div>
              <h1>QQ咨询： </h1>
              <a :href="'tencent://message/?uin='+date.qq"><img src="../../common/images/QQ.jpg" alt=""></a>
            </div>
          </div>

          <div v-show="check === 3">
            <p class='xd xd-nothing'></p>
            <span>图片不存在</span>
          </div>

        </div>
      </div>
    </div>

    <div class="page-changes" v-if='check === 1'>

      <v-page @page="titles" :amount="count" :limit="conf.limit" type="dd"></v-page>

    </div>
  </div>
</template>

<script>
import vPage from '@/components/global/page';//引用分页组件
export default {
  name: 'storeIndex',
  components: {
    vPage,
  },
  data() {
    return {
      check: 1, //颜色改变，服务内容改变
      mess: '', // 服务内容展示数据
      date: '', //店铺首页总数据
      count: 0, //服务产品内总产品数量
      changestore: 0,
      conf: {
        start: 0, //分页起始数
        limit: 6, //分页每页数量
        productTypeCode: '', //产品分类编码
        sort: 2, //价格升序排列,
        providerId: this.$route.query.id,//产品id
      },
    }
  },


  created() {
      this.getStore();     //数据获取    
  },

  watch:{
    '$route.query.id'(id) {
      this.conf.providerId=id;
      this.getStore();  
    }
  },

  methods: {
    
    getStore() {  
      this.$http({      //店铺首页后台数据获取
        method: 'post',
        url: '/provider/detail',
        data: {
          id: this.$route.query.id,
        }
      }).then((res) => {
        this.date = res.data;
        // 服务商头像图片数据处理，加上前缀
        this.date.providerImg.substring(0, 3) == 'http' ? this.date.providerImg = this.date.providerImg : this.date.providerImg = "http://115.182.107.203:8088/xinda/pic" + this.date.providerImg;
        //营业执照图片数据处理，加上前缀
        this.date.businessCertPath.substring(0, 3) == 'http' ? this.date.businessCertPath = this.date.businessCertPath : this.date.businessCertPath = "http://115.182.107.203:8088/xinda/pic" + this.date.businessCertPath;
        
      });   
           
           
      this.$http({//服务产品数据获取
        method: 'post',
        url: '/product/package/grid',
        data: this.conf,
      }).then((res) => {
        this.count = res.totalCount;
        this.mess = res.data;
        this.mess.marketPrice = this.fmtPrice(this.mess.marketPrice);//处理市场价格余两位数
        this.mess.price = this.fmtPrice(this.mess.price);//处理销售价格余两位数
        
      });
      
    },

    //变颜色
    blues(n) {
      this.check = n;
    },

    //函数处理价格，小数点后余两位数
    fmtPrice(p) {
      return (parseFloat(p) * 0.01).toFixed(2);
    },

    //跳转到产品详情页面，传id数据
    gotoxingqing(id) {
      this.$router.afterEach((to, from, next) => {  //返回跳转页面的顶部
        window.scrollTo(0, 0);
      }),
        this.$router.push({ path: '/goods', query: { id: id } });
    },

    //调取自定义分页函数
    titles(n) {
      this.conf.start = n;
      this.getStore();
    }

  },

};
</script>

<style lang="less" scoped>
@import '../../common/less/store/storeIndex.less';
</style>