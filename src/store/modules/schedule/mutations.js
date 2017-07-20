/* ============
 * Schedule Module Mutations
 * ============
 *

 */

import {
  SET_DATES,
  SET_DEPARTMENT,
  SET_MASTER,
  SET_TIMETABLE,
} from './../../mutation-types';

export default {
  [SET_DATES](state, data) {
    state.datesArray = data;
  },
  [SET_DEPARTMENT](state, data) {
    state.currentDepartment = data;
  },
  [SET_MASTER](state, data) {
    state.currentMaster = data;
  },
  [SET_TIMETABLE](state, data) {
    state.timeTable = data;
  },
};
