<template>
  <q-page padding>
    <!-- títulos -->
    <div>
      <p class="text-h3 text-white text-center q-pt-md">Encuestas App</p>
      <p class="text-h6 text-white text-center text-weight-light">{{ classesByScreenSize.subtitle }}</p>
    </div>

    <!-- contenedor de botones -->
    <div
      class="absolute-center"
      :class="classesByScreenSize.buttonsContainerClass"
      style="width:200px;"
    >
      <!-- botón MIS ENCUESTAS -->
      <div class="text-center">
        <q-btn size="lg" color="info" class="text-black" label="Mis encuestas" />
      </div>
      <!-- botón CREAR NUEVA -->
      <div class="text-center q-mt-md">
        <q-btn label="Crear nueva" size="md" color="black" text-color="info" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { value, onCreated, computed } from 'vue-function-api';

export default {
  setup(props, ctx) {
    const message = value('Esta es la nueva API de vue');

    onCreated(() => {
      console.log(process.env.VUE_ROUTER_MODE);
    });

    const classesByScreenSize = computed(() => {
      // cuando está en pantalla pequeña
      if (ctx.parent.$q.screen.xs) {
        return {
          subtitle: 'Crea, aplica y tabula tus encuestas',
          buttonsContainerClass: 'q-mt-xl'
        };
      }
      return {
        subtitle:
          'Una forma sencilla para crear, aplicar y tabular tus encuestas',
        buttonsContainerClass: 'q-mt-none'
      };
    });

    return { message, classesByScreenSize };
  }
};
</script>

<style>
</style>