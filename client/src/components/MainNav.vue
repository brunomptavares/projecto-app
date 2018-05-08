<template>
  <aside id="main-nav">
    <div class="area-pessoal">
      <p class="menu-label">Área Pessoal</p>
      <ul v-if="loggedIn" class="menu-list">
        <li><router-link to="/pessoal/agenda" exact tag="a">Agenda</router-link></li>
        <li><router-link to="/pessoal/quadro" exact tag="a">Quadro</router-link></li>
        <li><router-link to="/pessoal/horario" exact tag="a">Horário</router-link></li>
        <li><router-link to="/pessoal/notificacoes" exact tag="a">Notificações</router-link></li>
        <li><router-link to="/pessoal/perfil" exact tag="a">Perfil</router-link></li>
        <li><a v-on:click="logOut()">Terminar sessão</a></li>
      </ul>
      <ul v-else class="menu-list">
        <li><router-link to="/login" exact tag="a">Iniciar sessão</router-link></li>
      </ul>
    </div>
    <div class="area-comum">
      <p class="menu-label">Área Comum</p>
      <ul class="menu-list">
        <li><router-link to="/" exact tag="a">Examples</router-link></li>
        <li><router-link to="/procurar" exact tag="a">Procurar</router-link></li>
        <li><router-link to="/problemas" exact tag="a">Reportar problemas</router-link></li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss">
    //Import bulma magic scss
    @import '~bulma/bulma';
    @import 'compass/css3';
    #main-nav {
      //background-image: url(../../images/main-nav-bck.png);
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
      
      .menu-list {
        margin-bottom: 1em;
      }

    }
</style>

<script>

  import AuthService from "../services/AuthService.js"
  import ToastService from "@/services/ToastService"

  export default {
    name: "main-nav",
    computed: {
      loggedIn : function () {
        return AuthService.loggedIn()
      }
    }, 
    methods: {
      logOut() {
        let res = AuthService.logOut()
        ToastService.toast(this.$toastr, "Success", "User successfully logged out.", "success")
        this.$router.push({name:'LoginArea'})
      }
    }
  };
</script>
