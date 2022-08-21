<template>
	<view class="u-demo-block" >
		<u-swiper height="400rpx" :duration="300" circular  :list="list6" @change="e => (currentNum = e.current)"  indicatorStyle="right: 20px">
			<view slot="indicator" class="indicator-num" >
				<text class="indicator-num__text">{{ currentNum + 1 }}/{{ list6.length }}</text>
			</view>
		</u-swiper>
	</view>
</template>

<script>
	export default {
		name:"Banner",
		props:["list6","current"],
		data() {
			return {
				currentNum:0
			};
		},
		created(){
			this.currentNum = this.current 
		}
	};
</script>

<style scoped lang="scss">
	.indicator {
		@include flex(row);
		justify-content: center;
	
		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: rgba(255, 255, 255, 0.35);
			margin: 0 5px;
			transition: background-color 0.3s;
	
			&--active {
				background-color: #ffffff;
			}
		}
	
	}
	
	.indicator-num {
		padding: 2px 0;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 100px;
		width: 35px;
		@include flex;
		justify-content: center;
	
		&__text {
			color: #ffffff;
			font-size: 12px;
		}
	}
</style>