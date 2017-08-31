import Vue from 'vue';
import store from './../../store';

const success = (result) => {
  store.dispatch('pos/setCategories', result.data);
};

const failed = (result) => {
  store.dispatch('commonError', result);
};

export default () => {
  Vue.$http.get('products')
    .then((response) => {
      success(response.data);
    })
    .catch((error) => {
      failed(error);
    });
};
