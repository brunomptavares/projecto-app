<template>
  <div class="recursos-favoritos">
    <h1>Favoritos</h1>
    <recursos-list v-bind:recursos="recursos"/>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .recursos-favoritos {
    @extend .content;
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import RecursosList from "@/components/recursos/RecursosList";

export default {
  name: "Favoritos",
  components: {"recursos-list": RecursosList},
  data() {
    return {
      recursos: []
    }
  },
  mounted() {
    this.getFavoritos();
  },
  methods: {
    async getFavoritos() {
      let res = await RecursosService.fetchRecursosFavoritos();
      if(res.data.success) this.recursos = res.data.recursos;
      console.log(this.recursos)
    }
  }
};
</script>