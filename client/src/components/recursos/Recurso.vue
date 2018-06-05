<template>
  <article class="recurso">
    <div class="recurso-imagem">
      <img src="../../assets/cu.jpg">
    </div>
    <div class="recurso-info">
      <div class="recurso-topo">
        <div class="info">
          <p class="nome">{{recurso.nome}}</p>
          <p class="criador">{{'@'+recurso.criador.username}}</p>
        </div>
      </div>
      <div class="recurso-corpo">
        <p class="descricao">{{recurso.descricao}}</p>
        <p class="extra">adicionado em {{recurso.dataHoraCriacao.split('T')[0]}}</p>
        <p class="extra">afixado 0 vezes</p>
      </div>
      <div class="recurso-tags">
        <span class="tag is-link is-rounded">tag1</span>
        <span class="tag is-link is-rounded">tag2</span>
      </div>
    </div>
  </article>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .recurso {
    //@include display-flex();
    margin: 0 0 1.5em;
    width: 100%;
    column-count: 2;
    column-gap: 1em;
    @include mobile {
      column-count: 1;
    }
    .recurso-imagem {
      img {
        display:block;
        width:100%;
        max-height:500px;
        object-fit: cover;
        @include mobile {
          margin-bottom:1em;
        }
      }
    }
    .recurso-info {
      .recurso-topo { 
      @include display-flex();
      @include flex-direction(row);
      @include align-items(center);
      .info {
        @include flex(1);
        margin-bottom:1em;
        .nome {
          font-weight: 700;
          margin-bottom: 0;
          line-height: 22px;
        }
        .criador {
          font-weight: 300;
          margin-bottom:0;
        }
      }
    }
    .recurso-corpo {
      padding-bottom:1em;
      .extra {
        @extend .is-size-7;
        color:$grey;
        position: relative;
        margin-bottom: 0;
      }
      .descricao {
        margin-bottom: 0.5em;
      }
    }
    .recurso-tags {
      border-top: 1px solid $grey-lighter;
      padding: 1em 0;
    }
    }
  }
</style>

<script>
import RecursosService from "@/services/RecursosService";
import ToastService from "@/services/ToastService"


export default {
  name: "RecursoPreview",
  // passed on parent component
  data() {
    return {
      recurso: ""
    }
  },
  mounted() {
    this.getRecurso(this.$route.params.recursoId);
  },
  methods: {
    async getRecurso(recursoId) {
      let res = await RecursosService.fetchRecurso(recursoId);
      console.log(res)
      if(res.data.success) this.recurso = res.data.recurso;
      else ToastService.toastFromResponse(this.$toastr, res)
    }
  }
};
</script>