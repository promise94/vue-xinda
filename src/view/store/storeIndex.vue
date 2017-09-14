<template>
  <div id="storeIndex">
    <div class="logoside">信达北京服务中心</div>
     <router-view></router-view> 
  </div>
</template>

<script>
export default {
  name: 'storeIndex',
}
</script>

<style lang="less" scoped>
#storeIndex{
  width:90%;
  margin:0 auto;
  background:red;
}