<template>
  <div class="comp-root">
    <add-example></add-example>
    <examples></examples>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .examples {
    @extend .content;
    input {
      margin-right: 1em;
    }
  }

</style>


<script>
import AddExample from "./AddExample.vue";
import ViewExamples from "./ViewExamples.vue";

export default {
  name: "MainPage",
  components: { "examples": ViewExamples, "add-example": AddExample}
};
</script>