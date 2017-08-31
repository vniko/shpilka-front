/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */
import ScheduleService from '@/services/schedule';
import PosService from '@/services/pos';
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
      ScheduleService.getDates(to.params.departmentId, to.params.masterId);
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
