<template>
  <div>
      <img ref="img" v-bind:src="imageURL()">
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  
</style>

<script>
import RecursosService from "@/services/RecursosService";
import Recurso from "@/components/recursos/Recurso";

import ToastService from "@/services/ToastService"

import { TweenMax } from 'gsap';

export default {
  name: "recurso-fonte-dados",
  // passed on parent component
  props: {
    recursoFicheiro: {
      // this way can be checked before render
      default:false
    }
  },
   data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    imageURL() {
      return RecursosService.getFicheiroURL(this.recursoFicheiro.caminho)
    }
  }
};
</script>