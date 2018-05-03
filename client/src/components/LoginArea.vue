<template>
  <div class="login-area">
    <h1>Log in</h1>
    <p>Here we can upload an example.</p>
    <form class="login-form" ref='login-form' enctype="multipart/form-data">
      <div class="field">
        <label class="label">Username</label>
        <div class="control">
          <input class="input" type="text" name="username">
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input class="input" type="password" name="password">
        </div>
      </div>

      <div class="control">
        <button class="button is-link">Login</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
  @import '~bulma/bulma';
  @import 'compass/css3';

  .login-area {
    @extend .content;
    .login-form {
      input {
        width:40%;
      }
    }
  }

</style>


<script>
import ExamplesService from '@/services/ExamplesService'
import EventBus from "@/services/EventBus.js";
export default {
  name: 'LoginArea',
  methods: {
   async addExample() {
      let formData = new FormData(this.$refs.form);
      let req = await ExamplesService.addExample(formData);
      EventBus.$emit('exampleAdded', formData);
    }
  }
}
</script>
