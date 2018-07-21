import axios from 'axios'
import passport from 'passport'

import StorageService from './StorageService'
import HTTPService from './HTTPService'

export default {
  async fetchRecursos (filterParams = "") {
    try { 
      let res = await HTTPService.getConnection().get('/api/obterRecursos') 
      return res;
    } catch (err) { 
      return err.response
    }
  },
  async fetchRecursosFavoritos () {
    try { 
      let res = await HTTPService.getConnection().get('/api/obterFavoritos/')
      return res;
    } catch (err) { 
      return err.response
    }
  },
  async fetchRecurso (recursoId) {
    try { 
      let res = await HTTPService.getConnection().get('/api/obterRecurso/'+recursoId)
      return res;
    } catch (err) { 
      return err.response
    }
  },
  async addRecurso(recursoFormData) {
    try { 
      let res = await HTTPService.getConnection().post('/api/adicionarRecurso', recursoFormData);
      return res;
    } catch (err) { 
      return err.response
    }
  },
  getFicheiroURL(caminho) {
    return HTTPService.getBaseURL() + "/api/obterRecursoFicheiro/" + caminho
  },
  async fetchRecursoFicheiro(caminho) {
    try { 
      let res = await HTTPService.getConnection().get('/api/obterRecursoFicheiro/'+caminho);
      return res;
    } catch (err) { 
      return err.response
    }
  }
}