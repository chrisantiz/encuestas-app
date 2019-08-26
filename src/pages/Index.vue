<template>
  <h2>{{ message }}</h2>
</template>

<script>
import { value } from 'vue-function-api';
export default {
  setup() {
    const message = value('Esta es la nueva API de vue');

    return { message };
  }
};
</script>

<style>
</style>