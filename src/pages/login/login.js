import AuthService from '@/services/auth';
import VLayout from '@/layouts/default.vue';

export default {
  name: 'Login-page',
  data() {
    return {
      user: {
        login: null,
        password: null,
      },
    };
  },
  components: {
    VLayout,
  },
  methods: {
    login(user) {
      AuthService.login(user);
    },
  },
};
