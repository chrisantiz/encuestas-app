<template>
  <q-page padding>
    <p class="text-h4 text-white text-center">Crear nueva encuesta</p>
    <q-card class="shadow-10">
      <q-card-section>
        <q-form>
          <div class="row">
            <!-- nombre de la nueva encuesta -->
            <div class="col">
              <q-input v-model="newPoll.name" color="info" dark label="Nombre de la escuesta" />
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { value } from 'vue-function-api';
export default {
  setup() {
    const newPoll = value({ name: '' });

    return { newPoll };
  }
};
</script>

<style lang="stylus" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.1);
  width: 60%;
  margin: 0 auto;
}
</style>