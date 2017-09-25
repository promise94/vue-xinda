<template>
    <div class="center">
        <img src="../../common/images/u3629.png" alt="">
        <router-view></router-view>
        <!-- 测试 
        {{getUsername}} -->
        <div class="bk">
            <div class="bk_1">
                <div class="bk_2 " v-on:mouseenter="myhover(0)" :class="{ dd: index ===0}">
                    <img src="../../common/images/u3632.png" alt="">
                    <div >
                        <p>工商注册</p>
                        <p>REGISTERED</p>
                    </div>
                </div>
                <div class="bk_2" v-on:mouseenter="myhover(1)" v-bind:class="{ dd: index ===1}">
                    <img src="../../common/images/u3634.png" alt="">
                    <div>
                        <p>财务服务</p>
                        <p>SERVICE</p>
                    </div>
                </div>
                <div class="bk_2" v-on:mouseenter="myhover(2)" v-bind:class="{ dd: index ===2}">
                    <img src="../../common/images/u3636.png" alt="">
                    <div>
                        <p>知识产权</p>
                        <p>INTELLECTUALPROPERTY</p>
                    </div>
                </div>
                <div class="bk_2" v-on:mouseenter="myhover(3)" v-bind:class="{ dd: index ===3}">
                    <img src="../../common/images/u3638.png" alt="">
                    <div>
                        <p>人力外包</p>
                        <p>HR OUTSOURCING</p>
                    </div>
                </div>
            </div>
            <div class="bk_3">
                <div class="b1 b" v-show="index === 0">
                    <p>我们需要什么样的服务商？</p>
                    <p>在公司注册、公司变更、资质审批等领域深耕多年，在业内享有一定的知名度，可以提供优质优价的服务；</p>
                    <p>与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。</p>
                </div>
                <div class="b2 b" v-show="index === 1">
                    <p>我们需要什么样的服务商？</p>
                    <p>在代理记账、审计验资等领域深耕多年，可以提供涉足各个行业优秀的财会人员；</p>
                    <p>与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。</p>
                </div>
                <div class="b3 b" v-show="index === 2">
                    <p>我们需要什么样的服务商？</p>
                    <p>在商标注册，版权专利，著作权等领域深耕多年，具有丰富的知识产权经验；</p>
                    <p>与时俱进，视野立足未来，了解创业者的需求，并乐于为创业者服务。 </p>
                </div>
                <div class="b4 b" v-show="index === 3">
                    <p>我们需要什么样的服务商？</p>
                    <p>在人事代理、企业社保、个人社保等领域深耕多年，具有丰富的社保代理经验。 </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// 测试
// import{mapGetters} from 'vuex'
//--
export default {
    data() {
        return {
            index: 0,
        }
    },
    methods: {
        myhover(n) {
            this.index = n;
        },
        // 测试
        // ...mapActions(['loginAction'])
        // --
    },
    // 测试
    // computed:{
    //     ...mapGetters(['getUsername'])
    // },
    // 登录成功
    // this.loginAction(this.phone)
//--
};
</script>

<style lang="less" >
.center {

    // width: 1900px;
    // height: 2482px;
    // margin: 0 auto;

    img {
        width: 100%;
        height: 100%;
    }

    .bk {
        width: 1200px;
        height: 474px;
        margin: 0 auto;
        margin-top: 50px;
        // border: 1px solid red;
    }

    .bk_1 {
        width: 1200px;
        display: flex;
        justify-content: space-between;
    }

    .bk_2 {
        text-align: center;
        width: 243px;
        height: 254px;
        // border: 1px solid red;
        img {
            width: 155px;
            height: 155px;
            margin: 15px 0;
        }
        div {
            p {
                cursor: pointer;
            }
            >p:nth-of-type(1) {
                font-size: 18px; // color: black;
                font-weight: bold;
            }
            >p:nth-of-type(2) {
                font-size: 12px; // color: gray;
            }
        }
    }
    .bk_3 {
        width: 1200px;
        height: 221px;
        .b {
            width: 1200px;
            height: 220px;
            text-align: center;
            >p:nth-child(1) {
                font-size: 18px;
                font-weight: bold;
                line-height: 54px;
            }
            >p:nth-child(2) {
                font-size: 17px;
                line-height: 25px;
                color: gray;
            }
            >p:nth-child(3) {
                font-size: 17px;
                line-height: 25px;
                color: gray;
            }
        }
    }
}

.dd {
    color:#f57f51;
}
</style>
