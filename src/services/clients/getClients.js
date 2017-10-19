import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('clients/setList', result);
};

const failed = (result) => {
  store.dispatch('commonError', result);
};

export default () => {
  Vue.$http.get('clients')
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failed(error);
    });
};
