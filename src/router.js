import Vue from "vue";
import Router from "vue-router";
import AgileHome from "@/components/AgileHome";
import EventsManager from "@/components/EventsManager";
import BlogsManager from "@/components/BlogsManager";
import Auth from "@okta/okta-vue";

Vue.use(Auth, {
  issuer: "https://dev-349174.okta.com/oauth2/default",
  client_id: "0oaazh0903utVU1He356",
  redirect_uri: "http://localhost:3000/implicit/callback",
  scope: "openid profile email"
});

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "AgileHome",
      component: AgileHome
    },
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/events-manager",
      name: "EventsManager",
      component: EventsManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/blogs-manager",
      name: "BlogsManager",
      component: BlogsManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
