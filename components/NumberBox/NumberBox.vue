<template>
	<view class="">
		<u-number-box v-model="value" @change="onChange($event)" @overlimit="min">
			<view slot="minus" class="minus"><u-icon name="minus" size="12" color="#cccccc"></u-icon></view>
			<text slot="input" style="width: 50px;text-align: center;" class="input">{{ value }}</text>
			<view slot="plus" class="plus"><u-icon name="plus" color="#FFFFFF" size="12"></u-icon></view>
		</u-number-box>
	</view>
</template>

<script>
import {mapActions} from "vuex"
export default {
	name:"NumberBox",
	props:["good"],
	data() {
		return {
			value: this.good.goodNum,
		};
	},
	methods: {
		//购物车
		...mapActions(["addCart"]),
		//添加购物车功能
		onChange({value}){
			// 让good的值改变
			this.$set(this.good,"goodNum",value)
			//把good值传入vuex中处理
			// console.log(this.$store.state.goodCar);
			this.$store.state.goodCar.forEach((item,i) => {
				if(item.id == this.good.id){
					this.$set(this.$store.state.goodCar,i,this.good)
				}
			});
			this.addCart(this.good)
			this.$emit("getNum",value)
		},
		min(){
			uni.showToast({
				title: '数值不能再小了',
				icon: 'success',
				mask: true
			})
		},
		// 把数据传给父元素

	},

	
};
</script>

<style scoped lang="scss">
.minus {
	width: 22px;
	height: 22px;
	border-width: 1px;
	border-color: #e6e6e6;
	border-top-left-radius: 100px;
	border-top-right-radius: 100px;
	border-bottom-left-radius: 100px;
	border-bottom-right-radius: 100px;
	@include flex;
	justify-content: center;
	align-items: center;
}

.input {
	padding: 0 10px;
}

.plus {
	width: 22px;
	height: 22px;
	background-color: #ff0000;
	border-radius: 50%;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
}
</style>
