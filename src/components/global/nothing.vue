<template>
	<div class="loading-wrap">
		<svg v-if="loading" class="loading" width="44px" height="44px" viewBox="0 0 44 44">
			<circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
		</svg>
		<div v-if="!loading">
			<span class="icon xd xd-nothing"></span>
			<div class="loading-text">{{title}}</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['loading','title'],
	computed: {
		iconfont() {
			return 'xd-' + this.icon;
		}
	}
}
</script>

<style lang="less" scoped>
.loading-wrap {
	text-align: center;
}

.loading-text {
	color: #999;
	padding: 25px 0;
}
.icon{
	font-size: 88px;
	color: #009dd7;
}
.loading {
	animation: rotator 1.4s linear infinite;
}

@keyframes rotator {
	0% {
		transform: scale(0.5) rotate(0deg);
	}
	100% {
		transform: scale(0.5) rotate(270deg);
	}
}

.loading .path {
	stroke: #009dd7;
	stroke-dasharray: 126;
	stroke-dashoffset: 0;
	transform-origin: center;
	animation: dash 1.4s ease-in-out infinite;
}

@keyframes dash {
	0% {
		stroke-dashoffset: 126;
	}
	50% {
		stroke-dashoffset: 63;
		transform: rotate(135deg);
	}
	100% {
		stroke-dashoffset: 126;
		transform: rotate(450deg);
	}
}
</style>
