import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('setTimeTable', result.data.timeTable);
  store.dispatch('setDepartment', result.data.department);
};

const failed = (result) => {
  store.dispatch('commonError', result);
};

export default (departmentId, date) => {
  Vue.$http.get('appointments', { params: { departmentId, date } })
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failed(error);
    });
};
