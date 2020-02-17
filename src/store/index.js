import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./modules/app.js";
import common from "./modules/common";
import infoDetail from "./modules/infoDetail";
export default new Vuex.Store({
  modules:{
    app,
    common,
    infoDetail
  }
});
