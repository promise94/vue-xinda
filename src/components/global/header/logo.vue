<template>
    <div class="container hd-content">
        <div class="logo">
            <a href="javascript:;">
                <img src="../../../common/images/logo.png" alt="">信达
            </a>
            <div>
                <span>北京</span>
                <a href="javascript:;">[切换城市]</a>
            </div>
        </div>
        <ul class="search">
            <li>
                <span class="active">产品</span>
                <span>|</span>
                <span>服务商</span>
            </li>
            <li>
                <input type="text" placeholder="搜索您需要的服务或服务商">
                <button class="xd xd-search"></button>
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
    </div>
</template>

<script>
export default {
    name: 'logo'
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
                >span{
                    padding-left: 15px;
                }
                >div{
                    display: inline-block;
                    span{
                        margin-right: 15px;
                        cursor: pointer;
                        &:hover{
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

@keyframes filterBtn {
    from {
        left: -20%
    }
    to {
        left: 120%
    }
}
</style>
