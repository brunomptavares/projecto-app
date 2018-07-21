<template>
  <div class="escolher-categoria">
    <div class="top">{{title}}</div>
    <div class="content">
      <!--<p>Para que o resultado de pesquisa seja o melhor deve selecionar uma categoria até esgotar as opções. Caso não encontre uma adequada pode fazer uma sugestão.</p>
      <p>Pode usar o caminho para voltar atrás e navegar na taxionomia das categorias.</p>-->
      <div class="categoria-path">
        <span class="label">Caminho da categoria:</span>
        <a class=""
          v-for="categoria in currentPathCategoria"
          v-bind:id="categoria._id"
          v-bind:key="categoria._id"  
          v-on:click="categoriaPathClick(categoria)">{{"/" + categoria.nome}}</a>
      </div>
      
      <categorias-list 
        v-bind="{
          categorias: currentCategorias,
          onClick: categoriaItemClick
        }">
      </categorias-list>

      <button type="button" class="button space-bottom" v-on:click="addSelectedCategoria()">Adicionar</button>

      <span class="label space-bottom">Categorias seleccionadas:</span>
      <categorias-list 
        v-bind="{
          categorias: selectedCategorias,
          onClose: selectedCategoriaOnClose
        }">
      </categorias-list>

      <button type="button" class="button" v-on:click="confirmSelectedCategorias()">Confirmar</button>
      <button type="button" class="button" v-on:click="cancel()">Cancelar</button>
    </div>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';
  .escolher-categoria {
    .top {
      background-color:$link;
      color:#fff;
      padding: 0.5em 1em;
    }
    .content {
      padding:1em;
      .space-bottom {
        margin-bottom: 0.5em !important;
      }
      .label {
        margin-right:0.5em;
        margin-bottom:0;
      }
      .categoria-path {
        @include display-flex();
        @include align-items(center);
        margin-bottom:0.5em;
        a {
          &:last-child {
            @extend .has-text-weight-semibold;
          }
        }
      }
      .categorias-list {
        margin-bottom:0.5em;
      }
    }
  }
</style>

<script>
import EventService from "@/services/EventService";
import ToastService from "@/services/ToastService"

import CategoriasService from "@/services/CategoriasService";

import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/fontawesome-free-solid'

export default {
  name: "escolher-categoria",
  props: {
    title: {
      default:false
    },
     selectedCats: {
      default:[]
    },
     maxCategorias: {
      default:5
    },
     onConfirm: {
      default:false
    }
  },
  data() {
    return {
      currentCategorias: [],
      currentPathCategoria: [],
      // More dark magic this time to make a copy of props
      selectedCategorias: this.selectedCats
    }
  },
  // Are categories already loaded in Vuex?
  computed: {
    ready: function() {
      return CategoriasService.getCategorias().length > 0
    }
  },
  // We are watching ready computed property
  watch: {
    ready: function() {
      if(this.ready) {
        this.currentCategorias = CategoriasService.getRootCategorias()
      }
    }
  },
  // If categories are already loaded on mounted() then we display them
  mounted() {
    if(this.ready) {
      this.currentCategorias = CategoriasService.getRootCategorias()
    }
  },
  methods: {
    updateCategorias(chosen) {
      // Update category list if there are children categories
      if(chosen.filhos.length > 0) {
        this.currentCategorias = CategoriasService.getChildCategorias(chosen._id)
      } else this.currentCategorias = []
      // Check if last category added to path has the same parent as the chosen
      // If it's the same we remove it from the path
      if(this.currentPathCategoria.length > 0 && this.currentPathCategoria[this.currentPathCategoria.length-1].antecessora === chosen.antecessora) {
        this.currentPathCategoria.pop()
      }
      // Then we add the chosen to the path
      this.currentPathCategoria.push(chosen)
    },
    // Category is clicked on the path
    categoriaPathClick(categoria) {
      let cat
      // Remove until we get the chosen cat
      do {
        cat = this.currentPathCategoria.pop()
      } while (cat._id != categoria._id)
      // If the chosen cat has parent categoria we find the children
      if(cat.antecessora) {
        this.currentCategorias = CategoriasService.getChildCategorias(cat.antecessora)
      // No parent means a root categoria was chosen
      } else {
        this.currentCategorias = CategoriasService.getRootCategorias()
      }
    },
    // Category is clicked on the bullet
    categoriaItemClick(categoria) {
      this.updateCategorias(categoria)      
    },
    // Add to selectedCategorias
    addSelectedCategoria() {
      // If there is a selected categoria and we did not reach the limit
      if(this.currentPathCategoria.length > 0) {
        if(this.selectedCategorias.length < this.maxCategorias) {
          // Get last categoria
          let chosen = this.currentPathCategoria[this.currentPathCategoria.length-1]
          // If the categoria was not added yet
          if(!this.selectedCategorias.find(cat => cat._id === chosen._id)) {
            this.selectedCategorias.push(chosen)
          } else {
            ToastService.toast(this.$toastr, "Erro", "A categoria escolhida já se encontra seleccionada.", "error")
          }
          this.currentPathCategoria = []
          this.currentCategorias = CategoriasService.getRootCategorias()
        } else {
          ToastService.toast(this.$toastr, "Erro", "Não pode seleccionar mais do que " + this.maxCategorias + " categorias.", "error")
        }
      } else ToastService.toast(this.$toastr, "Erro", "Selecione uma categoria para adicionar.", "error")
    },
    // Confirm and use onConfirm passed on props by parent component
    confirmSelectedCategorias() {
      if(this.selectedCategorias.length > 0) {
        console.log(this.selectedCategorias)
        this.onConfirm(this.selectedCategorias)
        this.$modal.hide("EscolherCategoria")
      } else ToastService.toast(this.$toastr, "Erro", "Selecione uma categoria para adicionar.", "error")
    },
    // On passed on props by parent component to remove selected CategoriaBullet
    selectedCategoriaOnClose(categoria) {
      //Remove
      this.selectedCategorias = this.selectedCategorias.filter(cat => {
        return cat._id != categoria._id
      })
    },
    cancel() {
      this.$modal.hide("EscolherCategoria")
    }
  }
};
</script>