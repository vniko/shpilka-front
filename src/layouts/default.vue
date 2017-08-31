<template>
<div class="container-fluid">
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
    <div class="container full-width">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav ml-auto mr-0">
          <li class="nav-item">
            <a class="nav-link" href="#schedule/1">Запись</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#pos">Продажа</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#x">Учет посещений</a>
          </li>

        </ul>
      </div><!-- / navbar-collapse -->
    </div>
  </nav>
  <div style="margin-top:15px;">
      <slot name="content"></slot>
  </div>
  <simplert ref="alert" ></simplert>
</div>

</template>
<script>
import Simplert from 'vue2-simplert';

export default {
  name: 'Layout',
  data() {
    return {};
  },
  components: {
    Simplert,
  },
  methods: {
    showAlert(message) {
      const conf = {
        title: 'Внимание',
        message,
        type: 'warning',
        customCloseBtnClass: 'btn btn-default',
      };
      this.$refs.alert.openSimplert(conf);
    },
  },
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'SHOW_ALERT') {
        this.showAlert(mutation.payload);
      }
    });
  },
};
</script>
