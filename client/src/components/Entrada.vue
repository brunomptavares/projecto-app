<template>
  <div class="principal">
    <h1>Página principal</h1>
    <p>Esta é a página principal</p>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .principal {
    @extend .content;
  }

</style>


<script>

export default {
  name: "Entrada"
}
</script>