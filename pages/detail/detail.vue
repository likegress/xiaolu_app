<template>
  <view class="detail_container">
    <Banner :list6="list6" :current="currentNum" />
    <view class="menu">
      <view class="total">
        <text class="price">￥{{ detailList.price }}</text>
        <text class="num">{{ detailList.num }}人看过</text>
      </view>
      <view class="title">
        <text class="subtitle">{{ detailList.title }}</text>
        <text class="share">分享</text>
      </view>
      <view class="dl">
        <view class="dt">发货</view>
        <view class="dd">
          <view class="tip">快递包邮发货</view>
          <view>付款后48小时发货</view>
        </view>
      </view>
    </view>
    <view class="article">
      <view class="article_title">
        <text>本店推荐</text>
        <text>全部商品</text>
      </view>
      <view class="imgs">
        <Good
          v-for="(item, index) in threeArr"
          :good="item"
          class="c-good"
          height="height"
          :key="item.id"
        >
          <view class="imgsPrice">
            <view class="price">￥{{ item.price }}</view>
          </view>
        </Good>
      </view>
    </view>
    <view class="summary">
      <view class="h3">商品参数</view>
      <view class="summary_main">{{ detailList.detail.summary }}</view>
    </view>
    <view class="total-container">
      <view class="left">
        <view @click="toIndex">
          <image src="/static/首页 (6).png"></image>
          <text>店铺</text>
        </view>
        <view>
          <image src="/static/IM聊天.png"></image>
          <text>客服</text>
        </view>
        <view id="good" @click="toGoodCar">
          <image src="/static/购物袋 (1).png"></image>
          <text>购物袋</text>
          <text id="goodNum" v-if="$store.getters.len != 0">{{
            $store.getters.len
          }}</text>
        </view>
      </view>
      <view class="right">
        <view class="addGood" @click.prevent="show = true">加入购物车</view>
        <view class="round"
          ><image src="/static/shop.png" @click.prevent="toGoodCar"></image
        ></view>
      </view>
    </view>
    <!-- 弹出层 -->
    <u-popup :show="show" :round="10" mode="bottom">
      <view class="popup">
        <u-icon size="22" name="close" @click="close"></u-icon>
        <view class="popup-body">
          <image :src="detailList.img"></image>
          <view class="popup-right">
            <view class="popup-price">￥{{ detailList.price }}</view>
            <view class="popup-num"
              >库存 <text> {{ detailList.num }}</text></view
            >
            <view class="popup-mip"
              >已选择 <text> {{ getTitle }}</text></view
            >
          </view>
        </view>
        <view class="goodNum">
          <text>数量</text>
          <detailNumbox :good="detailList" @getNum="getNum" />
          <!-- 加减 -->
        </view>
        <u-button
          type="primary"
          text="确定"
          @click="addCart(detailList)"
        ></u-button>
      </view>
    </u-popup>
  </view>
</template>

<script>
const dataList = uni.getStorageSync("dataList");
let index = "0";
// 获取购物车的总数量
let num = uni.getStorageSync("num")
import Banner from "@/components/banner/banner.vue";
import Good from "@/components/Good/Good.vue";
import detailNumbox from "@/components/detailNumbox/detailNumbox.vue";
import { mapActions } from "vuex";
export default {
  components: {
    Banner,
    Good,
    detailNumbox,
 
  },
  data() {
    return {
      dataList,
      currentNum: 0,
      list6: dataList[index].detail.imageArr, //轮播图的数据
      detailList: dataList[index], //详情页的数据
      threeArr: [], // 随机三个数据
      goodNum: 0, //购物车总数量
      show: false,
	   num:num
    };
  },
  onLoad(options) {
    let { id } = options;
    index = dataList.findIndex((item) => item.id == id);
    // 获取三张随机数据
    this._randomImg();
    console.log(num);
  },
  computed: {
    getTitle() {
      return this.detailList.title.slice(0, 9);
    },
  },
  methods: {
    ...mapActions(["addGood", "getCart"]),
    // 获取三张随机数据
    _randomImg() {
      const imgArr = [];
      const dataArr = [];
      let len = this.dataList.length;
      for (let i = 0; i < 3; ) {
        let num = Math.floor(Math.random() * len);
        if (!imgArr.includes(num)) {
          imgArr.push(num);
          dataArr.push(this.dataList[num]);
          i++;
        }
      }
      this.threeArr = dataArr;
    },
    // 去首页
    toIndex() {
      uni.switchTab({
        url: "/pages/index/index",
      });
    },
    // 去购物车
    toGoodCar() {
      this.getCart();
      uni.switchTab({
        url: "/pages/carts/carts",
      });
    },
    close() {
      this.show = false;
    },
    addCart(item) {
      this.addGood(item);
      this.show = false;
      console.log(this.$store.state.goodCar.length);
      uni.setStorageSync("num",this.$store.state.goodCar.length)

      uni.showToast({
        title: "添加成功",
      });
    },
    // 让重新复制
    getNum(good) {
      this.detailList = good;
    },
  },
  
};
</script>

<style lang="scss" scoped>
.nums {
  text-align: center;
  font-size: 28rpx;
  color: #fff;
  position: absolute;
  width: 80rpx;
  height: 40rpx;
  line-height: 40rpx;
  right: 10rpx;
  bottom: 10rpx;
  z-index: 999;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10rpx;
}
.menu {
  box-sizing: border-box;
  padding: 0 30rpx;
  background: #fff;
}
.total,
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80rpx;
}
.total .price {
  color: red;
  font-size: 36rpx;
}
.total .num {
  font-size: 28rpx;
  color: #999;
}
.title .subtitle {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: bold;
}
.title {
  margin-bottom: 20rpx;
}
.title .share {
  width: 100rpx;
  text-align: center;
}
.dl {
  display: flex;
  gap: 30rpx;
  font-size: 28rpx;
  color: #999;
  border-top: 1rpx solid #ccc;
  padding: 30rpx 0;
}
.dd .tip {
  font-size: 32rpx;
  color: #000;
  margin-bottom: 10rpx;
}
/* 商品详情 */
.article {
  background: #fff;
  box-sizing: border-box;
  padding: 0 30rpx;
  margin-top: 20rpx;
}
.article_title {
  display: flex;
  justify-content: space-between;
  height: 100rpx;
  line-height: 100rpx;
}
.article_title text:nth-child(1) {
  font-weight: bold;
}
.imgs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20rpx;
}
.c-good image {
  height: 250rpx !important;
}
.c-good .msg {
  display: none;
}
.imgsPrice {
  color: red;
}
/* 商品参数 */
.summary {
  background: #fff;
  margin-top: 20rpx;
  padding: 0 30rpx 250rpx;
  box-sizing: border-box;
}
.summary .h3 {
  font-weight: bold;
  height: 80rpx;
  line-height: 80rpx;
}
/* 下面的添加购物 */
.total-container {
  width: 100%;
  height: 120rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  background: #fff;
  z-index: 999;
}
.left {
  display: flex;
  justify-content: space-around;
  flex: 1;
  font-size: 28rpx;
}
.left > view {
  display: flex;
  flex-direction: column;
}

.left image {
  width: 40rpx;
  height: 40rpx;
  display: block;
  margin: 0 auto;
}
.right {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;
}
.right .addGood {
  background: #f7f7f7;
  color: red;
  width: 220rpx;
  height: 70rpx;
  text-align: center;
  line-height: 70rpx;
}
.right image {
  width: 100rpx;
  height: 100rpx;
}
.right .round {
  background: #f5f5f5;
  position: absolute;
  right: 30rpx;
  top: -60rpx;
  width: 150rpx;
  height: 150rpx;
  border-radius: 50%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 添加购物车 */
#good {
  position: relative;
}
#goodNum {
  position: absolute;
  right: -5rpx;
  top: -14rpx;
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 40rpx;
  background: red;
  color: #fff !important;
}
.popup {
  height: 900rpx;
  padding: 20rpx;
  .popup-body {
    display: flex;
    padding: 20rpx;
    gap: 20rpx;
    image {
      width: 200rpx;
      height: 200rpx;
    }
    .popup-right {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      color: #999;
      .popup-price {
        font-weight: 600;
        color: orange;
      }
      .popup-num,
      .popup-mip {
        font-size: 28rpx;
      }
      text {
        margin-left: 10rpx;
        color: #000;
      }
    }
  }
  .goodNum {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 120rpx;
  }
}
</style>
