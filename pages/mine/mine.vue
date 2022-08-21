<template>
  <view>
    <MyNav />

    <view class="user-container">
      <view class="author">
        <image :src="avatarUrl"></image>
        <text class="username">{{ nickName }}</text>
      </view>
      <view class="nav wrapper">
        <view
          v-for="(item, index) of nav"
          :key="index"
          class="nav-item"
          @click="toMoney(index)"
        >
          <image :src="item.imageSrc"></image>
          <text class="name">{{ item.name }}</text>
        </view>
      </view>
      <view class="main wrapper">
        <view class="top-cell">
          <u-cell-group>
            <u-cell
              title="我的优惠券"
              :isLink="true"
              arrow-direction="right"
            ></u-cell>
            <u-cell
              title="我的地址"
              :isLink="true"
              arrow-direction="right"
            ></u-cell>
          </u-cell-group>
        </view>

        <view class="bottom-cell">
          <u-cell-group>
            <u-cell
              title="联系商家"
              :isLink="true"
              arrow-direction="right"
            ></u-cell>
            <u-cell
              :title="loginFlag ? '登录' : '退出登录'"
              :isLink="true"
              arrow-direction="right"
              @click="_login"
            ></u-cell>
          </u-cell-group>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: "",
      imageSrc: "",
      nickName: "",
      loginFlag: true,
      nav: [
        {
          imageSrc: "/static/全部订单.png",
          name: "全部订单",
        },
        {
          imageSrc: "/static/待付款.png",
          name: "待付款",
        },
        {
          imageSrc: "/static/待收货.png",
          name: "待收货",
        },
        {
          imageSrc: "/static/3.1待评价.png",
          name: "待评价",
        },
        {
          imageSrc: "/static/退款.png",
          name: "退款/售后",
        },
      ],
    };
  },
  onLoad(options) {
    //#ifdef MP-WEIXIN
    // this._login();
    //#endif
  },
  methods: {
  
    _login() {
      if (!this.loginFlag) {
        this.nickName = "";
        this.avatarUrl = "";
        this.loginFlag = true
        return
      }
      uni.getUserProfile({
        desc: "登录xxx",
        success: (res) => {
          console.log(res);
          this.nickName = res.userInfo.nickName;
          this.avatarUrl = res.userInfo.avatarUrl;
          this.loginFlag = !this.loginFlag;
        },
        fail: (err) => {
          console.log(err);
        },
      });
      
    },

  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin: 0 auto;
}
.author {
  width: 700rpx;
  height: 160rpx;
  border-radius: 20rpx;
  box-sizing: border-box;
  padding: 30rpx;
  background: #fff;
  margin: 30rpx auto;
  display: flex;
  gap: 50rpx;
  align-items: center;
}
.author image {
  width: 90rpx;
  height: 90rpx;
  border-radius: 20rpx;
}
.nav {
  width: 730rpx;
  height: 170rpx;
  display: flex;
  align-items: center;
  background: #fff;
  color: #999;
  font-size: 28rpx;
  border-radius: 20rpx;
}
.nav-item {
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.nav-item image {
  width: 60rpx;
  height: 60rpx;
  display: block;
  margin: 10rpx auto;
}
.main {
  background: #ededed;
  margin: 0 10rpx;
}
.top-cell,
.bottom-cell {
  border-radius: 20rpx;
  background: #fff;
}
.top-cell {
  margin-top: 30rpx;
}
.bottom-cell {
  margin-top: 30rpx;
}
</style>
