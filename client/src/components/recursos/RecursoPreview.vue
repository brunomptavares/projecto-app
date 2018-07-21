<template>
  <!--v-on:click="$router.push({name: 'Recurso', params: {recursoId: recurso._id}})"-->
  <article 
    class="recurso-preview"
    ref="recursoElem" 
    v-on:mouseover="zoomAnimation.play()" 
    v-on:mouseleave="zoomAnimation.reverse()" 
    v-on:click="modalRecurso()">

    <div class="recurso-fonte-dados">
      <recurso-fonte-dados 
        v-if="recurso.tipo==='RecursoFicheiro'"
        v-bind="{recursoFicheiro:recurso}">
      </recurso-fonte-dados >
    </div>

    <div class="recurso-topo">
      <div class="info">
        <p class="nome">{{recurso.nome}}</p>
        <p class="criador">{{'@'+recurso.criador.nome}}</p>
      </div>
    </div>

    <div class="recurso-corpo">
      <p class="descricao">{{recurso.descricao.substring(0,100)}}</p>
      <p class="extra">adicionado em {{recurso.dataHoraCriacao.split('T')[0]}}</p>
      <p class="extra">afixado 0 vezes</p>
    </div>

    <categorias-list class="recurso-categorias"
        v-bind="{categorias:recurso.categorias}">
    </categorias-list>

  </article>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .recurso-preview {
    position:relative;
    width:100%;
    z-index:3;
    @include box-shadow(0 4px 6px rgba(0,0,0,0.2));
    display: inline-block;
    margin-bottom: 1.5em;

    &:hover {
      cursor:pointer;
    }

    .recurso-fonte-dados {
      img {
        display:block;
        width:100%;
        //object-fit: cover;
      }
    }

    .recurso-topo { 
      @include display-flex();
      @include flex-direction(row);
      @include align-items(center);
      background-color: $white-ter;
      .info {
        @include flex(1);
        padding:1em;
        .nome {
          font-weight: 700;
          margin-bottom: 0;
          line-height: 22px;
        }
        .criador {
          font-weight: 300;
          margin-bottom:0;
        }
      }
    }

    .recurso-corpo {
      padding:1em;
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
      @include display-flex();
      @include flex-wrap(wrap);
      margin-bottom:0;
      border-radius:0;
      border:0;
      border-top: 1px solid $grey-lighter;
      padding: 0.75em;
      background-color:$white;
      .categoria {
        @extend .is-link;
        @extend .is-rounded;
        @extend .tag;
      }
    }
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import Recurso from "@/components/recursos/Recurso";
import RecursoFonteDados from "@/components/recursos/RecursoFonteDados"

import ToastService from "@/services/ToastService"

import { TweenMax } from 'gsap';
import CategoriasVue from '../categorias/Categorias.vue';

export default {
  name: "recurso-preview",
  components: {"recurso-fonte-dados":RecursoFonteDados},
  // passed on parent component
  props: {
    recurso: {
      // this way can be checked before render
      default:false
    }
  },
  data() {
    return {
      zoomAnimation: null
    }
  },
  mounted() {
    this.zoomAnimation = TweenMax.to(this.$refs.recursoElem, 0.3, 
    { ease: Power1.easeIn,
      transformStyle: "preserve-3d", //Blur problem
      force3D: false, //Blur problem
      scale:1.025,
      paused:true 
    })
  },
  methods: {
    modalRecurso() {
      this.$modal.show(Recurso, { 
        // Data sent via props to component inside modal
        recurso: this.recurso
      }, {
        // Modal properties
        name:"Recurso",
        height:"auto",
        width:"70%",
        scrollable:true
      })    
    }
  }
};
</script>