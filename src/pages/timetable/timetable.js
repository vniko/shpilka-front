/* ============
 * Ischedule default Page
 * ============
 *
 */

import ScheduleService from '@/services/schedule';
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import ClickConfirm from 'click-confirm';
import VLayout from '@/layouts/default.vue';


moment.updateLocale('ru', {
  months: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
});
moment.locale('ru');

export default {
  name: 'Timetable-page',
  data() {
    return {
      chosenDate: null,
      currentApptId: null,
      currentApptTime: null,
      newApptTime: '',
      pickerDate: null,
      showDatePicker: false,
    };
  },
  components: {
    ClickConfirm,
    Datepicker,
    VLayout,
  },
  computed: {
    departmentInfo() {
      return this.$store.state.schedule.currentDepartment;
    },
    timeTable() {
      return this.$store.state.schedule.timeTable;
    },
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
    deleteAppointment(id) {
      ScheduleService.deleteAppointment(id).then(() => {
        ScheduleService.getTimeTable(this.departmentInfo.id, this.chosenDate);
      })
        .catch((error) => {
          console.error(error);
        });
    },
    hideDatePicker() {
      if (this.showDatePicker) {
        this.showDatePicker = false;
      }
    },
    initDateFromRoute() {
      if (this.$route.params.date) {
        this.chosenDate = this.$route.params.date;
      }
    },
    moveAppointment() {
      ScheduleService.saveAppointment(this.currentApptId, { visit_time: this.newApptTime });
      this.currentApptId = null;
      this.currentApptTime = null;
      this.newApptTime = '';
    },
    selectDate(val) {
      ScheduleService.getTimeTable(this.departmentInfo.id, moment(val).format('YYYY-MM-DD'));
    },
    showTransferModal(id, time) {
      this.currentApptId = id;
      this.currentApptTime = time;
      this.$root.$emit('show::modal', 'transferModal');
    },
  },
  watch: {
    $route(to) {
      this.initDateFromRoute();
      ScheduleService.getTimeTable(to.params.departmentId, to.params.date);
    },
  },
  mounted() {
    this.initDateFromRoute();
  },
};
