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
import VuexService from '@/services/VuexService'

function loginRedirect(to, from, next) {
  if(AuthService.loggedIn()) next()
  else next('/login')
}

const routes = [
  { path: '/', 
    name: 'MainPage', 
    component: MainPage,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/viewExamples',
    name: 'ViewExamples',
    component: ViewExamples ,
   beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/addExample',
    name: 'AddExample',
    component: AddExample,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/login', 
    name: 'LoginArea', 
    component: LoginArea,
  },
  //Área pessoal
  //{ path: '/pessoal/agenda', name: 'AgendaArea', component: AgendaArea }
  //{ path: '/pessoal/horario', name: 'HorarioArea', component: HorarioArea },
  { path: '/pessoal/perfil', 
    name: 'PerfilArea', 
    component: PerfilArea,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/registo', 
    name: 'RegisterArea', 
    component: RegisterArea
  }
]

var router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: "is-active", // active class for non-exact links.
  linkExactActiveClass: "is-active" // active class for *exact* links.
})

router.afterEach((to, from) => {
  let mobile = window.innerWidth <= 1024;
  console.log(mobile)
  if(mobile && VuexService.getters.mainNavOpen) VuexService.dispatch('toggleMainNav')
})

export default router

