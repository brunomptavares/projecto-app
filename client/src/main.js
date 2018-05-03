// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//import BootstrapVue from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
//Vue.use(BootstrapVue);

// Require the main Sass manifest file importing bluma
require('./assets/sass/main.scss');

Vue.config.productionTip = false

Vue.prototype.$appName = 'ACS';
//Vue.prototype.$eventBus = new Vue(); // Global event bus

Object.defineProperties(Vue.prototype, {
  $eventBus: {
    get: function () {
      return new Vue();
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app/>'
})

