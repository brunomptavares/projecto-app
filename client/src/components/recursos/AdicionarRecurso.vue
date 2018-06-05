<template>
  <div>
    <div class="content">
      <h1>Adicionar Recurso</h1>
      <p>Neste componente é possível adicionar um recurso.</p>
    </div>
    <form class="adicionar-recurso" ref="form" enctype="multipart/form-data" v-on:submit.prevent="addRecurso()">
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
      <div class="field">
        <label class="label">Tags</label>
        <div class="control">
          <input class="input" type="text" name="tags">
        </div>
      </div>
      <label class="label">Tipo de recurso</label>
      <div class="tab-wrapper">
        <ul class="tipos-recurso">
          <li v-on:click="changeTipoRecursoTab($event)" v-for="tipo in tiposRecurso" v-bind:name="tipo">
            <a>
              <span>{{tipo}}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-content">
        <div class="recurso-ficheiro" v-if="tipoEscolhido==='RecursoFicheiro'">
          <div class="field">
            <label class="label">Ficheiro</label>
            <div class="control">
              <input type="file" name="file">
            </div>
          </div>
        </div>
      </div>
      <!--<div class="field">
        <label class="label">Tipo de recurso</label>
        <div class="control">
          <select name="tipoRecurso" v-model="tipoEscolhido">
            <option disabled value=""></option>
            <option v-for="tipo in tiposRecurso"v-bind:value="tipo">{{tipo}}</option>
          </select>
        </div>
      </div>
      <div class="recurso-ficheiro" v-if="tipoEscolhido==='RecursoFicheiro'">
        <div class="field">
          <label class="label">Ficheiro</label>
          <div class="control">
            <input type="file" name="file">
          </div>
        </div>
      </div>-->
      <div class="control">
        <button type="submit" class="button is-link">Enviar</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .adicionar-recurso {
    .tab-wrapper {
      @extend .tabs;
      @extend .is-boxed;
      .tipos-recurso {
        margin-left:0;
      }
    }
    .tab-content {
      border: 1px solid $grey-lighter ;
      padding: 2em;
      margin-bottom: 1em;
    }
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "AdicionarRecurso",
  component: {FontAwesomeIcon},
  data() {
    return {
      tiposRecurso: ["Evento","RecursoFicheiro","RecursoHTML","RecursoURL"],
      tipoEscolhido: ""
    }
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
    changeTipoRecursoTab(event) {
      if(this.tipoEscolhido) document.getElementsByName(this.tipoEscolhido)[0].className = ""
      this.tipoEscolhido = event.currentTarget.attributes.name.value
      //console.log(this.tipoEscolhido)
      event.currentTarget.className = "is-active";
    },
    async addRecurso() {
      // instantiate FormData object
      let formData = new FormData(this.$refs.form);
      // pass tipoEscolhido because it's not a form field
      formData.append("tipoRecurso", this.tipoEscolhido)
      let res = await RecursosService.addRecurso(formData)
      console.log(res)
      ToastService.toastFromResponse(this.$toastr,res)
    }
  }
};
</script>