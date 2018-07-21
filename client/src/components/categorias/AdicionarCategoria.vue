<template>
  <form class="adicionar-categoria" ref="form" enctype="multipart/form-data" v-on:submit.prevent="addCategoria()">
    <div class="field">
      <label class="label">Nome</label>
      <div class="control">
        <input class="input" type="text" name="nome">
      </div>
    </div>
    <div class="field">
      <label class="label">Descrição</label>
      <div class="control">
        <textarea class="textarea" name="descricao"></textarea>
      </div>
    </div>
    <div class="categorias-field">
      <div class="field">
        <label class="label">Categoria antecessora</label>
        <div class="categorias-list" ref="antecessora">
            <template v-if="antecessora">
              <categoria-bullet 
                v-bind="{
                  categoria:antecessora, 
                  onClose:antecessoraCategoriaOnClose}">
              </categoria-bullet>
            </template>
        </div>
        <div class="control">
          <button  type="button" class="button" v-on:click="selectParentCategoria()">Selecionar</button>
        </div>
      </div>
      <div class="field">
        <label class="label">Categorias relacionadas</label>
        <categorias-list class="recurso-categorias"
          v-bind="{
            categorias:relacionadas, 
            onClose:relacionadasCategoriaOnClose}">
        </categorias-list>
        <div class="control">
          <button type="button" class="button" v-on:click="selectRelatedCategorias()">Selecionar</button>
        </div>
      </div>
    </div>
    <div class="control">
      <button type="submit" class="button is-link">Enviar</button>
    </div>
  </form>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .categorias-field {
    @include display-flex();
    .field {
      @include display-flex();
      @include flex-direction(column);
      flex-grow: 1;
      margin-bottom:1em;
      margin-right:1em;
    }
  }
</style>

<script>
import EventService from "@/services/EventService";
import ToastService from "@/services/ToastService"

import CategoriasService from "@/services/CategoriasService";

import EscolherCategoria from "./EscolherCategoria";

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "AdicionarCategoria",
  data() {
    return {
      antecessora: false,
      relacionadas: []
    }
  },
  methods: {
    selectRelatedCategorias() {
      this.$modal.show(EscolherCategoria, { 
        // Data sent via props to component inside modal
        title:"Escolher categorias relacionadas",
        selectedCats: this.relacionadas,
        maxCategorias:5,
        onConfirm:this.relacionadasOnConfirm
      }, {
        // Modal properties
        name:"EscolherCategoria",
        height:"auto"
      })    
    },
    selectParentCategoria() {
      this.$modal.show(EscolherCategoria, { 
        // Data sent via props to component inside modal
        title:"Escolher a categoria antecessora",
        selectedCats: this.antecessora ? [this.antecessora] : [],
        maxCategorias:1,
        onConfirm:this.antecessoraOnConfirm
      }, {
        // Modal properties
        name:"EscolherCategoria",
        height:"auto"
      })    
    },
    // Is sent to EscolherCategoria via props, and used when user confirms the parent categorias
    antecessoraOnConfirm(selectedCategorias) {
      this.antecessora = selectedCategorias[0]
    },
    // Is sent to EscolherCategoria via props and used when user confirms the related categorias
    relacionadasOnConfirm(selectedCategorias) {
      this.relacionadas = selectedCategorias
    },
    // Is sent to CategoriaBullet via props and used when user clicks the cross to remove selected categoria
    antecessoraCategoriaOnClose() {
      //Remove the categoria from parent categoria
      this.antecessora = "";
    },
    // Is sent to CategoriaBullet via props and used when user clicks the cross to remove selected categoria
    relacionadasCategoriaOnClose(categoria) {
      //Remove the categoria from the related categorias
      this.relacionadas = this.relacionadas.filter(cat => {
        return cat._id != categoria._id
      })
    },
    // Send categoria to our API using CategoriasService
    async addCategoria() {
      let formData = new FormData(this.$refs.form)
      // Send id's only
      if(this.antecessora._id) formData.append("antecessora", JSON.stringify(this.antecessora._id))
      if(this.relacionadas && this.relacionadas.length > 0) formData.append("relacionadas", JSON.stringify(this.relacionadas.map( cat => {
        return cat._id
      })))
      let res = await CategoriasService.addCategoria(formData)
      ToastService.toastFromResponse(this.$toastr,res)
      console.log(res)
      if(res.data.success) {
        CategoriasService.loadCategorias()
      }
    }
  }
};
</script>