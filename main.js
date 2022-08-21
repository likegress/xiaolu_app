import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from "@/store/store"
import uView from "uview-ui";
import MyNav from "@/components/MyNav/MyNav.vue"
Vue.prototype.$store = store;
Vue.use(uView);
Vue.component("MyNav",MyNav)
Vue.config.productionTip = false
Vue.filter("overflowStr",(str,num)=>{
    return str.length>num ? str.slice(0,num)+"...":str;
})
App.mpType = 'app'
const app = new Vue({
  ...App,
  store,
  beforeCreate() {
    Vue.prototype.$eventBus = this;
  },
});
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif