<template>
  <div class="examples">
    <h1>Add Example</h1>
    <p>Here we can upload an example.</p>
    <form class="example-form" ref='form' enctype="multipart/form-data">
      <input type="text" name="docTag" placeholder="doc-tag">
      <input type="text" name="userId" placeholder="user-id">
      <input type="file" name="file">
      <button type="button" class="btn btn-primary" v-on:click="addExample">Add</button>
    </form>
  </div>
</template>

<script>
import ExamplesService from '@/services/ExamplesService'
import EventBus from "@/services/EventBus.js";
export default {
  name: 'AddExample',
  methods: {
   async addExample() {
      let formData = new FormData(this.$refs.form);
      let req = await ExamplesService.addExample(formData);
      EventBus.$emit('exampleAdded', formData);
    }
  }
}
</script>
