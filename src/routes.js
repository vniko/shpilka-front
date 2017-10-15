/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */
import ScheduleService from '@/services/schedule';
import PosService from '@/services/pos';
import AuthService from '@/services/auth';
import moment from 'moment';
/**
 * The routes
 *
 * @type {object} The routes
 */
export default [
  // default
  {
    path: '/schedule/:departmentId/:masterId?/:date?/:time?',
    name: 'schedule',
    component: require('./pages/schedule/schedule.vue'),
    beforeEnter: (to, from, next) => {
      const date = to.params.hasOwnProperty('date') ? to.params.date : null;
      ScheduleService.getDates(to.params.departmentId, to.params.masterId, date);
      next();
    },
    meta: {
      auth: true,
    },
  },
  // details
  {
    path: '/details/:departmentId/:masterId?/:date?/:time?',
    name: 'details',
    component: require('./pages/schedule/schedule.vue'),
    beforeEnter: (to, from, next) => {
      ScheduleService.getDates(to.params.departmentId, to.params.masterId);
      next();
    },
    meta: {
      auth: true,
    },
  },
  // Login
  {
    path: '/login',
    name: 'login',
    component: require('@/pages/login/login.vue'),

    // If the user needs to be a guest to view this page
    meta: {
      guest: true,
    },
  },
  // Logout
  {
    path: '/logout',
    name: 'logout',
    beforeEnter: (to, from, next) => {
      AuthService.logout();
      next();
    },
    meta: {
      auth: true,
    },
  },
  // POS
  {
    path: '/pos',
    name: 'pos',
    component: require('./pages/pos/pos.vue'),
    beforeEnter: (to, from, next) => {
      PosService.getCategories();
      next();
    },
    meta: {
      auth: true,
    },
  },
  // POS-history
  {
    path: '/pos-history',
    name: 'pos-history',
    component: require('./pages/pos-history/pos-history.vue'),
    beforeEnter: (to, from, next) => {
      PosService.getOrders({ filters: { date: moment().format('YYYY-MM-DD') } });
      next();
    },
    meta: {
      auth: true,
      is_admin: true,
    },
  },
  // time table
  {
    path: '/timetable/:departmentId/:date',
    name: 'timetable',
    component: require('./pages/timetable/timetable.vue'),
    beforeEnter: (to, from, next) => {
      ScheduleService.getTimeTable(to.params.departmentId, to.params.date);
      next();
    },
    meta: {
      auth: true,
    },
  },
  // Worklog
  {
    path: '/worklog',
    name: 'worklog',
    component: require('./pages/worklog/worklog.vue'),
    beforeEnter: (to, from, next) => {
      next();
    },
    meta: {
      auth: true,
      admin: true,
    },
  },
  // index
  {
    path: '/',
    name: 'home',
    component: require('./pages/index/index.vue'),
    meta: {
      auth: true,
    },
  },

  {
    path: '/*',
    redirect: '/',
    meta: {
      auth: true,
    },
  },
];
