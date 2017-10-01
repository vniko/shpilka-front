import Vue from 'vue';
import VLayout from '@/layouts/default.vue';
import Simplert from 'vue2-simplert'
import PosService from '@/services/pos';
import { mapState } from 'vuex';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';

export default {
  name: 'Sell-history-page',
  data() {
    return {
      chosenDate: new Date(),
    };
  },
  components: {
    VLayout,
    Datepicker,
  },
  computed: {
    ...mapState({
      orders: state => state.pos.orders,
    }),
  },
  methods: {
    deleteOrder(order) {
      PosService.deleteOrder(order).then((res) => {
        console.log(res);
        if (res.data.success) {
          order.is_deleted = true;
        } else {
          alert('Ошибка удаления');
        }
      }).catch(() => {
        alert('Ошибка удаления');
      });
    },
    selectDate(date) {
      PosService.getOrders({ filters: { date: moment(date).format('YYYY-MM-DD') } });
    },
  }
};
