/* ============
 * Ischedule default Page
 * ============
 *
 */

import ScheduleService from '@/services/schedule';
import moment from 'moment';
import VLayout from '@/layouts/default.vue';
import ClientChooser from '@/components/client-chooser/client-chooser.vue';

moment.locale('ru');

export default {
  name: 'Default-page',
  data () {
    return {
      hoverDateInfo: null,
      dummyDate: {
        leftCapacity: 0,
      },
      months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
      monthOffset: 0,
      dateFromRoute: true,
      chosenDate: null,
      chosenTime: null,
      timeInfo: null,
      dateInfo: null,
      availableTimes: [],
      userInfo: {
        name: null,
        dob: null,
        phone: null,
        kids: '0',
        kidsAfter7: '0',
        adults: '1',
        visitComment: null,
      },
    };
  },
  components: {
    VLayout,
    ClientChooser,
  },
  computed: {
    departmentInfo () {
      return this.$store.state.schedule.currentDepartment;
    },
    masterInfo () {
      return this.$store.state.schedule.currentMaster;
    },
    chosenFullDate () {
      const date = moment(this.chosenDate);
      return date.format('D MMMM, dddd');
    },
    availableDates () {
      // const dates = {};
      // for (let d in this.$store.state.schedule.datesArray) {
      //   dates[this.$store.state.schedule.datesArray[d].date] = this.$store.state.schedule.datesArray[d].times;
      // }
      // return dates;
      return this.$store.state.schedule.datesArray;
    },
    nowDate () {
      const now = new Date();
      if (this.monthOffset !== 0) {
        const month = now.getMonth() + this.monthOffset;
        now.setMonth(month);
      }
      return now;
    },
    thisYear () {
      return this.nowDate.getFullYear();
    },
    thisMonthName () {
      return this.months[this.nowDate.getMonth()];
    },
    firstDayThisMonthWeekDay () {
      this.nowDate.setDate(1);
      // console.log('AAAA = ', this.nowDate.getDay() - 1);
      if (this.nowDate.getDay() === 0) {
        return 6;
      }
      return this.nowDate.getDay() - 1;
    },
    lastDayThisMonth () {
      this.nowDate.setMonth(this.nowDate.getMonth() + 1);
      this.nowDate.setDate(0);
      return this.nowDate.getDate();
    },
    nextMonthAvailable () {
      return true;
    },
    thisMonthAvailable () {
      return true;
    },
    prevMonthAvailable () {
      return true;
    },
  },

  methods: {
    chooseDate (day) {
      this.chosenTime = null;
      this.timeInfo = null;
      const date = this.nowDate;
      date.setDate(day);
      const momentDate = moment(date);
      this.$router.push({
        name: 'schedule',
        params: {masterId: this.masterInfo.id, date: momentDate.format('YYYY-MM-DD')}
      });
    },
    chooseTime (timeInfo, time) {
      this.chosenTime = time;
      this.timeInfo = timeInfo;
    },
    formIsValid () {
      return this.isCorrect('name') && this.isCorrect('phone') && this.chosenTime;
    },
    getDateInfo (day) {
      if (!this.availableDates) {
        return this.dummyDate;
      }
      const date = this.nowDate;
      date.setDate(day);
      const momentDate = moment(date);
      const index = momentDate.format('YYYY-MM-DD');
      if (this.availableDates.hasOwnProperty(index)) {
        return this.availableDates[index];
      }
      return this.dummyDate;
    },
    goToDetails () {
      this.$router.push({
        name: 'details',
        params: {
          departmentId: this.departmentInfo.id,
          masterId: this.masterInfo.id,
          date: this.chosenDate,
          time: this.chosenTime,
        }
      });
    },
    gotoTimeTable () {
      this.$router.push({name: 'timetable', params: {date: this.chosenDate, departmentId: this.departmentInfo.id}});
    },
    hoverDay (day) {
      this.hoverDateInfo = this.getDateInfo(day);
    },
    initDate () {
      if (this.availableDates && this.chosenDate && this.availableDates.hasOwnProperty(this.chosenDate)) {
        this.availableTimes = this.availableDates[this.chosenDate].times;
        this.dateInfo = this.availableDates[this.chosenDate];
      }
    },
    initDateFromRoute () {
      if (this.$route.params.date && this.dateFromRoute) {

        console.log('init date from route');

        this.chosenDate = this.$route.params.date;
        const now = new Date();
        const nowMonth = now.getMonth();

        const dateMonth = moment(this.chosenDate).get('month');
        this.monthOffset =  dateMonth - nowMonth;

        this.initDate();
        this.dateFromRoute = false;
      }
      if (this.$route.params.time) {
        this.chosenTime = this.$route.params.time;
      }
    },
    isCorrect (index) {
      switch (index) {
        case 'name':
          if (!this.userInfo[index]) {
            return false;
          }
          if (this.userInfo[index] !== '') {
            return true;
          }
          break;
        case 'phone':
          if (this.userInfo && this.userInfo.hasOwnProperty('phoneRaw') && this.userInfo.phoneRaw.indexOf('_') === -1) {
            return true;
          }
          break;
        case 'email':
          if (this.userInfo.email === '' || this.userInfo.email === null) {
            return true;
          }
          const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(this.userInfo.email);

          break;

        case 'dob':
          if (this.userInfo.dob === '' || this.userInfo.dob === null) {
            return true;
          }
          const date = moment(this.userInfo.dob, 'DD.MM.YYYY');
          if (date.isValid()) {
            return true;
          }
          break;
      }
      return false;
    }
    ,
    isDateAvailable (day) {
      if (!this.availableDates) {
        return false;
      }
      const date = this.nowDate;
      date.setDate(day);
      const momentDate = moment(date);
      const index = momentDate.format('YYYY-MM-DD');
      if (this.availableDates.hasOwnProperty(index)) {
        return true;
      }
      return false;
    }
    ,
    isChosenDate (day) {
      const date = this.nowDate;
      date.setDate(day);
      const momentDate = moment(date);
      const index = momentDate.format('YYYY-MM-DD');
      // console.log(this.chosenDate);
      // console.log(index);
      return index === this.chosenDate;
    }
    ,
    moveNextMonth() {
      this.chosenDate = null;
      this.chosenTime = null;
      this.timeInfo = null;
      this.monthOffset += 1;
      const now = new Date();
      if (this.monthOffset !== 0) {
        const month = now.getMonth() + this.monthOffset;
        now.setMonth(month);
      }
      ScheduleService.getDates(this.departmentInfo.id, this.masterInfo.id, moment(now).format('YYYY-MM-DD'));
    }
    ,
    movePrevMonth() {
      this.chosenDate = null;
      this.chosenTime = null;
      this.timeInfo = null;
      this.monthOffset -= 1;
      const now = new Date();
      if (this.monthOffset !== 0) {
        const month = now.getMonth() + this.monthOffset;
        now.setMonth(month);
      }
      ScheduleService.getDates(this.departmentInfo.id, this.masterInfo.id, moment(now).format('YYYY-MM-DD'));
    },
    resetHoverDay () {
      this.hoverDateInfo = null;
    },
    submitForm () {
      this.$emit('input', this.value);
      if (this.formIsValid()) {
        ScheduleService.sendAppointment(
          {
            ...this.userInfo,
            phone: this.userInfo.phoneRaw,
            clientId: this.userInfo.id ? this.userInfo.id : null,
            departmentId: this.departmentInfo.id,
            masterId: this.masterInfo.id,
            chosenDate: this.chosenDate,
            chosenTime: this.chosenTime,
          })
          .then((response) => {
            //this.$router.push({ name: 'schedule', params: { masterId: this.masterInfo.id, date: this.chosenDate } });
            this.gotoTimeTable();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$store.dispatch('showAlert', 'Заполните данные клиента и выберите время');
      }
    }
    ,
  },

  watch: {
    availableDates(val) {
      if (val) {
        this.initDate();
      }
    },
    $route(to) {
      ScheduleService.getDates(to.params.departmentId, to.params.masterId, to.params.date);
      this.dateFromRoute = true;
    },
  },
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'schedule/SET_DATES') {
        this.initDateFromRoute();
      }
    });

    console.log('mounted');
    this.initDateFromRoute();
  },
};
