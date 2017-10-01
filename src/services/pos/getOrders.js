import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('pos/setOrders', result.data);
};

const failed = (result) => {
  store.dispatch('commonError', result);
};

export default (params = {}) => {
  Vue.$http.get('orders', { params })
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failed(error);
    });
};
