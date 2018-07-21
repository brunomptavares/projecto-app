<template>
  <div>
    <div class="content">
      <h1 v-if="recursoEdit">Editar Recurso</h1>
      <h1 v-else>Adicionar Recurso</h1>
      <p>Neste componente é possível adicionar ou editar um recurso.</p>
    </div>
    <form class="adicionar-recurso" ref="form" enctype="multipart/form-data" v-on:submit.prevent="addRecurso()">
      <div class="field">
        <label class="label">Nome</label>
        <div class="control">
          <input class="input" type="text" ref="nome" name="nome" v-model="recurso.nome">
        </div>
      </div>
      <div class="field">
        <label class="label">Descrição</label>
        <div class="control">
          <textarea class="textarea" ref="descricao" name="descricao" v-model="recurso.descricao"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label">Categorias relacionadas</label>
        <div class="categorias-list" ref="categorias">
          <template v-if="recurso.categorias.length > 0">
            <!--- 
              Dark magic: relatedCategoriaClose,bind(this,categoria._id)
              To send function trough props one must not use parentesis (see onClose:parentCategoriaClose on top of this), but we need to pass
              an argument to remove the category in this component so we use bind with this keyword
            -->
            <categoria-bullet
              v-for="categoria in recurso.categorias" 
              v-bind:key="categoria._id"
              v-bind="{categoria:categoria, onClose:relatedCategoriaOnClose.bind(this,categoria._id)}">
            </categoria-bullet>
          </template>
        </div>
        <div class="control">
          <button type="button" class="button" v-on:click="selectRelatedCategorias()">Selecionar</button>
        </div>
      </div>
      <label class="label">Tipo de recurso</label>
      <div class="tipo-recurso">
        <div class="controls">
          <div class="tab-wrapper">
            <ul class="tipos">
              <li v-on:click="changeTipoRecursoTab($event)" v-for="tipo in tiposRecurso" v-bind:name="tipo" v-bind:key="tipo" v-bind:ref="tipo">
                <a>
                  <span>{{tipo}}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="tab-content">
            <div class="recurso-ficheiro" v-if="recurso.tipo==='RecursoFicheiro'">
              <div class="field">
                <label class="label">Ficheiro</label>
                <div class="control">
                  <input type="file" name="file">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="preview">
        </div>
      </div>
      <div class="control">
        <button type="submit" class="button is-link">Enviar</button>
        <button type="button" class="button" v-on:click="cancel()">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .adicionar-recurso {
    .tipo-recurso {
      @include display-flex();
      .controls {
        .tab-wrapper {
          @extend .tabs;
          @extend .is-boxed;
          .tipos {
            margin-left:0;
          }
        }
        .tab-content {
          border: 1px solid $grey-lighter ;
          padding: 2em;
          margin-bottom: 1em;
        }
      }
      .preview {
        @include display-flex();
      }
    }
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"
import EscolherCategoria from "@/components/categorias/EscolherCategoria";4
import CategoriaBullet from "@/components/categorias/CategoriaBullet";

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch, faFilePdf } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "AdicionarRecurso",
  components: {FontAwesomeIcon, "categoria-bullet":CategoriaBullet},
  props: {
    recursoEdit: {
      default:false
    }
  },
  data() {
    return {
      tiposRecurso: ["Genérico","Evento","RecursoFicheiro","RecursoHTML","RecursoURL"],
      recursoNew: {
        nome: "",
        descricao: "",
        categorias: [],
        tipo: ""
      }
    }
  },
  mounted() {
    // change active tab in edit mode
    if(this.recursoEdit) this.$refs[this.recurso.tipo][0].className = "is-active"
    else {
      // select as active first tipo avaiable
      this.recurso.tipo = this.tiposRecurso[0]
      this.$refs[this.recurso.tipo][0].className = "is-active"
    }
  },
  computed: {
    recurso() {
      return this.recursoEdit || this.recursoNew
    }
  },
  methods: {
    // Call modal with EscolherCategoria component to choose categorias
     selectRelatedCategorias() {
      this.$modal.show(EscolherCategoria, { 
        // Data sent via props to component inside modal
        title:"Escolher categorias categorias",
        selectedCats: this.recurso.categorias,
        maxCategorias:5,
        onConfirm:this.relatedOnConfirm
      }, {
        // Modal properrties
        name:"EscolherCategoria",
        height:"auto"
      })    
    },
     // Is sent to EscolherCategoria via props and used when user confirms the related categorias
    relatedOnConfirm(cats) {
      this.recurso.categorias = cats
    },
    // Is sent to CategoriaBullet via props and used when user clicks the cross to remove selected categoria
    relatedCategoriaOnClose(categoriaId) {
      //Remove the categoria from the related categorias
      this.recurso.categorias = this.recurso.categorias.filter(cat => {
        return cat._id != categoriaId
      })
    },
    changeTipoRecursoTab(event) {
      // remove is-active
      if(this.recurso.tipo) document.getElementsByName(this.recurso.tipo)[0].className = ""
      // change recurso tipo and class for clicked tab
      this.recurso.tipo = event.currentTarget.attributes.name.value
      event.currentTarget.className = "is-active";
    },
    async addRecurso() {
      // instantiate FormData object
      let formData = new FormData(this.$refs.form)
      // if we are editing
      if(this.recursoEdit) formData.append("edit", 1)
      // pass tipoEscolhido because it's not a form field
      if(this.tipo) formData.append("tipo", this.recurso.tipo)
      // append categorias if they were selected
      if(this.recurso.categorias && this.recurso.categorias.length > 0) formData.append("categorias", JSON.stringify(this.recurso.categorias.map(cat => { return cat._id })))
      // async request to get recursos
      let res = await RecursosService.addRecurso(formData)
      // go back on router navigation
      ToastService.toastFromResponse(this.$toastr,res)
      this.$router.go(-1)
    },
    cancel() {
      // go back on router navigation
      this.$router.go(-1)
    }
  }
};
</script>