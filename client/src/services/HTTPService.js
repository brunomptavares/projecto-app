import axios from 'axios'

import VuexService from './VuexService'

const ax = axios.create({
  baseURL: `http://localhost:3000`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getConnection() {
    ax.defaults.headers.common['Authorization'] = VuexService.getters.jwtToken;
    return ax;
  },
  getBaseURL() {
    return ax.defaults.baseURL
  }
}