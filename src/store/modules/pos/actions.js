import * as types from './mutation-types';

export const setCategories = ({ commit }, data) => {
  commit(types.SET_CATEGORIES, data);
};

export const setOrders = ({ commit }, data) => {
  commit(types.SET_ORDERS, data);
};

