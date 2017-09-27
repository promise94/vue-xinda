<template>
    <div id="page">
        <ul>
            <li @click="setPage('first')">首页</li>
            <li @click="setPage('left')" class="xd xd-left"></li>
            <li @click="setPage(k)" v-for="(val,k) of pageNum" :key="k" :class="{bluestore: btnIndex=== k}">{{k+1}}</li>
            <li @click="setPage('right')" class="xd xd-right"></li>
            <li @click="setPage('last')">尾页</li>
        </ul>
    </div>
</template>

<script>

export default {
    name: 'page',
    props: {
        amount: {
            type: Number,
        },
        limit: {
            type: Number,
            default: 5,
        },
        type: String,
    },
    data() {
        return {
            btnIndex: 0,
        }
    },
    created() {
    },
    computed: {
        pageNum() {
            return Math.ceil(this.amount / this.limit);
        }
    },
    methods: {
        setPage(n) {
            if (n == 'first') {
                n = 0;
            } else if (n == 'last') {
                n = this.pageNum - 1;
            } else if (n == 'left') {
                n = (this.btnIndex -= 1);
            } else if (n == 'right') {
                n = (this.btnIndex += 1);
            }
            if (n < 0) {
                n = 0;
                this.btnIndex = n;
                return;
            }
            if (n >= this.pageNum) {
                n = this.pageNum - 1;
                this.btnIndex = n;
                return;
            }
            this.btnIndex = n;
            this.$emit('page', n * this.limit);
        }
    }
};
</script>

<style lang="less" scoped>
#page {
    ul {
        display: flex;
        justify-content: center;
        align-items: center;
        li {
            display: inline-block;
            margin-right: 5px;
            box-sizing: border-box;
            width: 50px;
            height: 35px;
            line-height: 35px;
            text-align: center;
            color: #9c9c9c;
            border: 1px solid #b0b0b0;
            background: #f4f4f4;
            cursor: pointer;
            user-select: none;
            &:hover {
                background: #2594d4;
                color: #fff;
            }
            &::before {
                cursor: pointer;
            }
        }
        li:first-child {
            margin-right: 12px;
        }
        li:last-child {
            margin-left: 7px;
        }
    }
    .bluestore {
        background: #2594d4;
        color: #fff;
    }
}
</style>