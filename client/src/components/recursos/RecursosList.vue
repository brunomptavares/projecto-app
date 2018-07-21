<template>
  <masonry v-if="recursos && recursos.length > 0"
    :cols="{default: 4, 1024: 3, 768: 2, 480: 1}"
    :gutter="{default: '1em'}">
    <recurso-preview v-for="recurso in recursos" v-bind:key="recurso._id" v-bind:recurso="recurso"/>
  </masonry>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  
  .recursos-list {
    @include display-flex();
    @include flex-wrap(wrap);
    @include flex-direction(row);
    @include justify-content(space-between);
    @include flex-shrink(1);
    /*column-count: 4;
    //column-gap: 1.5em;
    @include tablet-only {
      column-count: 3;
    }
    @include mobile {
      column-count: 2;
    }
    @include until(550px) {
      column-count: 1;
    }*/
  }
</style>

<script>
import RecursoPreview from "@/components/recursos/RecursoPreview";
export default {
  name: "RecursosList",
  components: {"recurso-preview": RecursoPreview},
  props: {
    recursos: {
      default:false
    }
  },
  mounted() {
    // fix empty collumn space
    
  }
};
</script>