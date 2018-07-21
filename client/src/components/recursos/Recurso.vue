<template>
  <article class="recurso">
    <div class="recurso-toolbox">
      <div class="item"><font-awesome-icon class="icon" icon="trash-alt" /></div>
      <div class="item" v-on:click="editRecurso()"><font-awesome-icon class="icon" icon="pencil-alt" /></div>
      <div class="item"><font-awesome-icon class="icon" icon="bookmark" /></div>
      <div class="item" v-on:click="closeRecurso()"><font-awesome-icon class="icon" icon="times" /></div>
    </div>

    <div class="wrapper">
      <div class="recurso-fonte-dados">
        <recurso-fonte-dados 
          v-if="recurso.tipo==='RecursoFicheiro'"
          v-bind="{recursoFicheiro:recurso}"
        >
        </recurso-fonte-dados>
      </div>

      <div class="recurso-info">
        <div class="recurso-topo">
          <p class="nome">{{recurso.nome}}</p>
          <p class="criador">{{'@'+recurso.criador.nome}}</p>
        </div>

        <div class="recurso-corpo">
          <p class="descricao">{{recurso.descricao}}</p>
          <p class="extra">adicionado em {{recurso.dataHoraCriacao.split('T')[0]}}</p>
          <p class="extra">afixado 0 vezes</p>
        </div>

        <categorias-list class="recurso-categorias"
          v-bind="{categorias:recurso.categorias}">
        </categorias-list>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .top {
      background-color:$link;
      color:#fff;
      padding: 0.5em 1em;
    }

  .recurso {
    //@include display-flex();
    width: 100%;

    @include mobile {
      @include flex-direction(column);
       .recurso-fonte-dados {
          height:auto;
          max-height:50vh;
          margin-right:0 !important;
       }
    }

    
    .recurso-toolbox {
      @include display-flex();
      @include align-items(center);
      @include justify-content(center);
      margin-top: auto;
      height: 40px;
      background-color:$link;
      color:#fff;
      .item {
        padding:8px;
        &:hover {
          background-color:rgba(0, 0, 0, 0.15);
          cursor:pointer;
        }
        .icon {
          width:18px;
          height:18px;
        }
      }
    }

  .wrapper {
    @include display-flex();
    .recurso-fonte-dados {
      @include display-flex();
      @include flex-shrink(1);
      @include align-items(center);
      background-color:$white-ter;
      max-width:60%;
      img {
        display:block;
        width:100%;
        max-height:85vh;
        object-fit: contain;
      }
    }

    .recurso-info {
      @include display-flex();
      @include flex-direction(column);
      @include flex(1);
      padding:1.25em;
      max-width:40%;
      .recurso-topo { 
        @include display-flex();
        @include flex-direction(column);
        @include align-items(flex-start);
        .nome {
          font-weight: 700;
          margin-bottom: 0;
          line-height: 22px;
        }
        .criador {
          font-weight: 300;
          margin-bottom:0;
        }
        margin-bottom:0.5em;
      }

      .recurso-corpo {
        padding-bottom:1em;
        .extra {
          @extend .is-size-7;
          color:$grey;
          position: relative;
          margin-bottom: 0;
        }
        .descricao {
          margin-bottom: 0.5em;
        }
      }

      .recurso-categorias {
        margin-bottom:0;
        border-radius:0;
        border:0;
        border-top: 1px solid $grey-lighter;
        padding: 0.75em 0;
        background-color:$white;

        .categoria {
          @extend .is-link;
          @extend .is-rounded;
          @extend .tag;
        }
      }
    }
  }
}
</style>

<script>
import CategoriasList from "@/components/categorias/CategoriasList"
import RecursoFonteDados from "@/components/recursos/RecursoFonteDados"

import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

export default {
  name: "Recurso",
  props: {
    recurso: {
      // this way can be checked before render
      default:false
    }
  },
  components: {FontAwesomeIcon, "categorias-list": CategoriasList, "recurso-fonte-dados": RecursoFonteDados},
  // passed on parent component
  data() {
    return {

    }
  },
  mounted() {
    if(this.$route.params.recursoId) this.getRecurso(this.$route.params.recursoId);
  },
  methods: {
    editRecurso() { 
      this.$router.push({ name: 'EditarRecurso', params: {recursoEdit: this.recurso }})
      this.closeRecurso()
    },
    closeRecurso() {
      this.$modal.hide("Recurso")
    },
    async getRecurso(recursoId) {
      if(recursoId) {
        let res = await RecursosService.fetchRecurso(recursoId);
        if(res.data.success) this.recurso = res.data.recurso;
        else ToastService.toastFromResponse(this.$toastr, res)
      }
    }
  }
};
</script>