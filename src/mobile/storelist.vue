<template>
    <div id="storelist">
        <div class="change">
            <p @click="changecolor(1)" :class="{colorchange: change ==1}">默认排序</p>
            <p @click="changecolor(3)" :class="{colorchange: change ==3}">销量</p>
        </div>

        <div class="main">
            <div class="store"  v-for="item of arr" @click="gotoStore(item.id)">
                <div class="img"><img v-bind:src="item.providerImg"></div>
                <div>
                    <h3>{{item.providerName}}</h3>
                    <p>{{item.regionName}}</p>
                    <div>
                        <p>累计客户数量:
                            <span>{{item.orderNum}}</span>
                        </p>
                        <p>好评率:
                            <span>{{(item.goodJudge/item.totalJudge)*100+"%"}}</span>
                        </p> 
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>
<script>

export default {
    name: 'storelist',
    data() {
        return {
            change: 1,
            arr: '', //总数据获取
            members: {
                start: 0, //分页起始数
                sort: 1,//默认排列
            },
        }
    },
    created() {
        this.getStoreList();
        
    },
    methods: {
        changecolor(n){
            this.change=n;
            this.members.sort=n;
            this.getStoreList();
        },
        //店铺列表后台数据获取
        getStoreList() {
        this.$http({
            method: 'post',
            url: '/provider/grid',
            data: this.members,
        }).then((result) => {
            let data = result.data;
            let len = data.length;
            for (var i = 0; i < len; i++) {
            data[i].totalJudge == 0 ? data[i].totalJudge = 1 : ""; //好评率数据处理
            data[i].providerImg.substring(0, 3) == 'http' ? data[i].providerImg = data[i].providerImg : data[i].providerImg = "http://115.182.107.203:8088/xinda/pic" + data[i].providerImg;//图片数据处理，加上前缀
            };
            this.arr = data;
        })
        },
        //跳转页面到店铺首页，传一个id
        gotoStore(id) {
        this.$router.push({ path: '/m/storeindex', query: { id } });
        },

        
    }
}
</script>

<style lang="less" scoped>
    .change{
        display:flex;
        margin:0.22rem  auto;
        width:1.8rem;
        height:0.32rem;
        border:0.01rem solid #2594d4;
        border-radius:0.05rem;
        font-size:0.14rem;
        text-align:center;
        >p{
            width:0.9rem;
            line-height:0.32rem;
        }
        .colorchange{
            color:#fff;
            background:#2594d4;
        }
    }
    .main{
        margin:0 auto;
        width:95%;
        .store{
            display:flex;
            margin-bottom:0.15rem;
            width:100%;
            height:1rem;
            border-bottom:0.01rem solid #cfcfcf;
            .img{
                margin-right:0.1rem;
                width:0.85rem;
                height:0.85rem;
                border:0.01rem solid #e3e3e3;
                img{
                    margin:0.25rem 0.08rem;
                    width:80%;
                }
            }        
            >div{
                >p{
                    line-height:0.3rem;
                } 
                >div{
                    display:flex;
                    margin-top:0.1rem;
                    >p{
                        margin-right:0.07rem;
                        span{
                            color:red;
                        }
                    }
                } 
            }
            
        }
    }
</style>