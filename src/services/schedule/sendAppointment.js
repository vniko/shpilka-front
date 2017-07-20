import Vue from 'vue';

export default (userInfo) => {
  return Vue.$http.post('appointments', userInfo);
};
