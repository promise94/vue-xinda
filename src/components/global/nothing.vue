<template>
	<div class="nothing">
		<span class="xd" :class="iconfont"></span>
		<h6>{{title}}</h6>
	</div>
</template>

<script>
export default {
	props: {
		title: String,
		icon: {
			type: String,
			default: 'nothing'
		}
	},
	computed: {
		iconfont(){
			return 'xd-' + this.icon;
		}
	}
}
</script>

<style lang="less" scoped>
.nothing {
	padding: 0 0 35px;
	text-align: center;
	span {
		font-size: 120px;
		color: rgb(90, 129, 244);
	}
	h6 {
		font-size: 30px;
		letter-spacing: 15px;
		font-family: serif;
	}
}
</style>
