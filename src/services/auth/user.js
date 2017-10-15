import Vue from 'vue';
import store from './../../store';

const success = (data) => {
  if (data.success) {
    console.log('data', data);
    store.dispatch('auth/setUser', data.data);
  }
};

// When the request fails
const failed = (error) => {
  console.log(error);
};

export default () => {
  Vue.$http.get('/auth/getUser')
      .then((response) => {
        success(response.data);
      })
      .catch((error) => {
        failed(error);
      });
};
