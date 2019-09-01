<template>
  <q-page padding>
    <p class="text-h4 text-grey-9 text-center">Crear nueva encuesta</p>
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
                  label="Preguntas personales (opcional)"
                >
                  <q-card class="card-expantion-panel">
                    <q-card-section>
                      <p class="text-caption text-weight-light">
                        Serán aquellas preguntas por las cuales usted busca
                        identificar a su encuestado. Ejemplo: ciudad, edad, sexo
                        etcétera. Con estos datos luego podrá filtrar y obtener
                        sus resultados (ya tabulados) apuntando a cierta
                        población.
                      </p>
                      <!-- añadir nueva pregunta filtrable -->
                      <q-btn
                        label="Añadir"
                        icon="add"
                        @click="openModalAddQuestion('filter')"
                      />
                      <q-separator class="q-my-md" />
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
                      <p class="text-caption text-weight-light">
                        Añada los puntos sobre los cuales quiere obtener la
                        opinión del encuestado.
                      </p>
                      <!-- añadir nueva pregunta filtrable -->
                      <q-btn
                        label="Añadir"
                        icon="add"
                        @click="openModalAddQuestion('default')"
                      />
                      <q-separator class="q-my-md" />
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>

    <!-- modal para agregar nueva pregunta -->
    <q-dialog v-model="dialog.addQuestion" persistent>
      <QuestionAddItem :type="questionType" @addchild="onAddNewChild" />
    </q-dialog>

    <!-- modal para agregar pregunta hija -->
    <q-dialog v-model="dialog.addQuestionChild" persistent>
      <QuestionAddItem type="child" :question-parent="questionParent" />
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { value } from 'vue-function-api';
import QuestionAddItem from '../components/QuestionAddItem.vue';
import { QuestionParent } from '../types/components/question-add-item.interface';
export default {
  components: { QuestionAddItem },
  setup() {
    /* --------- state ------- */
    /** datos de la nueva encuesta */
    const newPoll = value({ name: '' });
    /** abrir automáticamente el item de preguntas filtrables */
    const expandedItem = value(true);
    /** dialogs */
    const dialog = value({ addQuestion: false, addQuestionChild: false });
    /** tipo de pregunta a agregar */
    const questionType = value<'filter' | 'default'>('filter');
    /** datos de una pregunta padre */
    const questionParent = value<QuestionParent | null>(null);

    /* ---------- computed -------- */

    /* ---------- methods -------- */

    /** abrir modal para añadir pregunta */
    function openModalAddQuestion(type: 'filter' | 'default') {
      dialog.value.addQuestion = true;
      questionType.value = type;
    }

    /** una pregunta hija añadida */
    function onAddNewChild(data: QuestionParent) {
      questionParent.value = data;
      dialog.value.addQuestionChild = true;
    }

    return {
      newPoll,
      expandedItem,
      dialog,
      questionType,
      openModalAddQuestion,
      onAddNewChild,
      questionParent
    };
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