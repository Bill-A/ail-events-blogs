import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "animate.css";
import VueMoment from "vue-moment";
import moment from "moment-timezone";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faClock, faCalendar);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.use(VueMoment, {
  moment
});

// new Vue({
//   el: "#app",
//   router,
//   template: "<App/>",
//   components: { App }
// });

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
