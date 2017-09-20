<template>
	<div class="back-to-top" @click="backToTop" v-show="showReturnToTop" @mouseenter="show" @mouseleave="hide">
		<i :class="[bttOption.iClass]" :style="{color:bttOption.iColor,'font-size':bttOption.iFontsize}"></i>
		<span class="tips" :class="[bttOption.iPos]" :style="{color:bttOption.textColor}" v-show="showTooltips">{{bttOption.text}}</span>
	</div>
</template>

<script>
function scrollIt(destination = 0, duration = 200, easing = "linear", callback) {
	// define timing functions -- 过渡动效
	let easings = {
		// no easing, no acceleration
		linear(t) {
			return t;
		},
		// accelerating from zero velocity
		easeInQuad(t) {
			return t * t;
		},
		// decelerating to zero velocity
		easeOutQuad(t) {
			return t * (2 - t);
		},
		// acceleration until halfway, then deceleration
		easeInOutQuad(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		// accelerating from zero velocity
		easeInCubic(t) {
			return t * t * t;
		},
		// decelerating to zero velocity
		easeOutCubic(t) {
			return --t * t * t + 1;
		},
		// acceleration until halfway, then deceleration
		easeInOutCubic(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		// accelerating from zero velocity
		easeInQuart(t) {
			return t * t * t * t;
		},
		// decelerating to zero velocity
		easeOutQuart(t) {
			return 1 - --t * t * t * t;
		},
		// acceleration until halfway, then deceleration
		easeInOutQuart(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
		},
		// accelerating from zero velocity
		easeInQuint(t) {
			return t * t * t * t * t;
		},
		// decelerating to zero velocity
		easeOutQuint(t) {
			return 1 + --t * t * t * t * t;
		},
		// acceleration until halfway, then deceleration
		easeInOutQuint(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
		}
	};
	// requestAnimationFrame()的兼容性封装：先判断是否原生支持各种带前缀的
	//不行的话就采用延时的方案
	(function() {
		var lastTime = 0;
		var vendors = ["ms", "moz", "webkit", "o"];
		for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame =
				window[vendors[x] + "RequestAnimationFrame"];
			window.cancelAnimationFrame =
				window[vendors[x] + "CancelAnimationFrame"] ||
				window[vendors[x] + "CancelRequestAnimationFrame"];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() {
					callback(currTime + timeToCall);
				}, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	})();

	function checkElement() {
		// chrome,safari及一些浏览器对于documentElemnt的计算标准化,reset的作用
		document.documentElement.scrollTop += 1;
		let elm =
			document.documentElement.scrollTop !== 0
				? document.documentElement
				: document.body;
		document.documentElement.scrollTop -= 1;
		return elm;
	}

	let element = checkElement();
	let start = element.scrollTop; // 当前滚动距离
	let startTime = Date.now(); // 当前时间

	function scroll() { // 滚动的实现
		let now = Date.now();
		let time = Math.min(1, (now - startTime) / duration);
		let timeFunction = easings[easing](time);
		element.scrollTop = timeFunction * (destination - start) + start;

		if (element.scrollTop === destination) {
			callback; // 此次执行回调函数
			return;
		}
		window.requestAnimationFrame(scroll);
	}
	scroll();
}

export default {
	name: 'backtop',
	props: {
		text: { // 文本提示
			type: String,
			default: '返回顶部'
		},
		textColor: { // 文本颜色
			type: String,
			default: '#f00'
		},
		iPos: { // 文本位置
			type: String,
			default: 'right'
		},
		iClass: { // 图标形状
			type: String,
			default: 'xd xd-top'
		},
		iColor: { // 图标颜色
			type: String,
			default: '#f00'
		},
		iFontsize: { // 图标大小
			type: String,
			default: '32px'
		},
		pageY: { // 默认在哪个视图显示返回按钮
			type: Number,
			default: 400
		},
		transitionName: { // 过渡动画名称
			type: String,
			default: 'linear'
		}
	},
	data() {
		return {
			showTooltips: false,
			showReturnToTop: false
		}
	},
	computed: {
		bttOption() {
			return {
				text: this.text,
				textColor: this.textColor,
				iPos: this.iPos,
				iClass: this.iClass,
				iColor: this.iColor,
				iFontsize: this.iFontsize
			}
		}
	},
	methods: {
		show() { // 显示隐藏提示文字
			return this.showTooltips = true;
		},
		hide() {
			return this.showTooltips = false;
		},
		currentPageYOffset() {
			// 判断滚动区域大于多少的时候显示返回顶部的按钮
			window.pageYOffset > this.pageY ? this.showReturnToTop = true : this.showReturnToTop = false;

		},
		backToTop() {
			scrollIt(0, 1500, this.transitionName, this.currentPageYOffset);
		}
	},
	created() {
		window.addEventListener('scroll', this.currentPageYOffset);
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.currentPageYOffset)
	}
}
</script>

<style lang="less" scoped>
.backtop {
	position: fixed;
	right: 25px;
	bottom: 35px;
	span {
		font-size: 30px;
		color: #777;
		cursor: pointer;
	}
}
</style>
