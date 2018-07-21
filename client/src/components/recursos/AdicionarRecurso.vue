<template>
  <div>
    <div class="content">
      <h1 v-if="recursoEdit">Editar Recurso</h1>
      <h1 v-else>Adicionar Recurso</h1>
      <p>Neste componente é possível adicionar ou editar um recurso.</p>
    </div>
    <form class="adicionar-recurso" ref="form" enctype="multipart/form-data" v-on:submit.prevent="addRecurso()">
      <stepper>
        <div class="step step-one">
          <div class="stepper-top">
            <span class="stepper-number">1</span>
            <p>Introduza o nome e uma breve descrição do recurso.</p>
            <p>Selecione as categorias que melhor descrevem o seu conteúdo.</p>
          </div>
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
            <div class="control-categorias">
              <button type="button" class="button" v-on:click="selectRelatedCategorias()">Selecionar</button>
              <categorias-list class="recurso-categorias"
                v-bind="{categorias:recurso.categorias, onClose:relatedCategoriaOnClose}">
              </categorias-list>
            </div>
          </div>
          <div class="step-controls">
            <button type="button" name="step-next" class="button is-link center">Próximo</button>
          </div>
        </div>

        <div class="step step-two">
          <div class="stepper-top">
            <span class="stepper-number">2</span>
            <p>Escolha o tipo de fonte de informação que pretende adicionar ao recurso.</p>
          </div>
          <label class="label">Tipo de recurso</label>
          <div class="tipo-recurso">
            <div class="tab-wrapper">
              <ul class="tipos">
                <li v-on:click="changeTipoRecursoTab($event)" v-for="tipo in tiposRecurso" v-bind:name="tipo" v-bind:key="tipo">
                  <a><span>{{tipo}}</span></a>
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
          <div class="step-controls">
            <button type="button" name="step-back" class="button center">Anterior</button>
            <button type="button" name="step-next" class="button is-link center">Próximo</button>
          </div>
        </div>

        <div class="step step-three">
          <div class="stepper-top">
            <span class="stepper-number">3</span>
            <p>Verifique o conteúdo do recurso antes de submeter na plataforma.</p>
          </div>
          <div class="step-controls">
            <button type="button" name="step-back" class="button center">Anterior</button>
            <button type="button" class="button" v-on:click="cancel()">Cancelar</button>
            <button type="submit" class="button is-link">Enviar</button>
          </div>
        </div>
      </stepper>
    </form>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .adicionar-recurso {
    .control-categorias {
      @include display-flex();
      @include align-items(center);
      .button {
        height: 42px;
      }
      .recurso-categorias {
        margin: 0 0 0 1em;
        @include flex(1);
      }
    }
    .tipo-recurso {
      @include display-flex();
      @include flex-direction(column);
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
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"
import EscolherCategoria from "@/components/categorias/EscolherCategoria";4
import Stepper from "@/components/navigation/Stepper";

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch, faFilePdf } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "AdicionarRecurso",
  components: {FontAwesomeIcon, "stepper": Stepper},
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
    if(this.recursoEdit) document.getElementsByName(this.recurso.tipo)[0].className = "is-active"
    else {
      // select as active first tipo avaiable
      this.recurso.tipo = this.tiposRecurso[0]
      document.getElementsByName(this.recurso.tipo)[0].className = "is-active"
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
    relatedCategoriaOnClose(categoria) {
      //Remove the categoria from the related categorias
      this.recurso.categorias = this.recurso.categorias.filter(cat => {
        return cat._id != categoria._id
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
      //this.validateRecurso()
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
      console.log(res)
      ToastService.toastFromResponse(this.$toastr,res)
      if(res.data.success) this.$router.go(-1)
    },
    cancel() {
      // go back on router navigation
      this.$router.go(-1)
    }
  }
};
</script>