<template>
  <div class="categoria-bullet">
    <a class="text" 
      v-on:click="click()"
      v-on:hover="hover()">{{categoria.nome}}</a>
    <template v-if="onClose"><a class="close" v-on:click="close()"><font-awesome-icon class="icon" icon="times"/></a></template>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .categoria-bullet {
    @extend .tag;
    @extend .is-link;
    @extend .is-size-7;
    @extend .is-rounded;
    @include display-flex();
    @include align-items(center);
    display:inline-block;
    margin-left:0;
    margin-right:0.25em;
    &:last-child {
      margin:0;
    }
    &:hover {
      background-color:darken($link, 10%);
    }
    a {
      color:rgba(255,255,255,0.9);
      &:hover {
        color:#fff;
      }
    }
    .close {
      margin-top:0.275em;
      margin-right:0.25em;
      margin-left:0.75em;
    }
  }
</style>

<script>
import EventService from "@/services/EventService";
import CategoriasService from "@/services/CategoriasService";
import ToastService from "@/services/ToastService"

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faTimes } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "categoria-bullet",
  components: {FontAwesomeIcon},
  props: {
    categoria:"",
    onClose: {
      default:false
    },
    onClick: {
      default:false
    },
    onHover: {
      default:false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    close() {
      if(this.onClose) this.onClose(this.categoria)
    },
    click() {
      if(this.onClick) this.onClick(this.categoria)
    },
    hover() {
      if(this.onHover) this.onHover(this.categoria)
    }
  }
};
</script>