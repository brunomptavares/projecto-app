<template>
  <div>
    <div class="login-area">
      <h1>Log-in</h1>
      <p>Inserir credenciais para fazer log-in na aplicação.</p>
      <p>Apenas mete a JWToken na localStorage o que permite aceder ás API's que necessitam de registo.</p>
      <form class="login-form" ref='login-form' enctype="multipart/form-data" v-on:submit.prevent="logIn()">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input class="input" type="text" name="username" v-model="loginData.username">
          </div>
        </div>

        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input class="input" type="password" name="password" v-model="loginData.password">
          </div>
        </div>

        <div class="control">
          <button type="submit" class="button is-link">Log-in</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~bulma/bulma';
  @import 'compass/css3';

  .login-area, .logout-area {
    @extend .content;
    .login-form {
      input {
        width:40%;
      }
    }
  }

</style>


<script>
import AuthService from '@/services/AuthService'
import EventBus from "@/services/EventBus.js";
import axios from "axios"
import ToastService from "@/services/ToastService"

export default {
  name: 'LoginArea',
  data() {
    return {
      loginData: {username : "" , password: ""}
    };
  },
  methods: {
    async logIn() {
      let res = await AuthService.logIn(this.loginData);
      ToastService.toastFromResponse(this.$toastr,res)
      if(res.data.success) this.$router.push({name: 'MainPage'})
    }
  }
}
</script>
