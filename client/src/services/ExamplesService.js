import axios from 'axios'
import passport from 'passport'

import StorageService from './StorageService'
import HTTPService from './HTTPService'

export default {
  async fetchExamples () {
    try { 
      let res = await HTTPService.getConnection().get('/api/examples') 
      return res;
    } catch (err) { 
      return err.response
    }
  },
  addExample(formData) {
    return HTTPService.getConnection().post('/api/examples');
  }
}