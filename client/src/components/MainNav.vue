<template>
  <aside id="main-nav">
    <p class="menu-label">Área Pessoal</p>
    <ul class="menu-list">
        <li><router-link to="/pessoal/agenda" exact tag="a">Agenda</router-link></li>
        <li><router-link to="/pessoal/quadro" exact tag="a">Quadro</router-link></li>
        <li><router-link to="/pessoal/horario" exact tag="a">Horário</router-link></li>
        <li><router-link to="/pessoal/notificacoes" exact tag="a">Notificações</router-link></li>
        <li><router-link to="/pessoal/perfil" exact tag="a">Perfil</router-link></li>
    </ul>
    <p class="menu-label">Área Comum</p>
    <ul class="menu-list">
        <li><router-link to="/procurar" exact tag="a">Procurar</router-link></li>
        <li><router-link to="/login" exact tag="a">Log-in / Log-out</router-link></li>
        <li><router-link to="/problemas" exact tag="a">Reportar problemas</router-link></li>
    </ul>
    <p class="menu-label">Transactions</p>
    <ul class="menu-list">
        <li><a>Payments</a></li>
        <li><a>Transfers</a></li>
        <li><a>Balance</a></li>
    </ul>
  </aside>
</template>

<style lang="scss">
    //Import bulma magic scss
    @import '~bulma/bulma';
    @import 'compass/css3';
    #main-nav {
      @extend .menu;
      padding:1.5em;
      min-width: 250px;
      max-width: 250px;
      margin-left:-250px;
      opacity: 0;
      min-height: 100vh;
      overflow:hidden;
      z-index: 0;
      background-color: $white-bis ;
      @include box-shadow(11px 0px 21px -10px rgba(0,0,0,0.15));

      ul.menu-list li a:hover {
        @extend .is-active;
      }

      @include touch {
        position: absolute;
        //background-color:#feafea;
        z-index:5;
      }
    }
</style>

<script>

  import VuexService from "../services/VuexService.js"
  
  export default {
    name: "main-nav",
  };
</script>
