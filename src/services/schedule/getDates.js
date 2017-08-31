import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('schedule/setDates', result.data.dates);
  store.dispatch('schedule/setDepartment', result.data.department);
};

const failed = (result) => {
  store.dispatch('commonError', result);
};

export default (departmentId, masterId, date) => {
  let url;
  if (masterId && parseInt(masterId, 10) > 0) {
    url = 'masters/dates/' + masterId;
  } else {
    url = 'departments/dates/' + departmentId;
  }
  if (date) {
    url += '/' + date;
  }
  Vue.$http.get(url)
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failed(error);
    });
};
