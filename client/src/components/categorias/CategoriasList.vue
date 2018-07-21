<template>
  <div v-if="categorias && categorias.length > 0" class="categorias-list" >      
    <categoria-bullet
        v-for="categoria in categorias" 
        v-bind:key="categoria._id"
        v-bind="{
          categoria:categoria,
          onClick:onClick,
          onHover:onHover,
          onClose:onClose,
        }">
    </categoria-bullet>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

    .categorias-list {
      border:1px solid $grey-lighter;
      border-radius: 0.25em;
      @include display-flex();
      @include justify-content(flex-start);
      padding:0.5em;
      margin-bottom:1em;
      height:auto;
      min-height: 42px;
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
  name: "categorias-list",
  props: {
    categorias: {
      // this way can be checked before render
      default:false
    },
    onClick: {
      default:false
    },
    onHover: {
      default:false
    },
    onClose: {
      default:false
    }
  },
  mounted() {

  },
  data() {
    return {
    }
  },
  methods: {
   
  }
};
</script>