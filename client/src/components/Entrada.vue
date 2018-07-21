<template>
  <div class="principal">
    <h1>Página principal</h1>
    <p>Esta é a página principal</p>
    <categoria-bullet v-bind="{'categoria':teste, 'onClose':onClose}"></categoria-bullet>
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
import CategoriaBullet from "@/components/categorias/CategoriaBullet";
import VuexService from "@/services/VuexService";

export default {
  name: "Entrada",
  components: {"categoria-bullet":CategoriaBullet},
  methods: {

  },
  data() {
    return {
      teste: VuexService.getters.categorias[0],
      onClose: () => {
        console.log("onClose")
      }
    }
  }
}
</script>