<template>
  <article 
    v-on:mouseover="zoomAnimation.play()" 
    v-on:mouseleave="zoomAnimation.reverse()" 
    v-on:click="$router.push({name: 'Recurso', params: {recursoId: recurso._id}})"
    ref="recurso" class="recurso-preview">
    <div class="recurso-imagem">
      <img src="../../assets/cu.jpg">
    </div>
    <div class="recurso-topo">
      <div class="info">
        <p class="nome">{{recurso.nome}}</p>
        <p class="criador">{{'@'+recurso.criador.username}}</p>
      </div>
      <!--<div class="options">
        <icon class="icon" icon="file-pdf"/>
        <a href="#"><icon class="menu-icon" icon="sort-down"/></a>
      </div>-->
    </div>
    <div class="recurso-corpo">
      <p class="descricao">{{recurso.descricao.substring(0,100)}}</p>
      <p class="extra">adicionado em {{recurso.dataHoraCriacao.split('T')[0]}}</p>
      <p class="extra">afixado 0 vezes</p>
    </div>
    <div class="recurso-tags">
      <span class="tag is-link is-rounded">tag1</span>
      <span class="tag is-link is-rounded">tag2</span>
    </div>
  </article>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .recurso-preview {
    position:relative;
    z-index:3;
    @include box-shadow(0 4px 6px rgba(0,0,0,0.2));
    display: inline-block;
    margin: 0 0 1.5em;
    width: 100%;
    &:hover {
      cursor:pointer;
    }
    .recurso-imagem {
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
    .recurso-tags {
      border-top: 1px solid $grey-lighter;
      padding: 0.75em;
      background-color:$white;
    }
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"

import { TweenMax } from 'gsap';


export default {
  name: "RecursoPreview",
  // passed on parent component
  props:["recurso"],
  data() {
    return {
      zoomAnimation: null
    }
  },
  mounted() {

    this.zoomAnimation = TweenMax.to(this.$refs.recurso, 0.3, 
    { ease: Power1.easeIn,
      transformStyle: "preserve-3d", //Blur problem
      force3D: false, //Blur problem
      scale:1.025,
      paused:true 
    })

    /*this.zoomAnimation = TweenMax.to(this.$refs.recurso, 0.3, 
    { ease: Power1.easeIn,
      force3D: false, //Blur problem,
      y: -10,
      paused: true
    })*/

  }
};
</script>