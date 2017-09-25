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
              <h1>QQ咨询：{{date.qq}}</h1>
              </br>

            </div>
          </div>

          <div v-show="check === 3">
            <img v-bind:src="date.businessCertPath">
          </div>

        </div>
      </div>
    </div>

    <div class="page-changes">
      <div id="page">
        <ul>
            <li @click="titles('first')">首页</li>
            <li @click="titles('top')">上一页</li>
            <li @click="titles(1)" :class="{bluestore: changestore=== 1}">1</li>
            <li @click="titles(2)" :class="{bluestore: changestore === 2}">2</li>
            <li @click="titles(3)" :class="{bluestore: changestore === 3}">3</li>
            <li @click="titles(4)" :class="{bluestore: changestore === 4}">4</li>
            <li @click="titles(5)" :class="{bluestore: changestore === 5}">5</li>
            <li @click="titles(6)" :class="{bluestore: changestore === 6}">6</li>
            <li @click="titles(7)" :class="{bluestore: changestore === 7}">7</li>
            <li @click="titles(8)" :class="{bluestore: changestore === 8}">8</li>
            <li @click="titles(9)" :class="{bluestore: changestore === 9}">9</li>
            <li @click="titles(10)" :class="{bluestore: changestore === 10}">10</li>
            <li @click="titles(11)" :class="{bluestore: changestore === 11}">11</li>
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
export default {
  name: 'storeIndex',
  data() {
    return {
      check: 1,
      mess: '',
      date: '',
      count: '',
      changestore: 1,
      conf:{
        start: 0 ,
        limit: '6',
        productTypeCode:'',
        sort: 2,//价格升序排列
      },

    }
  },
  //axios后台数据获取
  created() {

    this.$http({
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

      //  console.log(this.date);

    }),
    this.getStore();


    
  },

  methods: {
    getStore(){
      this.$http({
      method: 'post',
      url: '/product/package/grid',
      data: this.conf,
      }).then((res) => {
        this.count=res.totalCount;
        this.mess = res.data;
        this.mess.marketPrice = this.fmtPrice(this.mess.marketPrice);//处理市场价格余两位数
        this.mess.price = this.fmtPrice(this.mess.price);//处理销售价格余两位数
      })
    },

    //变颜色
    blues(n) {
      this.check = n;
    },

    //函数处理价格，余两位数
    fmtPrice(p) {
      return (parseFloat(p) * 0.01).toFixed(2);
    },

    //跳转页面
    gotoxingqing(id){
      this.$router.afterEach((to, from, next) => {
                window.scrollTo(0, 0);
            }),
      this.$router.push({ path: '/goods', query: { id: id } });
    },

    //分页条
    titles(n){
      // console.log(this.changestore)
      
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
        this.getStore();    
    }

  },
  components: {
    
  },
};
</script>

<style lang="less" scoped>
@import '../../common/less/store/storeIndex.less';
#page{
    ul{
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