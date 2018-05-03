<template>
  <nav id="top-nav" class="navbar is-link">
    <div class="navbar-brand">
      <div class="navbar-item">
          <span class="logo">{{$appName}}</span>
          <span class="logo-text">Academic Colaborative System</span>
      </div>
    </div>
    <div id="icons-menu">
      <div class="navbar-burger burger" v-on:click="toggleMainNav">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <!--div id="navMenuColorlink-example" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/" exact class="navbar-item" tag="a">Home</router-link>
        <router-link to="/viewExamples" class="navbar-item" tag="a">View Examples</router-link>
        <router-link to="/addExample" class="navbar-item" tag="a">Add Example</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <router-link to="/" exact class="navbar-link" tag="a">Examples</router-link>
          <div class="navbar-dropdown">
            <router-link to="/viewExamples" class="navbar-item" tag="a">View Examples</router-link>
            <router-link to="/addExample" class="navbar-item" tag="a">Add Example</router-link>
            <hr class="navbar-divider">
            <router-link to="/" exact class="navbar-item" tag="a">Something Here</router-link>
          </div>
        </div>
      </div>  
    </div>-->
  </nav>
</template>

<style lang="scss">
    //Import bulma magic scss
    @import "~bulma/bulma";
    @import "compass/css3";

    #top-nav {
      @include display-flex(flex);

      .logo {
        @extend .is-size-5;
        @extend .has-text-weight-semibold;
      }

      .logo-text {
        margin-left:0.5em;
      }

      .navbar-item {
        padding-left: 1.5em;
        padding-right :1.5em;
      }

      #icons-menu {
        @include display-flex();
        width:100%;
        .navbar-burger {
          display:block !important;
        }
      }
    }

</style>

<script>
import VuexService from '../services/VuexService.js'

export default {
  name: "navbar",
  methods: {
    toggleMainNav: () => {
      VuexService.dispatch("TOGGLE_MAINNAV");
    }
  }
};
</script>
