import * as types from './mutation-types';

export const setList = ({ commit }, data) => {
  commit(types.SET_LIST, data);
};
