/* ============
 * Schedule Module Mutations
 * ============
 *

 */

import {
  SET_LIST,
} from './mutation-types';

export default {
  [SET_LIST](state, data) {
    state.list = data;
  },
};
