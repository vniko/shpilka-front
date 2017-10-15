/* ============
 * Ischedule default Page
 * ============
 *
 */

import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import VLayout from '@/layouts/default.vue';
import Vue from 'vue';
import ClickConfirm from 'click-confirm';


moment.updateLocale('ru', {
  months: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
});
moment.locale('ru');

export default {
  name: 'Worklog-page',
  data() {
    return {
      list: {
        data: [],
        meta: null,
      },
      form: {
        hrs: 10,
        work_date: new Date(),
        user_id: null,
      },
      filters: {
        start_date: moment().subtract(1, 'months').toDate(),
        end_date: new Date(),
        user_id: null,
      },
    };
  },
  components: {
    Datepicker,
    VLayout,
    ClickConfirm,
  },
  computed: {
    chosenFullDate() {
      const date = moment(this.chosenDate);
      return date.format('D MMMM, dddd');
    },
    nowDate() {
      if (this.chosenDate) {
        return moment(this.chosenDate);
      }
      return new Date();
    },
    thisYear() {
      return this.nowDate.getFullYear();
    },
    thisMonthName() {
      return this.months[this.nowDate.getMonth()];
    },
  },
  methods: {
    async submit() {
      console.log(this.form);
      if (!this.form.user_id) {
        this.$store.dispatch('showAlert', 'Не выбран сотрудник');
        return;
      }
      const form = { ...this.form, work_date: moment(this.form.work_date).format('YYYY-MM-DD') };
      const resp = await Vue.$http.post('/worklogs', form);
      await this.refresh();
    },
    async deleteRow(rowIndex) {
      const row = this.list.data[rowIndex];
      const resp = await Vue.$http.delete('/worklogs/' + row.id);
      if (resp.data.success) {
        this.$delete(this.list.data, rowIndex);
        await this.refresh();
      }
    },
    async refresh() {
      const filters = {
        start_date: moment(this.filters.start_date).format('YYYY-MM-DD'),
        end_date: moment(this.filters.end_date).format('YYYY-MM-DD'),
        user_id: this.filters.user_id,
      };
      const resp = await Vue.$http.get('/worklogs', { params: filters });
      this.list = resp.data;
    },
  },
  watch: {
  },
  async mounted() {
    await this.refresh();
  },

};
