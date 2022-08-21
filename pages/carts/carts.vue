<template>
  <view class="carts">
    <MyNav />
      <view class="card-body">
        <Card v-for="(item) of goodCar" :good="item" :key="item.id" @onGood="good"></Card>
      </view>
	  <Total :goodCar="goodCar"  @getCheckAll="getCheckAll"/>
  </view>
</template>

<script>
import Card from "@/components/card/card.vue";
import request from "@/utils/base.js"
import Total from "@/components/total/total.vue"
export default {
  components: {
    Card,
	Total
  },
  data() {
    return {
      goodCar: this.$store.state.goodCar,

    };
  },

  onShow() {
    //获取数据
    this.getAll();
  },
  methods: {
    async getAll() {
      const { data } = await request("goodCar", "", "get");
      uni.setStorageSync("goodCar", data);
	    
      this.goodCar = this.$store.state.goodCar=data;
    },
    // 适配小程序的每个单选按钮
    good(good){
      this.goodCar.forEach((item,i) => {
        if(item.id == good.id){
          // console.log();
          this.$set(this.goodCar,i,good)
        }
      });
    },
    //适配小程序的全选按钮
    getCheckAll(check){
      console.log(check);
      this.goodCar.forEach(item=>{
        if(check){
          item.checked = true
        }else {
          item.checked = false
        }
      })
    }
  },
  
 
};
</script>

<style></style>
