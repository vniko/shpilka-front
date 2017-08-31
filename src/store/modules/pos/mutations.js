/* ============
 * Schedule Module Mutations
 * ============
 *

 */

import {
  SET_CATEGORIES,
} from './mutation-types';

export default {
  [SET_CATEGORIES](state, data) {
    state.categories = data;
  },
};
