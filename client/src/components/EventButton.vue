<template>
  <button class="button is-primary has-text-centered" @click=emitEvent()>Emit Event</button>
</template>

<style>

</style>

<script>
import EventBus from "../services/EventBus.js";
export default {
  name: "EventButton",
  data() {
    return {
      examples: []
    };
  },
  methods: {
    emitEvent() {
      EventBus.$emit('testEvent',1);
    }
  }
};
</script>