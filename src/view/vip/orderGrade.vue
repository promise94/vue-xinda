<template>
    <div>
        <div class="evaluntionTop">
            <p>评价</p>
        </div>
        <div class="neirong">
            <div>
                <p>服务单号：</p>
                <span>B11111</span>
                <p>购买内容：</p>
                <span>B11111</span>
                <p>购买时间：</p>
                <span>2016-05-21</span>
            </div>
            <div>
                <p>评价：</p>
                <input id="good" type="radio" name="ping">
                <label for="good">好评</label>
                <input id="zhong" type="radio" name="ping">
                <label for="zhong">中评</label>
                <input id="cha" type="radio" name="ping">
                <label for="cha">差评</label>
            </div>
            <div>
                <p>评分：</p>
                <span v-for="(n,k) of grade" :key="k" @click="gradeActive(k)" @mouseout="gradeOut()" @mouseover="gradeMove(k)" :class="{active: n.active}" class="xd xd-xingxing"></span>
            </div>
            <div>
                <p>感受：</p>
                <textarea cols="30" rows="10"></textarea>
            </div>
            <button @click="saveGrade">提交</button>
        </div>
        <v-alert ref="alert" :type="type" :info="info"></v-alert>
    </div>
</template>

<script>
import vAlert from '@/components/global/alert';

export default {
    name: 'Grade',
    components: {
        vAlert,
    },
    data() {
        return {
            grade: [{ active: false }, { active: false }, { active: false }, { active: false }, { active: false }], // 评价星级
            type: 'success', // 提示窗类型
            info: '', // 提示信息
        }
    },
    methods: {
        gradeMove(k) { // 星级hover状态
            this.grade.forEach((item, n) => {
                if (item.hasOwnProperty('on')) { // 重新初始化
                    delete item.on;
                }
                if (n <= k) {
                    item.active = true;
                } else {
                    item.active = false;
                }
            });
        },
        gradeOut() {
            if (!this.grade[0].hasOwnProperty('on')) {
                this.grade.forEach((item, k) => {
                    item.active = false;
                })
            }
        },
        gradeActive(k) { // 选择星级
            this.grade.forEach((item, n) => {
                if (n <= k) {
                    item.active = true;
                    item.on = true; // 选中标记
                } else {
                    item.active = false;
                }
            });
        },
        saveGrade(){
            this.info = '评价成功';
            this.$refs.alert.alert().then(()=>{
                this.$router.push('evaluntion');
            })
        }
    }
}
</script>

<style lang="less" scoped>
.evaluntionTop {
    margin-top: 55px;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 23px;
    p {
        font-size: 20px;
        width: 115px;
        color: #2594d4;
        line-height: 30px;
        text-align: center;
        margin-left: 10px;
        border-bottom: 2px solid #2594d4;
    }
}

.neirong {
    margin-left: 10px;
    >div {
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        >p {
            width: 80px;
        }
        &:nth-of-type(1) {
            span {
                margin-right: 80px;
            }
        }
        &:nth-of-type(2) {
            label {
                font-size: 16px;
                margin-right: 40px;
            }
        }
        &:nth-of-type(3) {
            span {
                color: #bbb;
                padding-right: 10px;
            }
            .active {
                color: orangered;
            }
        }
        &:nth-of-type(4) {
            textarea {
                padding: 5px;
                width: 700px;
                height: 150px;
                box-sizing: border-box;
                resize: none;
                outline: none;
                letter-spacing: 1px;
                transition: .15s linear;
                &:focus {
                    border-color: rgb(37, 148, 212);
                }
                &::selection {
                    color: orange;
                    background-color: #444;
                }
            }
        }
    }
    button {
        width: 100px;
        height: 35px;
        line-height: 100%;
        text-align: center;
        margin: 10px 0 0 680px;
        background: #2594d4;
        color: #fff;
        border: 0;
        border-radius: 5px;
        outline: medium;
        cursor: pointer;
        &:hover {
            background: #6a6d71;
        }
    }
}
</style>
