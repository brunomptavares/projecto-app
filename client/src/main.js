// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import Toastr
import Toastr from 'vue-toastr';
// import toastr scss file: need webpack sass-loader
require('vue-toastr/src/vue-toastr.scss');
// register plugin
Vue.use(Toastr)

// Require the main Sass manifest file importing bluma
require('./assets/sass/main.scss');



Vue.config.productionTip = false

Vue.prototype.$appName = 'ACS';



/*Object.defineProperties(Vue.prototype, {
  $toastr: {
    get: function () {
      return Toastr;
    }
  }
})*/
//Vue.prototype.$eventBus = new Vue(); // Global event bus


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app/>',
})

