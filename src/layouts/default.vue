<template>
<div class="container-fluid">
  <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse">
    <div class="container full-width">
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav" v-if="user">
          <li class="nav-item"  >
            <a style="color:white">Пользователь: {{ user.name }} </a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mr-0" v-if="user">
          <li class="nav-item"  :class="{active: $route.name=='schedule'}">
            <a class="nav-link badge"  :class="{'badge-primary': $route.name=='schedule'}"  href="#schedule/1">Запись</a>
          </li>
          <li class="nav-item" :class="{active: $route.name=='pos'}" >
            <a class="nav-link badge" :class="{'badge-primary': $route.name=='pos'}" href="#pos">Продажа</a>
          </li>
          <li class="nav-item" :class="{active: $route.name=='pos-history'}">
            <a class="nav-link badge"  :class="{'badge-primary': $route.name=='pos-history'}"  href="#pos-history">История продаж</a>
          </li>
          <li class="nav-item" :class="{active: $route.name=='clients'}">
            <a class="nav-link badge"  :class="{'badge-primary': $route.name=='clients'}"  href="#clients">Клиенты</a>
          </li>
          <li class="nav-item" :class="{active: $route.name=='worklog'}" >
            <a class="nav-link badge"  :class="{'badge-primary': $route.name=='worklog'}"  href="#worklog">Учет рабочего времени</a>
          </li>
          <li class="nav-item">
            <a class="nav-link badge badge-danger"  href="#logout"><i class="fa fa-sign-out"></i> Завершить работу</a>
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
  computed: {
    user() {
      return this.$store.state.auth.user;
    },
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
<style>
  .navbar .badge {font-size: 1rem}
</style>
