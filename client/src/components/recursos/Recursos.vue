<template>
  <div class="recursos-geral">
    <h1>Recursos</h1>
    <p>Neste componente mostramos todos os recursos disponíveis.</p>
    <recursos-list v-bind:recursos="recursos"/>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .recursos-geral {
    @extend .content;
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import RecursosList from "@/components/recursos/RecursosList";

export default {
  name: "Recursos",
  components: {"recursos-list": RecursosList},
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
      if(res.data.success) this.recursos = res.data.recursos;
    }
  }
};
</script>