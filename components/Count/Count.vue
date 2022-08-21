<template>
  <view class="product">
    <Good
      v-for="item in dataList"
      :good="item"
      :key="item.id"
      @click="toDetail(item.id)"
    >
      <view class="total">
        <view class="price">￥{{ item.price }}</view>
        <view class="msg">{{ item.num }}人看过</view>
      </view>
    </Good>
  </view>
</template>

<script>
import Good from "@/components/Good/Good.vue";
//请求ajax
import request from "@/utils/base.js";
export default {
  name: "Count",
  components: {
    Good,
  },
  data() {
    return {
		dataList:[]
	};
  },
  created() {
    //获取数据
    this.getAll();
  },
  methods: {
    async getAll() {
      const { data } = await request("data", "", "get");
	  data.sort((a,b)=>{
		return b.num - a.num
	  })
	  this.dataList = data
	//   console.log(this.dataList);
    },
  },
};
</script>

<style lang="scss" scoped>
	.product {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10rpx;
  padding: 0 10rpx;
}
.product .total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20rpx;
}
.product .price {
  color: red;
  font-size: 34rpx;
}
.product .msg {
  color: #999;
  font-size: 26rpx;
}
</style>
