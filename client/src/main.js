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

// Import modals and dialogs module
import VModal from 'vue-js-modal'
Vue.use(VModal, { dynamic: true } )

// Import masonry layout module to show recursos
import VueMasonry from 'vue-masonry-css'
Vue.use(VueMasonry);

// Register these components globally because recursive problems
import CategoriaBullet from "@/components/categorias/CategoriaBullet";
import CategoriasList from "@/components/categorias/CategoriasList";
Vue.component('categorias-list', CategoriasList);
Vue.component('categoria-bullet', CategoriaBullet);

// Require the main Sass manifest file importing bluma
require('./assets/sass/main.scss');

// Register font awesome component
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
Vue.component('icon', FontAwesomeIcon)

// Load categorias into Vuex
import CategoriasService from "./services/CategoriasService";
CategoriasService.loadCategorias()

// Global properties
Vue.config.productionTip = false
Vue.prototype.$appName = 'ACS';

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<app/>',
})

