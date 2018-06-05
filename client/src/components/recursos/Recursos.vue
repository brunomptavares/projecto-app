<template>
  <div class="geral">
    <h1>Recursos</h1>
    <p>Neste componente mostramos todos os recursos disponíveis.</p>
    <template v-if="recursos && recursos.length > 0">
      <div class="recursos">
        <recurso-preview v-for="recurso in recursos" v-bind:recurso="recurso" v-bind:key="recurso._id"/>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .geral {
    @extend .content;
    .recursos {
      column-count: 4;
      column-gap: 1.5em;
      @include tablet-only {
        column-count: 3;
      }
      @include mobile {
        column-count: 2;
      }
      @include until(550px) {
        column-count: 1;
      }
    }
  }
</style>

<script>
import ToastService from "@/services/ToastService"
import RecursosService from "@/services/RecursosService";
import RecursoPreview from "@/components/recursos/RecursoPreview";

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "Recurso",
  components: {"recurso-preview": RecursoPreview},
  data() {
    return {
      recursos: []
    }
  },
  mounted() {
    this.getRecursos();
  },
  methods: {
    async getRecursos() {
      let res = await RecursosService.fetchRecursos();
      console.log(res)
      if(res.data.success) this.recursos = res.data.recursos;
    }
  }
};
</script>