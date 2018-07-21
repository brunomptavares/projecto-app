<template>
  <div class="stepper">
    <slot>
    </slot>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .stepper {
    width:100%;
    position:relative;
    .stepper-top {
      position:relative;
      width:100%;
      text-align:center;
      padding-bottom:1.5em;
      border-bottom:1px solid $grey-lighter;
      margin-bottom:1.5em;
      .stepper-number {
        color:$white;
        background:$link;
        font-size: 1.5em;
        width:2em;
        height: 2em;
        line-height:2em;
        display: inline-block;
        border-radius: 50%;
        margin-bottom:1em;
      }
    }
    .step {
      position:absolute;
      top:0;
      padding:2em;
      width:100%;
      background-color:$white; 
      @include box-shadow(0 0px 10px rgba(0,0,0,0.2));
      border-radius: 0.25em;
      .step-controls {
        text-align: center;
        margin-top: 1.5em;
        padding-top: 1.5em;
        border-top:1px solid $grey-lighter;
      }
    }
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"
import EscolherCategoria from "@/components/categorias/EscolherCategoria";4

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { TweenLite } from 'gsap';

export default {
  name: "Stepper",
  data() {
    return {
      steps: [],
      inAnimation: { 
        ease: Power1.easeIn, 
        x: "105%",
        opacity:1,
      },
      currentStep: 0
    }
  },
  mounted() {
    // get step elements out of NodeList to array
    this.steps = Array.prototype.slice.call(document.getElementsByClassName("step"));
    // all slides to the right, except one
    TweenLite.set(this.steps.slice(1), { xPercent: 105 })
    // add listener to buttons
    let buttonsNext = Array.prototype.slice.call(document.getElementsByName("step-next"))
    buttonsNext.forEach(button => {
      button.addEventListener("click", () => {
        this.next()
      });
    })
    let buttonsBack = Array.prototype.slice.call(document.getElementsByName("step-back"))
    buttonsBack.forEach(button => {
      button.addEventListener("click", () => {
        this.back()
      });
    })
  },
  methods: {
    next() {
      if(this.currentStep < this.steps.length-1) {
        // in animation
        TweenLite.to(this.steps[this.currentStep], 1, { xPercent: -105 });
        // out animation
        TweenLite.fromTo(this.steps[++this.currentStep], 1, { xPercent: 105 }, { xPercent: 0 });

      }
    },
    back() {
      if(this.currentStep > 0) {
        // out animation
        TweenLite.to(this.steps[this.currentStep], 1, { xPercent: 105 });
        // in animation
        TweenLite.fromTo(this.steps[--this.currentStep], 1, { xPercent: -105 }, { xPercent: 0 });
        //TweenMax.from(this.steps[--this.currentStep],0.5, this.rightOutAnimation)
      }
    }
  }
};
</script>