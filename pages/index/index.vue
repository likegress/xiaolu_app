<template>
	<view class="content">
		<MyNav />
		<view class="tab"><u-tabs :list="list1" @click="click" class="w" :scrollable="false"></u-tabs></view>
		<!-- 适配H5 -->
		<!-- <view class="component_h5" v-if="H5">
      <component :is="arrs[current]"></component>
    </view> -->
		<view>
			<Home v-if="index === 0"></Home>
			<News v-else-if="index === 1"></News>
			<Count v-else-if="index === 2"></Count>
			<Price v-else></Price>
		</view>
	</view>
</template>

<script>
import Home from '@/components/Home/Home.vue';
import News from '@/components/News/News.vue';
import Price from '@/components/Price/Price.vue';
import Count from '@/components/Count/Count.vue';

export default {
	components: { Home, News, Count, Price },
	data() {
		return {
			list1: [
				{
					name: '首页'
				},
				{
					name: '新品'
				},
				{
					name: '销量'
				},
				{
					name: '价格'
				}
			],
			arrs: ['Home', 'News', 'Count', 'Price'],
			home: true,
			news: false,
			count: false,
			price: false,
			index: 0
		};
	},
	onLoad() {},
	methods: {
		click(item) {
			console.log(item);
			this.index = item.index;
			if (item.index == this.list1.length - 1) {
				this.$store.commit('PriceReverse');
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	background: #ededed;
	// height: 100vh;
	.nav_h5 {
		display: flex;
		padding: 2% 0 0 20rpx;
		align-items: center;
		.title_h5 {
			margin: 0 0 0 20rpx;
		}
	}
	.wx {
		.status_bar {
			height: var(--status-bar-height);
			width: 100%;
		}
		.nav {
			// height: var(--status);
			padding: 12% 0 0 20rpx;
			display: flex;
			align-items: center;
			.title {
				margin: 0 0 0 20rpx;
				font-weight: bold;
			}
		}
	}
}
.tab {
	.w {
		width: 100%;
	}
}
</style>
