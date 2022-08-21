<template>
  <view class="card-container">
    <view class="card-item">
      <u-checkbox-group>
        <u-checkbox
          :customStyle="{ marginBottom: '8px' }"
          shape="circle"
          activeColor="#f00"
          :checked="good.checked"
          @change="onChange($event)"
        ></u-checkbox>
      </u-checkbox-group>
      <image :src="good.img"></image>
      <view class="card-body">
        <view class="title">
          {{ good.title | overflowStr(11) }}
        </view>
        <view class="price">
          <text>￥{{ good.price }}</text>
          <NumberBox :good="good"/>
        </view>
      </view>
      <u-icon name="more-dot-fill" size="16" class="more" @click="del(good.id)"></u-icon>
    </view>
  </view>
</template>

<script>
import NumberBox from "@/components/NumberBox/NumberBox.vue";
import {mapActions} from "vuex"
export default {
  props: ["good"],
  components: {
    NumberBox,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["delCart","getCart"]),
    onChange(check){
      this.$set(this.good,"checked",check)
      this.$emit("onGood",this.good)
    },
    // 删除商品
    del(id){
      // console.log(id);
      uni.showModal({
        title: '确定删除吗',
        content: '',
        showCancel: true,
        success: ({ confirm, cancel }) => {
          if(confirm){
            this.delCart(id)
          }
        }
      })
    },
   
  },
  
};
</script>

<style scoped lang="scss">
.card-container {
  padding: 0 20rpx;
  .more {
    position: absolute;
    right: 30rpx;
    top: 20rpx;
  }
  .card-item {
    padding: 20rpx 30rpx;
    border-radius: 20rpx;
    background: #fff;
    display: flex;
    height: 180rpx;
    margin: 30rpx 0;
    gap: 30rpx;
    align-items: center;
    position: relative;
    image {
      width: 150rpx;
      height: 150rpx;
      border-radius: 10rpx;
    }
    .card-body {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 150rpx;
      .title {
        white-space: nowrap;
        font-size: 28rpx;
      }
      .price {
        display: flex;
        justify-content: space-between;
        text {
          color: orangered;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
