<template>
  <q-page padding>
    <p class="text-h4 text-white text-center">Crear nueva encuesta</p>
    <q-card class="shadow-10">
      <q-card-section>
        <q-form>
          <div class="row column q-col-gutter-lg">
            <!-- nombre de la nueva encuesta -->
            <div class="col">
              <q-input
                v-model="newPoll.name"
                autofocus
                color="teal-10 "
                label="Nombre de la escuesta"
                :rules="[s => !!s || 'Campo requerido']"
                hint="Nombre por el cual podrás identificar la encuesta"
              />
            </div>
            <!-- preguntas filtrables -->
            <div class="col">
              <q-list bordered class="rounded-borders">
                <q-expansion-item
                  v-model="expandedItem"
                  switch-toggle-side
                  header-class="text-teal-10"
                  expand-separator
                  icon="perm_identity"
                  label="Preguntas filtrables"
                >
                  <q-card class="card-expantion-panel">
                    <q-card-section>
                      <p
                        class="text-caption text-weight-light"
                      >Serán aquellas preguntas por las cuales usted busca identificar a su encuestado; ejemplo: ciudad, edad, sexo etcétera. Con estos datos luego podrá filtrar y obtener sus resultados (ya tabulados) apuntando a cierta población.</p>
                      <q-separator />
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item
                  switch-toggle-side
                  expand-separator
                  header-class="text-teal-10"
                  icon="library_add"
                  label="Preguntas encuesta"
                >
                  <q-card class="card-expantion-panel">
                    <q-card-section>
                      <p
                        class="text-caption text-weight-light"
                      >Añada los puntos sobre los cuales quiere obtener la opinión del encuestado.</p>
                      <q-separator />
                    </q-card-section>
                    <q-card-section>
                      <p>hey</p>
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
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
    // abrir automáticamente el item de preguntas filtrables
    const expandedItem = value(true);

    return { newPoll, expandedItem };
  }
};
</script>

<style lang="stylus" scoped>
.q-card {
  background: rgba(255, 255, 255, 0.5);
  width: 60%;
  margin: 0 auto;
}

@media (max-width: $breakpoint-xs-max) {
  .q-card {
    width: 98%;
  }
}

@media (min-width: $breakpoint-sm-min) and (max-width: $breakpoint-sm-max) {
  .q-card {
    width: 80%;
  }
}

// colocar fondo transparente al card dentro del expantion panel
.card-expantion-panel {
  background-color: transparent;
  width: 100%;
}
</style>