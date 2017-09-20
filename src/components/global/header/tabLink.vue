<template>
  <div class="linkBox">
    <ul class="tabLink container">
      <li v-for="(item, n) of link" @click="goPage(n)" :key="n" :class="{active: index === n}">
        <span>{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      link: { '/': '全部产品', '/services': '财税服务', '/sifco': '公司工商', '/us': '加盟我们', '/storeList': '店铺' },
      index: '',
    }
  },
  created() {
    let urlLink = this.$route.path === '/' ? Object.keys(this.link)[0] : this.$route.path.substr(1);
    this.index = urlLink;
  },
  methods: {
    goPage(n) {
      this.index = n;
      this.$router.push(n);
    }
  }
}
</script>

<style lang="less" scoped>
@color: #2693d4;
.linkBox {
  border-bottom: 1px solid @color;
  .tabLink {
    margin-top: 15px;
    li {
      display: inline-block;
      width: 200px;
      font-size: 18px;
      text-align: center;
      >span {
        display: inline-block;
        height: 40px;
        padding-bottom: 5px;
        box-sizing: border-box;
        cursor: pointer;
        &:hover {
          color: @color;
          border-bottom: 4px solid @color;
        }
      }
    }
    .active {
      >span {
        color: @color;
        border-bottom: 4px solid @color;
      }
    }
  }
}
</style>
