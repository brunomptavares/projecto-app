import Vue from 'vue'
import Router from 'vue-router'

import Entrada from '../components/Entrada.vue'

import Login from '../components/auth/Login.vue'
import Registo from '../components/auth/Registo.vue'

import Perfil from '../components/pessoal/Perfil.vue'
import Favoritos from '../components/pessoal/Favoritos.vue'

import Recursos from '../components/recursos/Recursos.vue'
import Recurso from '../components/recursos/Recurso.vue'
import AdicionarRecurso from '../components/recursos/AdicionarRecurso.vue'

import Categorias from '../components/categorias/Categorias.vue'

Vue.use(Router)

import AuthService from '@/services/AuthService'
import VuexService from '@/services/VuexService'

function loginRedirect(to, from, next) {
  if(AuthService.loggedIn()) next()
  else next('/login')
}

const routes = [
  { path: '/', 
    name: 'Entrada', 
    component: Entrada,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/recursos',
    name: 'Recursos',
    component: Recursos ,
  },
  { path: '/recursos/obterRecurso/:recursoId',
    name: 'Recurso',
    component: Recurso,
    props: true // to pass recurso._id
  },
  { path: '/recursos/adicionarRecurso',
    name: 'AdicionarRecurso',
    component: AdicionarRecurso,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/recursos/editarRecurso',
    name: 'EditarRecurso',
    component: AdicionarRecurso,
    props: true,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  } ,
  { path: '/categorias',
    name: 'Categorias',
    component: Categorias ,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/login', 
    name: 'Login', 
    component: Login,
  },
  //Área pessoal
  { path: '/pessoal/favoritos', 
    name: 'Favoritos', 
    component: Favoritos 
  },
  //{ path: '/pessoal/horario', name: 'Horario', component: Horario },
  { path: '/pessoal/perfil', 
    name: 'Perfil', 
    component: Perfil,
    beforeEnter: (to, from, next) => { loginRedirect(to, from, next) }
  },
  { path: '/registo', 
    name: 'Registo', 
    component: Registo
  }
]

var router = new Router({
  mode: 'history',
  routes,
  linkActiveClass: "is-active", // active class for non-exact links.
  linkExactActiveClass: "is-active" // active class for *exact* links.
})

router.afterEach((to, from) => {
  let mobile = window.innerWidth < 1024;
  if(mobile && VuexService.getters.mainNavOpen) VuexService.dispatch('toggleMainNav')
})

export default router

