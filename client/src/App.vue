<template>    
  <div id="app">
    <top-nav/>
    <p class="trick">{{this.mainNavToggle}}</p>
    <div id="main-section">
      <main-nav ref="mainNav"></main-nav>
      <div id="main-content">
        <router-view ref="routerView"/>
      </div>
    </div>
    <!--<section class="section">
      <slide class="container is-fluid" menu="#main-nav" panel="#main-content" v-bind:toggleSelectors="['.burger']" v-on:open="open">
        <div class="columns">
          <main-nav/>
          <router-view/>
        </div>
      </slide>
      <event-button></event-button>
    </section>-->
  </div>
</template>

<script>
  import TopNav from "./components/TopNav.vue"
  import EventButton from "./components/EventButton.vue"
  import MainNav from "./components/MainNav.vue";

  import { TweenMax } from 'gsap';
  import VuexService from "./services/VuexService.js"

  export default {
    name: 'App',
    components: { "top-nav" : TopNav, "event-button" : EventButton, "main-nav": MainNav },
    data() {
      return {
        mainNav: null,
        routerView: null,
        slideAnimation: null
      }
    },
    computed: {
      //Menu button click changes mainNavOpen state in Vuex
      //This property reacts to that change
      //Property must be displayed in order to react wtf? <p class="trick">
      //Animation breaks computed properties so we need to use a watcher
      mainNavToggle : function () {
        return VuexService.state.mainNavOpen
      }
    },
    watch: {
      //Watcher uses the same name as the function it's watching
      //Toggle the menu using the animation
      mainNavToggle : function() {
        if(this.mainNav) {
          if(this.mainNavToggle) {
            //Slide out menu
            this.slideAnimation.play().timeScale(1);
          } else {
            this.slideAnimation.reverse().timeScale(0.5);
          }
        }
      }
    },
    mounted() {
      //We need to get the mainNav element reference when the DOM is ready
      this.mainNav = this.$refs.mainNav.$el
      //Create animation
      //Negative margin to hide the menu on the left
      //Opacity is to clear the shadow from the menu
      //Paused is not to start animation immediately
      this.slideAnimation = TweenMax.to(this.mainNav, 0.5, 
        { ease: Power1.easeIn, 
          marginLeft: 0, opacity:"1", paused:true })
      //Hide mainNav if is closed
      console.log(this.mainNavToggle)
      if(this.mainNav && this.mainNavToggle) this.slideAnimation.play().timeScale(1)
      //Get routerView reference
      this.routerView = this.$refs.routerView.$el
    }
  }
</script>

<style lang="scss">
  //Import bulma magic scss
  @import '~bulma/bulma';
  @import 'compass/css3';

  #main-section {
    @include display-flex();
  }

  #main-content {
    width: 100%;
    padding:2em;
  }

  body {
    width: 100%;
    height: 100%;
  }

  .trick {
    display: none;
  }

</style>
