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
      clientIsValid: false,
      currentOrder: null,
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
    deleteOrder() {
      const conf = {
        title: 'Удалить продажу?',
        message: 'Вы собираетесь удалить только что созданный заказ',
        type: 'warning',
        customCloseBtnText: 'Ой, отменяем (',
        customCloseBtnClass: 'btn btn-default',
        useConfirmBtn: true,
        customConfirmBtnText: 'Да-да',
        customConfirmBtnClass: 'btn btn-danger',
        onConfirm: () => {
          PosService.deleteOrder(this.order).then(() => {
            this.makeNewOrder();
          });
        },
      };
      this.$refs.deleteProduct.openSimplert(conf);
    },
    incrementLineDiscount (line) {
      line.discount_perc += 1;
      this.recalcLine(line);
    },

    incrementLineQty(line) {
      line.qty += 1;
      this.recalcLine(line);
    },
    makeNewOrder() {
      this.orderLines = {};
      this.order = null;
      this.clientInfo = {};
    },
    recalcLine(line) {
      line.total = (line.product.price * line.qty);
      line.total -= Math.round(line.total / 100 * line.discount_perc, 0);
    },
    submitOrder() {
      if (this.clientInfo.hasOwnProperty('name') && this.clientInfo.name
        && this.clientInfo.hasOwnProperty('phoneRaw') && this.clientInfo.phoneRaw.indexOf('_') === -1) {
        PosService.submitOrder(
          {
            total: this.total,
            total_discount: this.totalDiscount,
            lines: this.orderLines,
            clientInfo: {
              ...this.clientInfo,
              phone: this.clientInfo.phoneRaw,
              id: this.clientInfo.id ? this.clientInfo.id : null
            },
          }
        ).then((response) => {
          this.order = response.data.data;
          this.clientInfo = null;
          const conf = {
            title: 'Продажа завершена',
            message: 'Что делаем дальше?',
            type: 'success',
            customCloseBtnText: 'Ой, отменяем (',
            customCloseBtnClass: 'btn btn-danger',
            useConfirmBtn: true,
            customConfirmBtnText: 'Новый заказ',
            customConfirmBtnClass: 'btn btn-success',
            onConfirm: () => {
              this.makeNewOrder();
            },
            onClose: () => {
              this.deleteOrder();
            },
          };
          this.$refs.deleteProduct.openSimplert(conf);
        }).catch((error) => {
          console.log(error);
        });
      } else {
        this.$store.dispatch('showAlert', 'Заполните данные клиента');
      }
    },
  },
};
