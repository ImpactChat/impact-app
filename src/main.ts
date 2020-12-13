import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VuePageTransition from "vue-page-transition";
import Transitions from "vue2-transitions";
import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false;
Vue.use(VuePageTransition);
Vue.use(Transitions);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
