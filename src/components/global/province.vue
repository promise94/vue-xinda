<template>
	<div class="prov">
		<select v-model="prov">
			<option value="">--省--</option>
			<option v-for="(item, k) of provArr" :key="k" :value="item">{{item.region}}</option>
		</select>
		<select v-model="city">
			<option value="" v-show="!prov">--市--</option>
			<option v-for="(item, k) of cityArr" :key="k" :value="item">{{item.region}}</option>
		</select>
		<select v-model="area">
			<option value="" v-show="!prov">--区--</option>
			<option v-for="(item, k) of areaArr" :key="k" :value="item">{{item.region}}</option>
		</select>
	</div>
</template>

<script>
import data from '../../common/js/prov';
export default {
	name: 'Prov',
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
	created() {
		// this.upCity();
	},
	methods: {
		upCity() {
			let temp = this.prov;
			if (this.prov.regionEntitys) {
				this.cityArr = this.prov.regionEntitys;
				this.city = this.prov.regionEntitys[0];
				this.upArea();
			} else {
				this.cityArr = '';
				this.areaArr = '';
				this.city = '';
				this.area = '';
			}
		},
		upArea() {
			if (this.city) {
				this.areaArr = this.city.regionEntitys;
				this.area = this.city.regionEntitys[0];
			}
		},
		returnMsg() {
			if (!this.prov) {
				this.$emit('province', '');
			} else if (!this.prov.regionEntitys) {
				this.$emit('province', [{ 'code': this.prov.code, 'region': this.prov.region }, { 'code': '', 'region': '' }, { 'code': '', 'region': '' }]);
			} else {
				this.$emit('province', [{ 'code': this.prov.code, 'region': this.prov.region }, { 'code': this.city.code, 'region': this.city.region }, { 'code': this.area.code, 'region': this.area.region }]);
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
