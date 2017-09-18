<template>
    <div class="container hd-content">
        <div class="logo">
            <a @click="goto('/')" href="javascript:;">
                <img src="../../../common/images/logo.png" alt="">信达
            </a>
            <div>
                <span>{{activeCity}}</span>
                <a @click="swichCity" href="javascript:;">[切换城市]</a>
                <input type="hidden" v-model="regionId">
            </div>
        </div>
        <ul class="search">
            <li>
                <span @click="switchType(1)" :class="{active: typeIn == 1}">产品</span>
                <span>|</span>
                <span @click="switchType(2)" :class="{active: typeIn == 2}">服务商</span>
            </li>
            <li>
                <input type="text" @keyup.enter="search()" v-model="searchName" placeholder="搜索您需要的服务或服务商">
                <button @click="search()" class="xd xd-search"></button>
            </li>
            <li>
                <span>热门服务&nbsp;:&nbsp;</span>
                <div>
                    <span class="">社保开户</span>
                    <span>公司注册</span>
                </div>
            </li>
        </ul>
        <div class="contact">
            <span class="xd xd-lianxidianhua"></span>
            <span>010-83421842</span>
        </div>
        <div v-show="isShowCity" class="allCity">
            <h2>城市选择</h2>
            <p>尊敬的用户您好：请选择准确的地址方便我们为您提供更精确的服务！</p>
            <div class="city">
                <span v-for="item of allCity" @click="setCity(item)">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'logo',
    data() {
        return {
            typeIn: 1, // 搜索类型切换 1:产品，2:商品
            searchName: '', // 搜索内容
            activeCity: '', // 所选城市
            allCity: '', // 所有城市
            regionId: '110100', // 所选城市编码
            isShowCity: false, // 选择城市面板
        }
    },
    created() {
        if (this.$route.path.indexOf('search') > -1 && sessionStorage.getItem('searchInfo')) {
            let searchInfo = JSON.parse(sessionStorage.getItem('searchInfo'));
            this.searchName = searchInfo.keyword;
            this.typeIn = searchInfo.type;
        }
        this.getActiveCity();
    },
    methods: {
        search() { // 搜索跳转
            this.$router.push('/search/' + Math.random().toString(16).substr(2));
            sessionStorage.setItem('searchInfo', JSON.stringify({ keyword: this.searchName, type: this.typeIn, id: this.regionId }));
        },
        goto(url) {
            this.$router.push(url);
        },
        switchType(n) {
            this.typeIn = n;
        },
        getActiveCity() {
            this.$http.post('/common/select-region').then((res) => {
                if (res.status === 1) {
                    this.activeCity = res.data.name;
                }
            });
        },
        getAllCity() {
            this.$http.post('/common/open-region').then((res) => {
                this.allCity = res.data;
            })
        },
        swichCity() {
            this.isShowCity = !this.isShowCity;
            this.getAllCity();
        },
        setCity(val) {
            console.log(val);
            this.isShowCity = false;
            this.$http.post('/common/change-region', { regionId: val.id }).then((res) => {
                if (res.status === 1) {
                    this.activeCity = val.name;
                    this.regionId = val.id;
                }
            })
        }
    }
};
</script>

<style lang="less" scoped>
@color: #2693d4;
@colora3: #a3a3a3;
.center(@flex) {
    display: @flex;
    align-items: center;
}

.hd-content {
    padding-top: 25px;
    .center(flex);
    justify-content: space-between;
    font-size: 14px;
    .logo {
        width: 250px;
        .center(flex);
        >a {
            .center(inline-flex);
            font-size: 26px;
            font-weight: 700;
            color: #000;
            img {
                width: 55px;
            }
        }
        >div {
            padding-left: 15px;
            >span {
                display: block;
            }
            a {
                color: @color;
            }
        }
    }
    .search {
        width: 600px;
        li {
            &:nth-of-type(1) {
                span {
                    &:not(:nth-of-type(2)) {
                        cursor: pointer;
                    }
                    &:nth-of-type(2) {
                        color: @color;
                        padding: 0 5px;
                    }
                }
                .active {
                    color: @color;
                }
            }
            &:nth-of-type(2) {
                padding: 5px 0;
                font-size: 0;
                 ::-webkit-input-placeholder {
                    color: @colora3;
                }
                 :-moz-placeholder {
                    color: @colora3;
                }
                 :-ms-input-placeholder {
                    color: @colora3;
                }
                 ::-moz-placeholder {
                    color: @colora3;
                }
                input {
                    box-sizing: border-box;
                    width: 485px;
                    height: 41px;
                    border: 2px solid @color;
                    vertical-align: bottom;
                    text-indent: 3%;
                    font-size: 14px;
                    color: @colora3;
                }
                button {
                    box-sizing: border-box;
                    position: relative;
                    width: 100px;
                    height: 41px;
                    font-size: 24px;
                    color: #fff;
                    background-color: @color;
                    border: 0;
                    cursor: pointer;
                    outline: none;
                    &::after {
                        content: "";
                        display: block;
                        width: 10px;
                        height: 60px;
                        position: absolute;
                        top: 0;
                        left: -20%;
                        transform: rotateZ(-35deg) translateY(-10px);
                        background: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))
                    }
                    &:hover {
                        &::after {
                            animation: filterBtn 1s ease-in-out infinite alternate;
                        }
                    }
                }
            }
            &:nth-of-type(3) {
                span {
                    font-size: 12px;
                    color: #c7c7c7;
                }
                >span {
                    padding-left: 15px;
                }
                >div {
                    display: inline-block;
                    span {
                        margin-right: 15px;
                        cursor: pointer;
                        &:hover {
                            color: orange;
                        }
                    }
                }
            }
        }
    }
    .contact {
        .center(inline-flex);
        justify-content: flex-start;
        span {
            &:first-of-type {
                font-size: 50px;
                color: @color;
            }
            &:last-of-type {
                padding-left: 15px;
                font-size: 20px;
                color: @colora3;
            }
        }
    }
}

.allCity {
    position: absolute;
    left: 50%;
    margin-left: -30%;
    top: 40%;
    width: 60%;
    height: 80%;
    background-color: #fefefe;
    border: 1px solid #ccc;
    border-radius: 5px;
    z-index: 1111;
    h2 {
        font-size: 35px;
        text-align: center;
        color: #fff;
        background-color: rgb(99, 194, 199);
        padding: 30px 0 15px;
    }
    p {
        padding-bottom: 25px;
        background-color: rgb(99, 194, 199);
        text-align: center;
        color: #fff;
    }
    .city {
        padding: 35px;
        span {
            padding: 10px 15px;
            border: 1px solid #aaa;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: rgb(99, 194, 199);
                color: #fff;
            }
        }
    }
}

@keyframes filterBtn {
    from {
        left: -20%
    }
    to {
        left: 120%
    }
}
</style>
