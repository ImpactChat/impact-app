import { Module } from "vuex";
import { RootState, AuthState } from "./interfaces";
import { userService } from "../../services";
import router from "../../router";

export const initialState = {
  loggingIn: false,
  loggedIn: true,
  user: undefined
};

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: initialState,
  actions: {
    fetchUser({ commit }, user) {
      commit("setLoggedIn", user !== null);
      if (user) {
        commit("setUser", {
          displayName: user.displayName,
          email: user.email,
          rawUser: user
        });
      } else {
        commit("setUser", null);
      }
    },
    login({ dispatch, commit }, { username, password }): void {
      commit("loginRequest", { username });
      userService.login(username, password).then(
        user => {
          commit("loginSuccess", user);
          router.push("/");
        },
        (error: Error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    loginMS({ dispatch, commit }): void {
      userService.loginMS().then(
        user => {
          commit("loginSuccess", user);
          router.push("/");
        },
        (error: Error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    loginApple({ dispatch, commit }): void {
      userService.loginApple().then(
        user => {
          commit("loginSuccess", user);
          router.push("/");
        },
        (error: Error) => {
          commit("loginFailure", error);
          dispatch("alert/error", error, { root: true });
        }
      );
    },
    logout({ commit }): void {
      userService.logout();
      commit("logout");
    }
  },
  getters: {
    user(state) {
      return state.user;
    }
  },
  mutations: {
    loginRequest(state, user): void {
      state.loggingIn = true;
      state.user = user;
    },
    loginSuccess(state, user): void {
      state.loggedIn = true;
      state.user = user;
    },
    loginFailure(state): void {
      state.loggingIn = false;
      state.loggedIn = false;
      state.user = undefined;
    },
    logout(state): void {
      state.loggingIn = false;
      state.loggedIn = false;
      state.user = undefined;
    },
    setLoggedIn(state, value) {
      state.user = value;
    },
    setUser(state, data) {
      state.user = data;
    }
  }
};
