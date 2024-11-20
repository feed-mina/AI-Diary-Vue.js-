import { createApp } from "vue";
import App from "./App.vue";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
createApp(App).mount("#app");

Vue.use(Vuetify);

export default new Vue({
  vuetify: new Vuetify(),
  render: (h) => h(App),
}).$mount("#app");
