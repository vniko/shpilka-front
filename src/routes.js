/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file
 */
import ScheduleService from '@/services/schedule';
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
    component: require('./pages/index/index.vue'),
    beforeEnter: (to, from, next) => {
      ScheduleService.getDates(to.params.departmentId, to.params.masterId);
      next();
    },
  },
  // details
  {
    path: '/details/:departmentId/:masterId?/:date?/:time?',
    name: 'details',
    component: require('./pages/index/index.vue'),
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
  },
  {
    path: '/',
    redirect: '/schedule/1',
  },
  {
    path: '/*',
    redirect: '/schedule/1',
  },
];
