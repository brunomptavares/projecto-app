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
    teste: false,
    mainNavOpen: true,
    jwtToken: null,
  },
  getters:{
    mainNavOpen: state => state.mainNavOpen,
    jwtToken: state => state.jwtToken,
    mobile: state => state.mobile
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
    }


  }
})

//import VuexService from '../services/VuexService.js'
//VuexService.dispatch('ALTERAR_INTERVENCAO_DADOS', this.IntervencaoGeralForm)
//VuexService.state.intervencao


export default store