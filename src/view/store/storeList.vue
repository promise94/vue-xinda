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

          <div class="text">
            <p>信达北京服务中心</p>
            <p>信誉<span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span></p>
            <p>北京-北京市-朝阳区</p>
            <div>
              <p>累计服务客户次数&nbsp;：&nbsp;<span>8272</span></p>
              <span class="xd xd-shouye_shugang_shijiantixing">|</span>
              <p>好评率&nbsp;：&nbsp;<span>100%</span></p>
            </div>
            <ul>
              <li>税务代办</li>
              <li>代理记账</li>
              <li>个人社保</li>
              <li>公司变更</li>
            </ul>
            <button>进入店铺</button>
          </div>
        </div>

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

          <div class="text">
            <p>信达北京服务中心</p>
            <p>信誉<span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span><span class="xd xd-dengji-copy"></span></p>
            <p>北京-北京市-朝阳区</p>
            <div>
              <p>累计服务客户次数&nbsp;：&nbsp;<span>8272</span></p>
              <span class="xd xd-shouye_shugang_shijiantixing">|</span>
              <p>好评率&nbsp;：&nbsp;<span>100%</span></p>
            </div>
            <ul>
              <li>税务代办</li>
              <li>代理记账</li>
              <li>个人社保</li>
              <li>公司变更</li>
            </ul>
            <button>进入店铺</button>
          </div>
        </div>

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
  width:1200px;
  margin:0 auto;
  a{
    color:#000;
    text-decoration:none;
  }
  .chance{
    margin:25px 0 8px 0;
  }
  .area-type{
    width:1200px;
    background:#f7f7f7;
    border:1px solid #cccccc;
    >div>div{   
      border:1px solid #cccccc;
    }
    >div:nth-child(1){
      width:1200px;
      display:flex;
      >div:nth-child(1){
        font-size:18px;
        width:100px;
        height:45px;
        line-height:45px;
        text-align:center;
      }
      >div:nth-child(2){
        padding-left:15px;
        line-height:45px;
        width:1100px;
      }
    }
    >div:nth-child(2){
      width:1200px;
      display:flex;
      >div:nth-child(1){
        font-size:18px;
        width:100px;
        height:45px;
        line-height:45px;
        text-align:center;
      }
      >div:nth-child(2){
        padding-left:15px;
        width:1100px;
        ul{
          display:flex;
          li{
            width:80px;
            height:25px;
            line-height:25px;
            margin:10px 2px;
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
    width:1200px;
    margin:25px 0;
    border:1px solid #cccccc;
    .order{
      width:1200px;
      display:flex;
      background:#f7f7f7;
      border-bottom:1px solid #cccccc;
      >div{
        width:110px;
        height:42px;
        line-height:42px;
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
          left:50px;
          bottom:-5px;
        }
      } 
    }
    .main{
      width:1200px;
      display:flex;
      justify-content:space-between;
      flex-wrap:wrap;
      .store{
        width:568px;
        height:252px;
        margin:15px;
        border:1px solid #cccccc;
        display:flex;
        .imgs{
          width:200px;
          height:252px;
          
          div:nth-child(1){
            margin:75px 35px 60px 35px;
            display:flex;
            img{
              width:55px;
              height:55px;
              margin-right:10px;
            }
            p{
              font-size:30px;
            }
          }
          div:nth-child(2){
            margin:0 35px 0 45px;
            display:flex;
            img{
              width:35px;
              height:30px;
              margin-right:10px;
            }  
          }
          
        }
        .text{
          height:252px;
          padding:20px 0;
          line-height:28px;
          >div{
            display:flex;
            >span{
              margin:0 35px 0 20px;
            }
          }
          ul{
            margin:10px 0;
            display:flex;
            li{  
              padding:0 10px;
              margin-right:5px;
              background:#2594d4;
              color:#fff;
              border-radius:5px;
            }
          }
          button{
            color:#fff;
            margin-top:25px;
            padding:8px 24px;
            background:#ff5b1b;
            border:0;
            border-radius:5px;
          }
        }
      }
    }
  }
}
</style>