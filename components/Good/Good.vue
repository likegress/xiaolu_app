<template>
	<view class="good-container" @click="toDetail(good)">
	  <image :src="good.img" class="image"></image>
	  <view class="main">
	    <view class="title">{{good.title}}</view>
	    <slot></slot>
	  </view>
	</view>
</template>

<script>
	export default {
		props:["good"],
		methods: {
			toDetail({id}){
				uni.navigateTo({url:"/pages/detail/detail?id="+id})
			}
		},
	}
</script>

<style scoped lang="scss">
	.good-container {
	  border-radius: 20rpx;
	  background: #fff;
	  margin-bottom: 10rpx;
	  overflow: hidden;
	  font-size: 30rpx;
	  display: flex;
	  flex-direction: column;
	  justify-content: space-around;
	}
	.image {
	  width: 100%;
	  margin-bottom: 20rpx;
	}
	
	.main {
	  box-sizing: border-box;
	  padding: 0 20rpx;
	}
	.main .title {
	  width: 100%;
	  overflow: hidden;
	  text-overflow: ellipsis;
	  display: -webkit-box;
	  -webkit-line-clamp: 1;
	  -webkit-box-orient: vertical;
	  margin-bottom: 20rpx;
	}
</style>