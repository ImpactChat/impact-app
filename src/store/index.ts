import Vue from "vue";
import Vuex from "vuex";
import { auth } from "./modules/auth.module";
import { alert } from "./modules/alert.module";
import { initialState } from "./modules/auth.module";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "0.0.1",
    auth: initialState // Needed for TS not to yell at everyone
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    alert
  }
});
