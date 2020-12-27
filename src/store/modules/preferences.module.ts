import Vuetify from "@/plugins/vuetify";
import { Module } from "vuex";
import { RootState, PreferencesState } from "./interfaces";

export const initialState = {
  dark: false
};

export const preferences: Module<PreferencesState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    toggleDarkMode({ commit }): void {
      commit("toggleMode");
      Vuetify.framework.theme.dark = !Vuetify.framework.theme.dark;
    }
  },
  getters: {
    dark(state) {
      return state.dark;
    }
  },
  mutations: {
    toggleMode(state): void {
      state.dark = !state.dark;
    }
  }
};
