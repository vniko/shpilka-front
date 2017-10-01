import Vue from 'vue';

export default (order) => {
  return Vue.$http.delete('orders/' + order.id);
};
