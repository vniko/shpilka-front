import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('schedule/setTimeTable', result.data.timeTable);
  store.dispatch('schedule/setDepartment', result.data.department);
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
