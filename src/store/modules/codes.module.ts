import { Module } from "vuex";
import { RootState, CodesState } from "./interfaces";
import { codeService } from "../../services/planning/codes.service";
import { Code } from "../../entities";

export const initialState = {
  fetching: false,
  codes: [] as Array<Code>
};

export const codes: Module<CodesState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    fetchCodes({ dispatch, commit }): void {
      commit("fetchCodes");
      codeService.getCodes().then(
        codes => {
          commit("fetchSuccess", codes);
        },
        (error: Error) => {
          commit("fetchFailure");
          dispatch("alert/error", error, { root: true });
        }
      );
    }
  },
  getters: {
    codes(state) {
      return state.codes;
    }
  },
  mutations: {
    fetchCodes(state): void {
      state.fetching = true;
    },
    fetchSuccess(state, codes): void {
      state.fetching = false;
      state.codes = codes;
    },
    fetchFailure(state): void {
      state.fetching = false;
    }
  }
};
