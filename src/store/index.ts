import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import { auth } from "./modules/auth.module";
import { alert } from "./modules/alert.module";
import { codes } from "./modules/codes.module";
import { preferences } from "./modules/preferences.module";
import { initialState } from "./modules/auth.module";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    version: "0.0.1",
    auth: initialState, // Needed for TS not to yell at everyone,
    preferences: { dark: false }
  },
  mutations: {},
  actions: {},
  modules: {
    auth,
    alert,
    codes,
    preferences
  },
  plugins: [createPersistedState()]
});
