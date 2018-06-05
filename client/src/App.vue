<template>    
  <div id="app">
    <top-nav/>
    <p class="trick">{{this.mainNavToggle}}</p>
    <div id="main-section">
      <main-nav ref="mainNav"></main-nav>
      <div id="main-content" ref="mainContent">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import TopNav from "@/components/navigation/TopNav.vue"
  import MainNav from "@/components/navigation/MainNav.vue";

  import { TweenMax } from 'gsap';
  import VuexService from "@/services/VuexService.js"

  export default {
    name: 'App',
    components: { "top-nav" : TopNav, "main-nav": MainNav },
    data() {
      return {
        mainNav: null,
        mainNavAnimation: null,
        mainContent: null,
        mainContentAnimation: null
      }
    },
    methods: {
      slideMenu() {
        if(this.mainNav && this.mainContent) {
          //Slide out menu
          if(this.mainNavToggle) {
            this.mainNavAnimation.play().timeScale(1);
            // if is not mobile slide mainContent too
            if(window.innerWidth >= 1024) {
              this.mainContentAnimation.play().timeScale(1);
            }
          } else {
            this.mainNavAnimation.reverse().timeScale(0.5);
            this.mainContentAnimation.reverse().timeScale(0.5);
          }
        }
      }
    },
    computed: {
      //Menu button click changes mainNavOpen state in Vuex
      //This property reacts to that change
      //Property must be displayed in order to react wtf? <p class="trick">
      //Animation breaks computed properties so we need to use a watcher
      mainNavToggle : function () {
        return VuexService.getters.mainNavOpen
      }
    },
    watch: {
      //Watcher uses the same name as the function it's watching
      //Toggle the menu using the animation
      mainNavToggle : function() {
        this.slideMenu()
      }
    },
    mounted() {
      //We need to get the mainNav element reference when the DOM is ready
      this.mainNav = this.$refs.mainNav.$el
      this.mainContent = this.$refs.mainContent
      //Create animation for menu
      //Negative margin to hide the menu on the left
      //Opacity is to clear the shadow from the menu
      //Paused is not to start animation immediately
      this.mainNavAnimation = TweenMax.to(this.mainNav, 0.5, 
        { ease: Power1.easeIn, 
          marginLeft: 0, 
          opacity:"1", 
          paused:true })
      // Create animation for mainContent
      this.mainContentAnimation = TweenMax.to(this.mainContent, 0.5, 
        { ease: Power1.easeIn, 
          marginLeft: 250, 
          paused:true })
      //Hide mainNav if is closed
      if(this.mainNav && this.mainNavToggle) {
        this.slideMenu()
      }
    }
  }
</script>

<style lang="scss">
  //Import bulma magic scss
  @import '~bulma/bulma';
  @import 'compass/css3';

  #main-section {
    margin-top:52px; //AVACALHO
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

  /*toast-container {
    top:auto;
    right: 12px;
    bottom: 12px;
  }*/

</style>
