<template>
  <div class="content">
    <h1>Adicionar Categoria</h1>
    <p>Neste componente é possível gerir as categorias.</p>
    <adicionar-categoria></adicionar-categoria>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

</style>

<script>
import EventService from "@/services/EventService";
import EscolherCategoria from "./EscolherCategoria";
import AdicionarCategoria from "./AdicionarCategoria";
import CategoriasService from "@/services/CategoriasService";
import ToastService from "@/services/ToastService"

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "Categoria",
  components: {"adicionar-categoria": AdicionarCategoria},
  data() {
    return {
    }
  }
};
</script>