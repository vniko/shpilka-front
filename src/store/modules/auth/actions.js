/* ============
 * Actions for the auth module
 * ============
 *
 * The actions that are available on the
 * auth module.
 */

import * as types from './mutation-types';

export const check = ({ commit }) => {
  commit(types.CHECK);
};

export const login = ({ commit }, payload) => {
  commit(types.LOGIN, payload);
};

export const logout = ({ commit }) => {
  commit(types.LOGOUT);
};

export const setUser = ({ commit }, user) => {
  commit(types.SET_USER, user);
};

export default {
  check,
  login,
  logout,
  setUser,
};
