<template>
  <div id="asd">
    <div class="top">
      <div>
        <select name="cars">
          <option value="volvo">1</option>
          <option value="saab">2</option>
          <option value="fiat">3</option>
          <option value="audi">4</option>
        </select>
      </div>
      <div>
        <div>
          <img src="./../common/images/logo.png" alt="">
        </div>
        <div>
          <span>信达</span>
        </div>
      </div>
    </div>
    <swipe class="my-swipe" :show-indicators="false" @change="changeSwipe">
      <swipe-item class="slide1">
        <img src="./../../static/images/1.jpg">
      </swipe-item>
      <swipe-item class="slide2">
        <img src="./../../static/images/2.jpg">
      </swipe-item>
      <swipe-item class="slide3">
        <img src="./../../static/images/3.jpg">
      </swipe-item>
      <swipe-item class="slide4">
        <img src="./../../static/images/4.jpg">
      </swipe-item>
      <swipe-item class="slide5">
        <img src="./../../static/images/5.jpg">
      </swipe-item>
    </swipe>
    <div class="service">
      <div @click="tiaozhuan(1)">
        <div class="a">
          <span class="xd xd-qianbao"></span>
        </div>
        <span>财税服务</span>
      </div>
      <div @click="tiaozhuan(2)">
        <div class="b">
          <span class="xd xd-gongsi"></span>
        </div>
        <span>开公司</span>
      </div>
      <div @click="tiaozhuan(3)">
        <div class="c">
          <span class="xd xd-to-bind"></span>
        </div>
        <span>公司变更</span>
      </div>
      <div @click="tiaozhuan(4)">
        <div class="d">
          <span class="xd xd-shebao"></span>
        </div>
        <span>个人社保</span>
      </div>
    </div>
    <div class="service">
      <div @click="tiaozhuan(5)">
        <div class="e">
          <span class="xd xd-trade"></span>
        </div>
        <span>公司社保</span>
      </div>
      <div @click="tiaozhuan(6)">
        <div class="f">
          <span class="xd xd-zhishichanquan-copy"></span>
        </div>
        <span>知识产权</span>
      </div>
      <div @click="tiaozhuan(7)">
        <div class="g">
          <span class="xd xd-gengduo"></span>
        </div>
        <span>全部服务</span>
      </div>
      <div>
        <div>
        </div>
        <span></span>
      </div>
    </div>
    <div class="headline">
      <span>知识产权</span>
      <div class="arrows"></div>
    </div>
    <div class="drawing">
      <div>
        <div>
          <img src="../../static/images/u84.png" alt="">
        </div>
        <div>
          <img src="../../static/images/u86.png" alt="">
        </div>
      </div>
      <div>
        <img src="../../static/images/u88.png" alt="">
      </div>
    </div>
    <div class="headline">
      <span>初创企业</span>
      <div class="arrows"></div>
    </div>
    <div>
      <div class="firm" v-for="(item,k) of recommend" :key="k" @click="dianpu(item.id,item.providerId)">
        <div>
          <img :src="item.providerImg" alt="">
        </div>
        <div>
          <p>{{item.serviceName}}</p>
          <p> {{item.serviceInfo}}</p>
          <p>
            <span>￥{{fmtPrice(item.price)}}</span> 元</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div>
          <img src="./../common/images/logo.png" alt="">
        </div>
        <div>
          <span>信达</span>
        </div>
      </div>
      <p>一站式企业交易中心</p>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import {
  Swipe,
  SwipeItem
} from 'mint-ui';
export default {
  data() {
    return {
      recommend: '',
    }
  },
  created() {
    this.getnicai();
    Indicator.open('加载中...'); // 页面初始加载提示
  },
  components: {
    swipe: Swipe,
    swipeItem: SwipeItem
  },
  methods: {
    fmtPrice(p) {
      return (parseFloat(p) * 0.01).toFixed(2);
    },
    tiaozhuan(a) {
      if (a === 1) {
        this.$router.push({
          path: '/m/product',
          query: {}
        });
      } else if (a === 2) {
        this.$router.push({
          path: '/m/storelist',
          query: {}
        });
      } else if (a === 3) {
        this.$router.push({
          path: '/m/storelist',
          query: {}
        });
      } else if (a === 4) {
        this.$router.push({
          path: '/m/storelist',
          query: {}
        });
      } else if (a === 5) {
        this.$router.push({
          path: '/m/storelist',
          query: {}
        });
      } else if (a === 6) {
        this.$router.push({
          path: '/m/product',
          query: {}
        });
      }else if (a === 7) {
        this.$router.push({
          path: '/m/product',
          query: {}
        });
      }
    },
    dianpu(id, Id) {
      this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0);
      }),
        this.$router.push({
          path: '/m/goods',
          query: { id, Id }
        });

    },
    getnicai() {
      this.$http({
        method: 'post',
        url: '/recommend/list',
        data: {
        }
      }).then((result) => {
        let data = result.data.hq;
        data.forEach(function(item) {
          item.providerImg = 'http://115.182.107.203:8088/xinda/pic/' + item.providerImg;
          // console.log(item);
          item.marketPrice = item.marketPrice + '.00'
        }, this);
        this.recommend = data;
        if(this.recommend){
          Indicator.close(); // 加载提示关闭 
        }
      })
    },
    changeSwipe(newIndex, oldIndex) {
      // console.log(`swipe from ${newIndex} to ${oldIndex}`);
    }
  }
};
</script>

<style scoped lang="less">
.arrows {
  width: 0rem;
  height: 0rem;
  border-left: 0.01rem solid transparent;
  border-right: 0.01rem solid transparent;
  border-bottom: 0.03rem solid #2693d4;
  font-size: 0px;
  line-height: 0px;
  position: absolute;
  left: 0.45rem;
  top: 0.32rem;
}

.my-swipe {
  width: 3.75rem;
  height: 1.27rem;
  color: #fff;
  font-size: 30px;
  text-align: center;
}

.slide1 {
  img {
    width: 3.75rem;
    height: 1.27rem;
  }
}

.slide2 {
  img {
    width: 3.75rem;
    height: 1.27rem;
  }
}

.slide3 {
  img {
    width: 3.75rem;
    height: 1.27rem;
  }
}

.slide4 {
  img {
    width: 3.75rem;
    height: 1.27rem;
  }
}

.slide5 {
  img {
    width: 3.75rem;
    height: 1.27rem;
  }
}

.service {
  display: flex;
  height: 0.9375rem;
  justify-content: space-around;

  >div {
    >div {
      border-radius: 0.1rem;
      margin-top: 0.18rem;
      width: 0.55rem;
      height: 0.55rem;
      text-align: center;
      >span {
        font-size: 30px;
        color: #fff;
        line-height: 55px;
        text-align: center;
      }
    }
  }
}

.a {
  background-color: #79c4fd;
}

.b {
  background-color: #fd7879;
}

.c {
  background-color: #ba73fd;
}

.d {
  background-color: #79a0fb;
}

.e {
  background-color: #fba479;
}

.f {
  background-color: #53ff8f;
}

.g {
  background-color: #727cff;
}

.headline {
  height: 0.35rem;
  width: 100%;
  position: relative;
  border-bottom: 2px solid #2693d4;
  span {
    line-height: 0.35rem;
    margin-left: 0.2rem
  }
}

.drawing {
  >div:nth-child(1) {
    margin-top: 0.22rem;
    display: flex;
    justify-content: space-around;
    div {
      img {
        width: 1.74rem;
        height: 0.8rem;
      }
    }
  }
  >div:nth-child(2) {
    margin-top: 0.075rem;
    img {
      width: 3.58rem;
      height: 0.8rem;
    }
  }
}

.firm {
  width: 3.585rem;
  margin: 0 auto;
  display: flex;
  margin-top: 0.15rem;
  border-bottom: 0.005rem solid #cfcfcf;
  div:nth-child(1) {
    width: 0.83rem;
    height: 0.83rem;
    border: 0.01rem solid #e3e3e3;
    img {
      width: 0.83rem;
      height: 0.83rem;
    }
  }
  div:nth-child(2) {
    margin-left: 0.12rem;
    p {
      width: 2.615rem;
    }
    // >p:nth-of-type(2){
    //   width: 2.615rem;
    //   overflow:hidden;
    //   text-overflow:ellipsis;
    //   display:-webkit-box;
    //   -webkit-line-clamp:2;
    // }
    >p:nth-of-type(3) {
      margin-bottom: 0.1rem;
      >span {
        color: #ff1514;
      }
    }
  }
}


.bottom {
  width: 1.08rem;
  height: 0.66rem;
  margin: 0.13rem auto;
  div {
    display: flex;
    div:nth-child(1) {
      img {}
    }
    div:nth-child(2) {
      span {
        line-height: 0.6rem;
        font-weight: bold;
      }
    }
  }
  >p {
    font-size: 0.12rem;
    color: #8d8d8d;
  }
}

.top {
  display: flex;
  div:nth-child(1) {}
  div:nth-child(2) {
    margin: 0 auto;

    display: flex;
    div:nth-child(1) {
      img {
        width: 0.3rem;
        height: 0.3rem;
      }
    }
    div:nth-child(2) {
      span {
        line-height: 0.3rem; // font-weight: bold;
      }
    }
  }
}
</style>
