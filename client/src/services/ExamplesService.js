import axios from 'axios'

const connection = axios.create({baseURL: `http://localhost:3000`})

export default {
  fetchExamples () {
    return connection.get('/api/examples');
  },
  addExample(formData) {
    return connection.post('/api/examples', formData);
  }
}