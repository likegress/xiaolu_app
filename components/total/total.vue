<template>
  <view class="total-container">
    <view class="left">
      <u-checkbox-group>
        <u-checkbox
          :checked="checkAll"
          shape="circle"
          activeColor="#f00"
          @change="onChange($event)"
        ></u-checkbox>
      </u-checkbox-group>
    </view>
    <view class="right">
      <view id="total">
        <view>
          <text>合计</text>
          <text id="price">￥{{ totalPrice }}</text>
        </view>
        <view id="totalNum">共 {{ totalNum }} 件</view>
      </view>
      <view class="round"><image src="/static/shop.png"></image></view>
    </view>
  </view>
</template>

<script>
export default {
  name: "total",
  props:["goodCar"],
  data() {
    return {
      totalPrice: 0,
      totalNum: 0,

    };
  },
  created() {
    console.log(this.goodCar);
  },
  methods: {
    onChange(checked) {//全选监听
      this.goodCar.forEach(item => {
          item.checked = checked
        });
      this.total()
      //适配小程序的全选把全选的布尔值传到父元素
      this.$emit("getCheckAll",checked)
    },
    //计算总价和总数量
    total(){
      let totalNum = 0, totalPrice = 0;
      this.goodCar.filter(item=>item.checked).forEach(good=>{
        // console.log(good);
        totalNum+= good.goodNum
        totalPrice+=good.goodNum*good.price
      })
      this.totalNum = this.$store.state.totalNum= totalNum
      this.totalPrice = totalPrice
    }
    
  },
  computed: {
    checkAll(){//全选监听
      this.total()
      return this.goodCar.every(i=>i.checked)
    },
    
  },
  
};
</script>

<style scoped lang="scss">
.total-container {
  width: 100%;
  height: 100rpx;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  z-index: 999;
  box-sizing: border-box;
  padding-left: 30rpx;
}

.right {
  display: flex;
  align-items: center;
  position: relative;
  width: 350rpx;
  color: #999;
  font-size: 28rpx;
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
  color: #fff;
}
#price {
  color: red;
}
</style>
