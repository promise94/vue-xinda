<template>
    <transition name="alert" tag="div">
        <div class="alert-content" :class="type" v-show="show">
            <span class="xd" :class="classes"></span>
            <p>{{info}}</p>
            <span></span>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        info: String,
        type: {
            type: String,
            default: 'success',
        },
        time: {
            type: [Number, String],
            default: 1,
        }
    },
    data() {
        return {
            show: false, // 是否显示提示框
            promise: '', // 保存promise对象
        }
    },
    computed: {
        classes() {
            return `xd-${this.type}`;
        }
    },
    methods: {
        confirm() {
            this.show = true;
            this.promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.show = false;
                    resolve();
                }, this.time * 1000);
            });
            return this.promise;
        }
    }
}
</script>

<style lang="less" scoped>
.alert-enter-active,
.alert-leave-active {
    transition: .35s opacity;
}

.alert-leave-to,
.alert-enter {
    opacity: 0;
}

.alert-content {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    position: fixed;
    top: 50%;
    left: 50%;
    padding: 2px 15px 2px 10px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .8);
    font-size: 16px;
    color: #fefefe;
    p {
        padding-left: 10px;
        color: #fefefe;
    }
}

.success {
    background-color: #13CE66;
}

.warning {
    background-color: #F7BA2A;
}

.error {
    background-color: #FF4949;
}

.info {
    background-color: #20A0FF;
}
</style>
