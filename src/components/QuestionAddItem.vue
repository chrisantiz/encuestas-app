<template>
  <section>
    <q-form>
      <div class="column q-col-gutter-md">
        <div class="col">
          <q-input
            v-model="form.question.title"
            autofocus
            autogrow
            label="Ingrese la pregunta a realizar"
          />
        </div>
        <div v-if="$props.type === 'default'" class="col">
          <q-select
            v-model="form.htmlElement"
            :options="selectValues"
            label="Tipo de elemento HTML a utilizar"
          />
        </div>
        <div class="col">
          <q-input
            v-model="option"
            label="Opciones para responder la pregunta"
            hint="Digite una opción seguida de «enter» para agregarla"
            @keydown.enter.prevent="addOption($event)"
            autogrow
          />
        </div>
        <q-list>
          <q-item v-for="(option, index) in form.question.options" :key="index">
            <q-item-section>
              <q-item-label class="text-overline text-weight-light">Opción #{{index+1}}</q-item-label>
              <q-item-label caption lines="2" class="text-body1 text-weight-bold">{{option}}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>
                <q-btn flat icon="edit" round @click="openDialogEditOption(option, index)">
                  <q-tooltip>Editar opción</q-tooltip>
                </q-btn>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator></q-separator>
        </q-list>
      </div>

      <!-- dialog para modificar una opción -->
      <q-dialog v-model="dialog.editOption.open" persistent>
        <q-card style="min-width: 400px">
          <q-card-section>
            <div class="text-h6">Tu nuevo valor</div>
          </q-card-section>

          <q-card-section>
            <q-input dense v-model="dialog.editOption.text" autofocus @keyup.enter="editOption" />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup @click="editOption" />
            <q-btn flat label="Confirmar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <pre>{{form.question.options}}</pre>
    </q-form>
  </section>
</template>

<script lang="ts">
import { value } from 'vue-function-api';
import { Context } from 'vue-function-api/dist/types/vue';
export default {
  props: {
    type: { type: String, required: true }
  },
  setup(props: any, ctx: Context) {
    const form = value<{
      question: { title: string; options: string[] };
      htmlElement: string;
    }>({
      question: { title: '', options: [] },
      htmlElement: ''
    });
    // opción digitada por el usuario
    const option = value('');
    const selectValues = value<string[]>(['Select', 'Radio']);
    // dialog
    const dialog = value({ editOption: { open: false, text: '', index: -1 } });

    /* ----------- methods --------- */
    function addOption(e: KeyboardEvent) {
      e.preventDefault();
      if (!form.value.question.options.includes(option.value)) {
        form.value.question.options.push(option.value);
        option.value = '';
      }
    }

    /** abrir modal para editar una opción */
    function openDialogEditOption(option: string, index: number) {
      // pasarle el valor al input
      dialog.value.editOption.text = option;
      // pasarle la posición donde se encuentra
      dialog.value.editOption.index = index;
      // abrir el modal
      dialog.value.editOption.open = true;
    }

    /** confirmar la edición de la opción */
    function editOption() {
      const { index, text } = dialog.value.editOption;
      if (form.value.question.options[index]) {
        form.value.question.options[index] = text;
        dialog.value.editOption.open = false;
      }
    }

    return {
      form,
      option,
      addOption,
      selectValues,
      dialog,
      openDialogEditOption,
      editOption
    };
  }
};
</script>

<style>
</style>