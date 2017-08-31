import Vue from 'vue';
import store from './../../store';

const success = (data) => {
  if (data.success) {
    console.log('data', data);
    store.dispatch('auth/login', data.data.token);
    store.dispatch('auth/setUser', data.data.user);
    Vue.router.push({
      name: 'home',
    });
  } else {
    store.dispatch('showAlert', data.message);
  }
};

// When the request fails
const failed = (error) => {
  console.log(error);
};

export default (user) => {
  Vue.$http.post('/auth/login', user)
      .then((response) => {
        success(response.data);
      })
      .catch((error) => {
        failed(error);
      });
};
