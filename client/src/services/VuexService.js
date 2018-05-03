import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
    mainNavOpen: false
  },
  /*getters:{
    mainNavOpen: state => state.mainNavOpen
  },*/
  actions:{
    'TOGGLE_MAINNAV' ({ commit, state }) {
      commit('TOGGLE_MAINNAV')
    }
  },
  mutations:{
    ['TOGGLE_MAINNAV'] (state) {
      state.mainNavOpen = !state.mainNavOpen
      console.log("NOW: " + state.mainNavOpen)
    }
  }
})

//import VuexService from '../services/VuexService.js'
//VuexService.dispatch('ALTERAR_INTERVENCAO_DADOS', this.IntervencaoGeralForm)
//VuexService.state.intervencao


export default store