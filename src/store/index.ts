import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./modules/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "0.0.1"
  },
  mutations: {},
  actions: {},
  modules: {
    auth
  }
});
