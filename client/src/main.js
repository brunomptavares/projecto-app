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

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

// Require the main Sass manifest file importing bluma
require('./assets/sass/main.scss');

Vue.config.productionTip = false
Vue.prototype.$appName = 'ACS';

// register font awesome component
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('icon', FontAwesomeIcon)

/*import fontawesome from '@fortawesome/fontawesome'
import regular from '@fortawesome/fontawesome-free-regular'
//import { faSearch, faFilePdf, faSortDown } from '@fortawesome/fontawesome-free-regular'
import { faFilePdf } from '@fortawesome/fontawesome-free-regular/faFilePdf'
fontawesome.library.add(regular, faFilePdf)*/

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

