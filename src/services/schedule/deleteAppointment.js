import Vue from 'vue';

export default (id) => {
  return Vue.$http.delete('appointments/' + id);
};
