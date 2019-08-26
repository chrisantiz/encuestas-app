<template>
  <q-layout view="hHh lpR fFf" class="gradient-monolid">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { openURL } from 'quasar';

import Vue from 'vue';

export default Vue.extend({
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL
  }
});
</script>

<style lang="stylus" scoped>
.hola {
  background-color: $primary;
}
</style>
