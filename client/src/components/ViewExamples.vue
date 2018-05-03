<template>
  <div class="examples">
    <h1>View Examples</h1>
    <p>This file will list all the uploded examples.</p>
    <table class="table">
      <tr>
        <th scope="col">doc-tag<br></th>
        <th scope="col">user-id</th>
        <th scope="col">date-time</th>
        <th scope="col">file</th>
      </tr>
      <tbody>
        <tr v-for="example in examples">
          <td>{{ example.docTag }}</td>
          <td>{{ example.uploadInfo.userId }}</td>
          <td>{{ example.uploadInfo.dateTime }}</td>
          <td><a target="blank" v-bind:href="'http://localhost:3000/api/examplesFile/'+ example._id">View file</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>

<script>
import ExamplesService from "@/services/ExamplesService";
import EventBus from "@/services/EventBus.js";
export default {
  name: "ViewExamples",
  data() {
    return {
      examples: []
    };
  },
  created() {
    EventBus.$on('exampleAdded', this.exampleAdded);
    EventBus.$on('testEvent', this.testEvent);
  },
  beforeDestroy() {
    EventBus.$off('exampleAdded');
    EventBus.$off('testEvent');
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      const response = await ExamplesService.fetchExamples();
      this.examples = response.data;
    },
    exampleAdded($event) {
      console.log($event)
      this.getPosts();
    },
    testEvent($event) {
      alert("testEvent, value="+$event)
    }
  }
};
</script>