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
import firebase from "firebase";

Vue.config.productionTip = false;
Vue.use(VuePageTransition);
Vue.use(Transitions);

const configOptions = {
  apiKey: "AIzaSyDtux_OyJp2slSDOHpGs8ihICfqDGhjsMA",
  authDomain: "impact-5a433.firebaseapp.com",
  projectId: "impact-5a433",
  storageBucket: "impact-5a433.appspot.com",
  messagingSenderId: "97319129934",
  appId: "1:97319129934:web:70e182507b2353bbe9441f",
  measurementId: "G-STT5YY1N8E"
};

firebase.initializeApp(configOptions);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
