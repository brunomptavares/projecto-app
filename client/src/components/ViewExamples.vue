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
        <template v-if="examples && examples.length > 0">
          <tr v-for="example in examples">
            <td>{{ example.docTag }}</td>
            <td>{{ example.uploadInfo.userId }}</td>
            <td>{{ example.uploadInfo.dateTime }}</td>
            <td><a target="blank" v-bind:href="'http://localhost:3000/api/examplesFile/'+ example._id">View file</a></td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style>

</style>

<script>
import ExamplesService from "@/services/ExamplesService";
import ToastService from "@/services/ToastService"
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
    this.getExamples();
  },
  methods: {
    async getExamples() {
      let res = await ExamplesService.fetchExamples();
      console.log(res)
      if(res.data.success) this.examples = res.data.examples;
      /*else {
        ToastService.toastFromResponse(this.$toastr, res)
        this.$router.push({name: 'LoginArea'})
      }*/
    },
    exampleAdded($event) {
      console.log($event)
      this.getExamples();
    },
    testEvent($event) {
      alert("testEvent, value="+$event)
    }
  }
};
</script>