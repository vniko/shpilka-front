/* ============
 * Ischedule default Page
 * ============
 *
 */

export default {
  name: 'Index-page',
  data() {
    return {
    };
  },
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
  },
};
