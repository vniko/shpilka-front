import Vue from 'vue';

export default (orderLines) => {
  return Vue.$http.post('orders', orderLines);
};
