import * as types from './mutation-types';

export const setDates = ({ commit }, data) => {
  commit(types.SET_DATES, data);
};

export const setDepartment = ({ commit }, dep) => {
  commit(types.SET_DEPARTMENT, dep);
};

export const setMaster = ({ commit }, master) => {
  commit(types.SET_MASTER, master);
};

export const setTimeTable = ({ commit }, data) => {
  commit(types.SET_TIMETABLE, data);
};

