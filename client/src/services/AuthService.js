import axios from 'axios'

import HTTPService from './HTTPService'
import VuexService from './VuexService'

export default {
  // auth related http requests
  async logIn(loginData) {
    try {
      let res = await HTTPService.getConnection().post('/auth/login', JSON.stringify(loginData))
      // save the token and userID
      VuexService.dispatch('updateToken', res.data.jwtToken)
      //StorageService.storeSession()
      return res;
    } catch (err) { 
      return err.response
    }
  },
  logOut(formData) {
    VuexService.dispatch('clearToken')
    return {data: {success: true, msg: 'Desautenticação concluída com sucesso.'}}
  },
  loggedIn() {
    return VuexService.getters.jwtToken
  }
}