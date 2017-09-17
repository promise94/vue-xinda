<template>
    <div id="page">
        <ul>
            <li>首页</li>
            <li>上一页</li>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>...</li>
            <li>7</li>
            <li>下一页</li>
            <li>尾页</li>
        </ul>

    </div>
</template>

<script>

export default {
  name: 'page'

};
</script>

<style lang="less" scoped>
#page{
    ul{
        margin:0 auto;
        display:flex;
        li{
            color:#9c9c9c;
            background:#f4f4f4;
            padding:13px 15px;
            margin:4px;
            border:1px solid #b0b0b0;
            cursor:pointer;
        }
        li:first-child{
            margin-right:12px;
        }
        li:last-child{
            margin-left:12px;
        }
    }   
}
</style>