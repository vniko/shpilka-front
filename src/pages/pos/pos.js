/* ============
 * Sell Page
 * ============
 *
 */
import Vue from 'vue';
import VLayout from '@/layouts/default.vue';
import Simplert from 'vue2-simplert'
import PosService from '@/services/pos';
import ClientChooser from '@/components/client-chooser/client-chooser.vue';

export default {
  name: 'Sell-page',
  data () {
    return {
      orderLines: {},
      clientInfo: {},
    };
  },
  components: {
    VLayout,
    Simplert,
    ClientChooser,
  },
  computed: {
    categories() {
      return this.$store.state.pos.categories;
    },
    countOrderLines () {
      return Object.keys(this.orderLines).length;
    },
    total() {
      let total = 0;
      const keys = Object.keys(this.orderLines);
      for (let i = 0; i < keys.length; i++) {
        total += this.orderLines[keys[i]].total;
      }
      return total;
    },
    totalDiscount () {
      let total = 0;
      const keys = Object.keys(this.orderLines);
      for (let i = 0; i < keys.length; i++) {
        total += this.orderLines[keys[i]].qty * this.orderLines[keys[i]].price;
      }
      return total - this.total;
    },
  },
  methods: {
    addToCart(product) {
      if (this.orderLines.hasOwnProperty(product.id)) {
        return this.incrementLineQty(this.orderLines[product.id]);
      }
      const line = {
        product,
        qty: 1,
        price: product.price,
        discount_perc: 0,
        total: product.price,
      };
      Vue.set(this.orderLines, product.id, line);
      return true;
    },
    confirmDeleteLine(productId) {
      const conf = {
        title: 'Удалить?',
        message: 'Удалить товар из списка покупок',
        type: 'warning',
        customCloseBtnText: 'Ой, нет (',
        customCloseBtnClass: 'btn btn-default',
        useConfirmBtn: true,
        customConfirmBtnText: 'Да',
        customConfirmBtnClass: 'btn btn-danger',
        onConfirm: () => {
          this.deleteLine(productId)
        },
      };
      this.$refs.deleteProduct.openSimplert(conf);
    },
    decrementLineDiscount(line) {
      if (line.discount_perc > 0) {
        line.discount_perc -= 1;
        this.recalcLine(line);
      }
    },
    decrementLineQty(line) {
      if (line.qty > 1) {
        line.qty -= 1;
        this.recalcLine(line);
      } else if (line.qty === 1) {
        this.confirmDeleteLine(line.product.id);
      }
    },
    deleteLine(productId) {
      console.log('DELETE LINE');
      Vue.delete(this.orderLines, productId);
    },
    incrementLineDiscount (line) {
      line.discount_perc += 1;
      this.recalcLine(line);
    },
    hasClient() {
      return this.clientInfo.name && this.clientInfo.phoneRaw;
    },
    incrementLineQty(line) {
      line.qty += 1;
      this.recalcLine(line);
    },
    recalcLine(line) {
      line.total = (line.product.price * line.qty);
      line.total -= Math.round(line.total / 100 * line.discount_perc, 0);
    },
    submitOrder() {
      PosService.submitOrder(
        {
          total: this.total,
          total_discount: this.totalDiscount,
          lines: this.orderLines,
          clientInfo: {...this.clientInfo, phone: this.clientInfo.phoneRaw,id: this.clientInfo.id ? this.clientInfo.id : null},
        }
      ).then((response) => {
        console.log(response.data);
        }).catch((error) => {
        console.log(error);
        });
    },
  },
};
