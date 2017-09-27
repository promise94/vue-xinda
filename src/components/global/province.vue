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
	created() {
		
		// this.upCity();
		this.defaultProv();
	},
	methods: {
		defaultProv() {
			// console.log(data);
			if (this.regionId) {
				let p = this.regionId.toString().substr(0, 2);
				let c = this.regionId.toString().substr(2, 2);
				let a = this.regionId.toString().substr(4, 2)
				data.forEach((item) => {
					if (item.code.toString().substr(0, 2) == p) {
						if (item.regionEntitys) {
							item.regionEntitys.forEach((s) => {
								if (s.code.toString().substr(2, 2) == c) {
									if (s.regionEntitys) {
										s.regionEntitys.forEach((k) => {
											if (k.code.toString().substr(4, 2) == a) {
												this.area = k;
												// console.log('run in for', item,);
											}
										})
									}
								}
							});
						}
					}
				})
			}
		},
		upCity(p,c) { // 更新市
			let temp = this.prov;
			if (this.prov.regionEntitys) {
				this.cityArr = p ? p : this.prov.regionEntitys;
				this.city = c ? c : this.prov.regionEntitys[0];
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
				// console.log('run in up', this.area);
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
			// console.log('wath', this.area);
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
