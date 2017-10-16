<template>
	<div class="prov">
		<select v-model="prov">
			<option value="">省</option>
			<option v-for="(item, k) of provArr" :key="k" :value="item">{{item.region}}</option>
		</select>
		<select v-model="city">
			<option value="" v-show="!prov">市</option>
			<option v-for="(item, k) of cityArr" :key="k" :value="item">{{item.region}}</option>
		</select>
		<select v-model="area">
			<option value="" v-show="!prov">区</option>
			<option v-for="(item, k) of areaArr" :key="k" :value="item">{{item.region}}</option>
		</select>
	</div>
</template>

<script>
import data from '@/common/js/prov';
export default {
	name: 'Prov',
	props: {
		regionId: {
			default: '',
		}
	},
	data() {
		return {
			provArr: data, // 一级数据
			cityArr: '', // 二级数据
			areaArr: '', // 三级数据
			prov: '', // 省级
			city: '', // 市级 
			area: '', // 区级
		}
	},
	methods: {
		upCity(p, c) { // 更新市
			let temp = this.prov;
			if (temp.regionEntitys) {
				this.cityArr = p ? p : temp.regionEntitys;
				this.city = c ? c : temp.regionEntitys[0];
				this.upArea();
			} else {
				this.cityArr = '';
				this.areaArr = '';
				this.city = '';
				this.area = '';
			}
		},
		upArea(c, a) { // 更新区
			if (this.city) {
				this.areaArr = c ? c : this.city.regionEntitys;
				this.area = a ? a : this.city.regionEntitys[0];
			}
		},
		returnMsg() { // 返回数据
			if (!this.prov) {
				this.$emit('province', '');
			} else if (!this.prov.regionEntitys) {
				this.$emit('province', [{ 'code': this.prov.code, 'region': this.prov.region }, { 'code': '', 'region': '' }, { 'code': '', 'region': '' }]);
			} else {
				this.$emit('province', [
					{ 'code': this.prov.code, 'region': this.prov.region },
					{ 'code': this.city.code, 'region': this.city.region },
					{ 'code': this.area.code, 'region': this.area.region }
				]);
			}
		}
	},
	watch: {
		prov() {
			this.upCity();
			if (!this.prov.regionEntitys) {
				this.returnMsg();
			}
		},
		city() {
			this.upArea();
		},
		area() {
			this.returnMsg();
		}
	}
}



</script>

<style lang="less" scoped>
.prov {
	select {
		width: 150px;
		height: 25px;
		margin-right: 5px;
	}
}
</style>
