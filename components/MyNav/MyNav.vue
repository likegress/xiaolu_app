<template>
	<view class="content">
		<!-- h5 -->
		<view class="nav_h5" v-if="H5">
		  <u-avatar :src="src"></u-avatar>
		  <text class="title">惊喜百货</text>
		</view>
		<!-- 小程序 -->
		<view class="wx" v-else>
		  <!-- 解决元素占用手机上方的空间的 -->
		  <view class="status_bar"><!-- 这里是状态栏 --></view>
		  <view class="nav">
		    <u-avatar :src="src"></u-avatar>
		    <text class="title">惊喜百货</text>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				src: "http://gankai.gitee.io/vue-jd-h5/img/demo6.22f1bed1.png",
				H5:true
			}
		},
		mounted(){
			//#ifdef H5
			this.H5 = true;
			//#endif
			//#ifndef H5
			this.H5 = false;
			//#endif
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		background: #ededed;
		
		.nav_h5{
			display: flex;
			padding:2% 0 0 20rpx;
			align-items: center;
			.title_h5{
				margin:0 0 0 20rpx;
			}
		}
		.wx{
			.status_bar{
				height: var(--status-bar-height);
				width: 100%;
			}
			.nav{
			
				// height: var(--status);
				padding:12% 0 0 20rpx;
				display: flex;
				align-items: center;
				.title{
					margin:0 0 0 20rpx;
					font-weight: bold;
				}
			}
		}
	}
</style>