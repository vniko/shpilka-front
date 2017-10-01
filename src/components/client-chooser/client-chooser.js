import Autocomplete from 'vue2-autocomplete-js';
import MaskedInput from 'vue-masked-input';
import moment from 'moment';

export default {
  name: 'Client-component',
  props: {
    value: Object,
    hasKids: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      authHeaders: { Authorization: `Bearer ${localStorage.getItem('id_token')}`},
      searchUrl: process.env.API_LOCATION + 'clients/search',
      clientType: null,
      wasInputData: {
      },
      clientInfo: {},
    };
  },
  components: {
    Autocomplete,
    MaskedInput,
  },
  methods: {
    formIsValid() {
      return this.isCorrect('name')
        && this.isCorrect('phone')
        && this.isCorrect('dob')
        && this.isCorrect('email');
    },
    hasError(index) {
      if (this.clientInfo.hasOwnProperty(index) && this.clientInfo[index] !== null) {
        switch (index) {
          case 'name':
            if (this.clientInfo[index] === '') {
              return true;
            }
            break;
          case 'phone':
            if (this.wasInput('phone') && this.clientInfo.phoneRaw.indexOf('_') >-1 ) {
              return true;
            }
            break;
          case 'email':
            if (this.wasInput('email')) {
              const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return !re.test(this.clientInfo.email);
            } else {
              return false;
            }
            break;

          case 'dob':
            if (this.wasInput('dob')) {
              console.log(this.clientInfo.dob);
              const date = moment(this.clientInfo.dob, 'DD.MM.YYYY');
              console.log(date);
              if (date.isValid()) {
                return false;
              } else {
                return true;
              }
            } else {
              return false;
            }
            break;

        }
      }
      return false;
    },
    initCustomer(customer) {
      this.clientInfo = { ...customer, kids: '0', visitComment: null };
      this.clientType = 'new';
      this.clientInfo.phoneRaw = this.clientInfo.phone;
      this.$emit('input', this.clientInfo);
    },
    isCorrect(index) {
      switch (index) {
        case 'name':
          if (!this.clientInfo[index]) {
            return false;
          }
          if (this.clientInfo[index] !== '') {
            return true;
          }
          break;
        case 'phone':
          if (this.wasInput('phone') && this.clientInfo.phoneRaw.indexOf('_')  === -1) {
            return true;
          }
          break;
        case 'email':
          if (this.wasInput('email')) {
            if (this.clientInfo.email === '' || this.clientInfo.email === null) {
              return true;
            }
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(this.clientInfo.email);
          } else {
            return true;
          }
          break;

        case 'dob':
          if (this.wasInput('dob')) {
            if (this.clientInfo.dob === '' || this.clientInfo.dob === null) {
              return true;
            }
            const date = moment(this.clientInfo.dob, 'DD.MM.YYYY');
            if (date.isValid()) {
              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
          break;
      }
      return false;
    },
    resetUser() {
      this.clientInfo = {
        name: null,
        dob: null,
        phone: null,
        phoneRaw: null,
        email: null,
        kids: '0',
        visitComment: null,
      };
      this.clientType = null;
      this.$emit('input', this.clientInfo);
    },
    watchInputData() {
      this.$emit('input', this.clientInfo);
    },
    wasInput(index) {
      return this.wasInputData.hasOwnProperty(index);
    },
  },
  watch: {
    value(val) {
      if (!val) {
        this.resetUser();
      }
    },
  },
  mounted() {
    this.clientInfo = this.value;
  }
};
