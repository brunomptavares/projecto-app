import axios from 'axios'
import passport from 'passport'

import HTTPService from './HTTPService'
import VuexService from './VuexService'

export default {
  getCategorias(ids) {
    return VuexService.getters.categorias.filter( cat => { return ids.includes(cat._id)})
  },
  getCategorias(filterParams = "") {
   return VuexService.getters.categorias
  },
  getRootCategorias(filterParams = "") {
    return VuexService.getters.categorias.filter(cat => { return !cat.antecessora })
  },
  getChildCategorias(parentCategoriaId) {
    return VuexService.getters.categorias.filter(cat => {
      return cat.antecessora === parentCategoriaId
    })
  },
  async loadCategorias() {
    let res = await this.fetchCategorias()
    if (res.data.success) {
      VuexService.dispatch('setCategorias', res.data.categorias)
    }
    else console.log("Erro ao carregar as categorias.")
  },
  // Http request to get all categorias
  async fetchCategorias (filterParams = "") {
    try { 
      let res = await HTTPService.getConnection().get('/api/obterCategorias') 
      return res;
    } catch (err) { 
      return err.response
    }
  },
  async fetchCategoria (categoriaId) {
    try { 
      let res = await HTTPService.getConnection().get('/api/obterCategoria/'+categoriaId)
      return res;
    } catch (err) { 
      return err.response
    }
  },
  async addCategoria(categoriaFormData) {
    try { 
      let res = await HTTPService.getConnection().post('/api/adicionarCategoria', categoriaFormData);
      return res;
    } catch (err) { 
      return err.response
    }
  }
}