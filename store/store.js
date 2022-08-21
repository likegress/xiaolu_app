// 页面路径：store/index.js
import Vue from "vue";
import Vuex from "vuex";
import request from "@/utils/base.js";
Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
  state: {
    //存放状态
    tabIndexPrice: true, // 选项卡价格状态
    goodCar: [], //所有的购物车列表
  },
  mutations: {
    PriceReverse(state) {
      state.tabIndexPrice = !state.tabIndexPrice;
    },
    // 让步进器修改数值为响应式
    setNum({ goodCar },num) {

    },
  },
  getters: {
    len(state){
      return state.goodCar.length
    }
  },
  actions: {
    // 获取购物车
    getCart({ state }) {
      request("goodCar", "", "get").then((res) => {
        state.goodCar = res.data;
      });
    },
    // 修改购物车
    addCart(context, item) {
      request(
        `goodCar/${item.id}`,
        {
          ...item,
        },
        "put"
      );
    },
    // 删除购物车商品
    delCart(context, id) {
      request(`goodCar/${id}`, "", "delete").then((res) => {
        //删除本地的
        let index = context.state.goodCar.findIndex((i) => i.id == id);
        context.state.goodCar.splice(index, 1);
      });
    },
    //加入购物车
    addGood({ dispatch, state }, item) {
      // 看看购物车里面有没有商品

      // let good = state.goodCar.findIndex((good) => item.id == good.id);
      // if(good!=-1){//有
      //   //有就修改购物车的数量
      //   console.log(item.id);
      //   // request("goodCar/"+item.id, { ...item }, "put");
      // }else {//没有
      //   request("goodCar", { ...item }, "post");
      // }
      request("goodCar", { ...item }, "post");
    },
  },
});
export default store;
