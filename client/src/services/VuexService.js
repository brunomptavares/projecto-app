import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

var store = new Vuex.Store({
  plugins: [vuexLocal.plugin],
  state: {
    //nao usado remover?
    mobile: true,
    mainNavOpen: true,
    jwtToken: null,
    categorias: []
  },
  getters:{
    mainNavOpen: state => state.mainNavOpen,
    jwtToken: state => state.jwtToken,
    mobile: state => state.mobile,
    categorias: state => state.categorias
  },
  actions:{
    toggleMainNav({ commit, state }) {
      commit('toggleMainNav')
    },
    setMobile ({ commit, state }, mobile) {
      commit('setMobile')
    },
    updateToken ({ commit, state }, jwtToken) {
      commit('updateToken', jwtToken)
    },
    clearToken ({ commit, state }) {
      commit('clearToken')
    },
    setCategorias ({ commit, state }, categorias) {
      commit('setCategorias', categorias)
    }
  },
  mutations:{
    toggleMainNav (state) {
      state.mainNavOpen = !state.mainNavOpen
    },
    setMobile (state, mobile) {
      state.mobile = mobile
    },
    updateToken (state, jwtToken) {
      state.jwtToken = jwtToken
    },
    clearToken (state) {
      state.jwtToken = null
    },
    setCategorias (state, categorias) {
      state.categorias = categorias
    }
  }
})

//import VuexService from '../services/VuexService.js'
//VuexService.dispatch('ALTERAR_INTERVENCAO_DADOS', this.IntervencaoGeralForm)
//VuexService.state.intervencao


export default store