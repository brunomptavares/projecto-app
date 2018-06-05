<template>
  <div class="register-area">
    <h1>Registo</h1>
    <p>Página de registo do utilizador</p>
    <form class="register-form" ref='register-form' enctype="multipart/form-data">
      <div class="field">
        <label class="label">Nome*</label>
        <div class="control">
          <input class="input" type="text" name="username">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="text" name="password">
        </div>
      </div>

      <div class="field">
        <label class="label">Número de aluno*</label>
        <div class="control">
          <input class="input" type="text" name="text">
        </div>
      </div>

      <div class="field">
        <label class="label">Mail pessoal*</label>
        <div class="control">
          <input class="input" type="text" name="username">
        </div>
      </div>

      <div class="field">
        <p>A confirmação do registo será feita no mail do IPL. Onde deseja receber informações relativas à aplicação?</p>
        <div class="control">
          <label class="radio">
            <input type="radio" name="answer">
            Mail pessoal
          </label>
          <label class="radio">
            <input type="radio" name="answer">
            Mail do IPL
          </label>
        </div>
      </div>

      <div class="control">
        <button class="button is-link">Login</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
  @import '~bulma/bulma';
  @import 'compass/css3';

  .register-area {
    @extend .content;
    .register-form {
      input[type="text"] {
        width:40%;
      }
    }
  }

</style>


<script>

  export default {
    name: 'Registo',
    methods: {
    }
  }

</script>
