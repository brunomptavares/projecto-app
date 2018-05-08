import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../components/MainPage.vue'
import ViewExamples from '../components/ViewExamples.vue'
import AddExample from '../components/AddExample.vue'

import LoginArea from '../components/LoginArea.vue'
import RegisterArea from '../components/RegisterArea.vue'
import PerfilArea from '../components/PerfilArea.vue'

Vue.use(Router)

import AuthService from '@/services/AuthService'

const routes = [
  { path: '/', 
    name: 'MainPage', 
    component: MainPage,
    beforeEnter: function (to, from, next) {
      if(AuthService.loggedIn()) next()
      else next('/login')
    }
  },
  { path: '/viewExamples',
    name: 'ViewExamples',
    component: ViewExamples },
  { path: '/addExample',
    name: 'AddExample',
    component: AddExample },
  { path: '/login', 
    name: 'LoginArea', 
    component: LoginArea },
  //Área pessoal
  //{ path: '/pessoal/agenda', name: 'AgendaArea', component: AgendaArea }
  //{ path: '/pessoal/horario', name: 'HorarioArea', component: HorarioArea },
  { path: '/pessoal/perfil', 
    name: 'PerfilArea', 
    component: PerfilArea },
  { path: '/registo', 
    name: 'RegisterArea', 
    component: RegisterArea }
]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: "is-active", // active class for non-exact links.
  linkExactActiveClass: "is-active" // active class for *exact* links.
})