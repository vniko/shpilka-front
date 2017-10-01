/* ============
 * Schedule Module Mutations
 * ============
 *

 */

import {
  SET_CATEGORIES,
  SET_ORDERS,
} from './mutation-types';

export default {
  [SET_CATEGORIES](state, data) {
    state.categories = data;
  },
  [SET_ORDERS](state, data) {
    state.orders = data;
  },
};
