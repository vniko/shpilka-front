import Vue from 'vue';

export default (id, data) => {
  return Vue.$http.put('clients/' + id, data);
};
