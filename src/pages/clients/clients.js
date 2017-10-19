import Vue from 'vue';
import VLayout from '@/layouts/default.vue';
import Simplert from 'vue2-simplert'
import ClientsService from '@/services/clients';
import { mapState } from 'vuex';
import moment from 'moment';

export default {
  name: 'Clients-page',
  data() {
    return {
    };
  },
  components: {
    VLayout,
  },
  computed: {
    ...mapState({
      clients: state => state.clients.list,
    }),
  },
  methods: {
    deleteClient(client) {
      ClientsService.deleteClient(client.id).then((res) => {
        console.log(res);
        if (res.data.success) {
          client.is_deleted = true;
        } else {
          alert('Ошибка удаления');
        }
      }).catch(() => {
        alert('Ошибка удаления');
      });
    },
    editClient(client) {

    },
  },
};
