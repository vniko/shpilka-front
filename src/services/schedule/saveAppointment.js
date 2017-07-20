import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('setTimeTable', result.data.timeTable);
  store.dispatch('setDepartment', result.data.department);
};

const failed = (result) => {
  store.dispatch('commonError', result);
};

export default (id, data) => {
  Vue.$http.put('appointments/' + id, data)
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failed(error);
    });
};
