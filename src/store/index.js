/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import * as actions from './actions';

// Modules
import schedule from './modules/schedule';
import pos from './modules/pos';
import auth from './modules/auth';
import clients from './modules/clients';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  /**
   * Assign the actions to the store
   */
  actions,
  mutations: {
    SHOW_ALERT() {

    },
  },

  /**
   * Assign the getters to the store
   */
  // getters,

  /**
   * Assign the modules to the store
   */
  modules: {
    schedule,
    pos,
    auth,
    clients,
  },

  /**
   * If strict mode should be enabled
   */
  strict: false,

  /**
   * Plugins used in the store
   */
  plugins: debug ? [createLogger()] : [],
});
