/* ============
 * Bootstrap File
 * ============
 *
 * Will configure and bootstrap the application
 */


/* ============
 * Vue
 * ============
 *
 * Vue.js is a library for building interactive web interfaces.
 * It provides data-reactive components with a simple and flexible API.
 *
 * http://rc.vuejs.org/guide/
 */
import Vue from 'vue';

Vue.config.debug = process.env.NODE_ENV !== 'production';


/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */
import Axios from 'axios';
import AuthService from '@/services/auth';

Axios.defaults.baseURL = process.env.API_LOCATION;
Axios.defaults.headers.common.Accept = 'application/json';
Axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      AuthService.logout();
    }
  });
Vue.$http = Axios;


/* ============
 * Vuex Router Sync
 * ============
 *
 * Effortlessly keep vue-Router and vuex store in sync.
 *
 * https://github.com/vuejs/vuex-router-sync/blob/master/README.md
 */
import VuexRouterSync from 'vuex-router-sync';
import store from './store';

store.dispatch('auth/check');

if (!store.state.auth.user) {
  AuthService.getUser();
}

/* ============
 * Vue touch
 * ============
 *
 * Touch events plugin for Vue.js
 * https://github.com/vuejs/vue-touch/tree/next
 */
// import VueTouch from 'vue-touch';
//
// Vue.use(VueTouch, { name: 'v-touch' });
//

import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
import 'bootstrap-vue/dist/bootstrap-vue.css';

/* ============
 * Vue Router
 * ============
 *
 * The official Router for Vue.js. It deeply integrates with Vue.js core
 * to make building Single Page Applications with Vue.js a breeze.
 *
 * http://router.vuejs.org/en/index.html
 */
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

export const router = new VueRouter({
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth) && !store.state.auth.authenticated) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login',
    });
  } else if (to.matched.some(m => m.meta.admin) &&
    ((store.state.auth.user && !store.state.auth.user.is_admin)
      || !store.state.auth.user)) {
    /*
     * If the user is not authenticated and visits
     * a page that requires authentication, redirect to the login page
     */
    next({
      name: 'login',
    });
  } else if (to.matched.some(m => m.meta.guest) && store.state.auth.authenticated) {
    /*
     * If the user is authenticated and visits
     * an guest page, redirect to the dashboard page
     */
    next({
      name: 'home',
    });
  } else {
    next();
  }
});
VuexRouterSync.sync(store, router);

Vue.router = router;

export default {
  router,
};
