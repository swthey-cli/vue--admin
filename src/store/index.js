import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./modules/app.js";
import common from "./modules/common";
export default new Vuex.Store({
  modules:{
    app,
    common
  }
});
