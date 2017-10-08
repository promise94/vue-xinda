<template>
  <div id="asd">
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
      <div>
        <div class="a">
          <span class="xd xd-qianbao"></span>
        </div>
        <span>财税服务</span>
      </div>
      <div>
        <div class="b">
          <span class="xd xd-gongsi"></span>
        </div>
        <span>开公司</span>
      </div>
      <div>
        <div class="c">
          <span class="xd xd-to-bind"></span>
        </div>
        <span>公司变更</span>
      </div>
      <div>
        <div class="d">
          <span class="xd xd-shebao"></span>
        </div>
        <span>个人社保</span>
      </div>
    </div>
    <div class="service">
      <div>
        <div class="e">
          <span class="xd xd-trade"></span>
        </div>
        <span>公司社保</span>
      </div>
      <div>
        <div class="f">
          <span class="xd xd-zhishichanquan-copy"></span>
        </div>
        <span>知识产权</span>
      </div>
      <div>
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
    </div>
  </div>
</template>

<script>
  import {
    Swipe,
    SwipeItem
  } from 'mint-ui';
  export default {
    components: {
      swipe: Swipe,
      swipeItem: SwipeItem
    },
    methods: {
      changeSwipe(newIndex, oldIndex) {
        console.log(`swipe from ${newIndex} to ${oldIndex}`);
      }
    }
  };
</script>

<style scoped lang="less">
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
        margin-top: 0.18rem;
        width: 0.55rem;
        height: 0.55rem;
        text-align: center;
        >span {
          font-size: 30px;
          color: #fff;
          line-height: 55px;
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
    height:0.35rem;
    width:100%;
    border-bottom:2px solid #2693d4;
  }
</style>
