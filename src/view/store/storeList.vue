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
              <img src="../../common/images/u3638.png" alt="">
              <p>信达</p>
            </div>
            <div>
              <img src="../../common/images/u3638.png" alt="">
              <p>金牌服务商</p>
            </div>
          </div>
        </div>

        <div class="store"></div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
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
  }
}
</script>

<style lang="less" scoped>
#storeList{
  font-size:14px;
  width:76%;
  margin:0 auto;
  a{
    color:#000;
    text-decoration:none;
  }
  .chance{
    margin:20px 0 10px 0;
  }
  .area-type{
    width:100%;
    background:#f7f7f7;
    border:1px solid #cccccc;
    >div>div{   
      border:1px solid #cccccc;
    }
    >div:nth-child(1){
      width:100%;
      display:flex;
      >div:nth-child(1){
        padding:1% 0;
        font-size:18px;
        width:9%;
        text-align:center;
      }
      >div:nth-child(2){
        padding:1.2% 0;
        padding-left:10px;
        width:91%;
      }
    }
    >div:nth-child(2){
      width:100%;
      display:flex;
      >div:nth-child(1){
        padding:1% 0;
        font-size:18px;
        width:9%;
        text-align:center;
      }
      >div:nth-child(2){
        width:91%;
        padding-left:10px;
        ul{
          display:flex;
          height:100%;
          li{
            width:7%;
            padding:0.7% 0;
            margin:5px 2px;
            text-align:center;
            border-radius:6px;
            cursor:pointer;
            &:hover{
              background:#2594d4;
              color:#fff;
            }
          }
          .all{
            color:#fff;
            background:#2594d4;
          }
        }
      }
    }
  }
  .mainBox{
    width:100%;
    margin:25px 0;
    border:1px solid #cccccc;
    .order{
      width:100%;
      display:flex;
      background:#f7f7f7;
      border-bottom:1px solid #cccccc;
      >div{
        width:10%;
        padding:1% 0;
        margin-right:5px;
        position:relative;
        text-align:center;  
        &:hover{
          background:#2594d4;
          color:#fff;
        } 
      }
      .blue{
        color:#fff;
        background:#2594d4;
        >div{
          width:10px;
          height:10px;
          transform:rotate(45deg);
          background:#2594d4;
          position:absolute;
          left:46%;
          bottom:-10%;
        }
      } 
    }
    .main{
      width:100%;
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      >div{
        width:46.5%;
        height:250px;
        margin:15px 1.5%;
        border:1px solid #cccccc;
        background:yellow;
        .imgs{
          width:22%;
          padding:0 5%;
          div:nth-child(1){
            img{
              width:40%;
            }
          }
          
        }
      }
    }
  }
}

</style>