<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log(uni.getSystemInfo({}));
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	page {
		background-color: #ededed;
	}
</style>
