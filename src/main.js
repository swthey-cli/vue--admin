import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import VueCompositionApi from "@vue/composition-api";
import "element-ui/lib/theme-chalk/index.css";
import "./icons";
import "./router/premit";
// import global from "@/utils/global";
Vue.use(ElementUI);
// Vue.use(global);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
