<template>
  <nav id="top-nav" class="navbar is-link">
    <div id="icons-menu">      
      <div class="navbar-burger burger" v-on:click="toggleMainNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-brand">
      <div class="navbar-item">
          <span class="logo">{{$appName}}</span>
          <span class="logo-text">Academic Colaborative System</span>
      </div>
    </div>

    <div class="search">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Procurar">
      </div>
      <div class="control">
        <a class="button is-info">
          <font-awesome-icon class="icon" icon="search" />
        </a>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
    //Import bulma magic scss
    @import "~bulma/bulma";
    @import "compass/css3";

    $space: 1em;

    #top-nav {
      position:fixed;
      top:0;
      width:100%;
      overflow: hidden;
      z-index:5;
      @include display-flex(flex);

      .logo {
        @extend .is-size-5;
        @extend .has-text-weight-semibold;
      }

      .logo-text {
        margin-left:0.5em;
        @include touch {
          display:none;
        }
      }

      .navbar-item {
        padding-left: 0;
        padding-right: $space;
      }

      #icons-menu {
        @include display-flex();
        @include flex(0);
        width:100%;
        .navbar-burger {
          margin-left: 0;
          display:block !important;
        }
      }

      .search {
        @extend .field;
        @extend .has-addons;
        @include display-flex();
        @include align-items(center);
        @include flex(1);
        margin: 0 $space 0 0 !important;

        .button {
          padding-left:1em;
          padding-right:1em;
        }

        .icon {
          font-size: $size-7;
        }
      }
      
    }

</style>

<script>
import VuexService from '@/services/VuexService.js'

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'
//import faUser from '@fortawesome/fontawesome-free-solid/faUser'
//fontawesome.library.add(faUser)

export default {
  name: "navbar",
  components: {FontAwesomeIcon},
  methods: {
    toggleMainNav: () => {
      VuexService.dispatch("toggleMainNav");
    }
  }
};
</script>
