<template>
  <section>
    <p>QuestionAddItem</p>
  </section>
</template>

<script>
import { value } from 'vue-function-api';
export default {
  props: {
    type: { type: String, required: true }
  },
  setup(props, ctx) {
    console.log(props);
  }
};
</script>

<style>
</style>