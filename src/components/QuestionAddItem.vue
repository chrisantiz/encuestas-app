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
              <q-item-label class="text-overline text-weight-light"
                >Opción #{{ index + 1 }}</q-item-label
              >
              <q-item-label
                caption
                lines="2"
                class="text-body1 text-weight-bold"
                >{{ option }}</q-item-label
              >
            </q-item-section>

            <!-- acciones a ejecutar en las opciones -->
            <!-- editar -->
            <q-item-section side top>
              <q-item-label caption>
                <q-btn
                  flat
                  icon="edit"
                  round
                  size="sm"
                  color="teal"
                  @click="openDialogOptionAction(option, index, 'edit')"
                >
                  <q-tooltip>Editar opción</q-tooltip>
                </q-btn>
              </q-item-label>
            </q-item-section>
            <!-- eliminar -->
            <q-item-section side top style="padding-left: 0;">
              <q-item-label caption>
                <q-btn
                  flat
                  icon="delete"
                  color="red"
                  round
                  size="sm"
                  @click="openDialogOptionAction(option, index, 'delete')"
                >
                  <q-tooltip>Eliminar opción</q-tooltip>
                </q-btn>
              </q-item-label>
            </q-item-section>
            <!-- acciones a ejecutar en las opciones -->
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
            <q-input
              dense
              v-model="dialog.editOption.text"
              autofocus
              @keyup.enter="actionOption('edit')"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancelar" v-close-popup />
            <q-btn flat label="Confirmar" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- diálogo para eliminar una opción -->
      <q-dialog v-model="dialog.deleteOption" persistent>
        <q-card>
          <q-card-section class="row items-center">
            <q-avatar icon="delete" color="primary" text-color="white" />
            <span class="q-ml-sm"
              >¿Está seguro de eliminar la opción actual?</span
            >
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              flat
              label="Eliminar"
              color="red"
              @click="actionOption('delete')"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-form>
  </section>
</template>

<script lang="ts">
import { value } from 'vue-function-api';
import { Context } from 'vue-function-api/dist/types/vue';
import {
  Form,
  QuestionAddDialog
} from '../types/components/question-add-item.interface';

export default {
  props: {
    type: { type: String, required: true }
  },
  setup(props: any, ctx: Context) {
    /* ------------ state --------- */
    /** propiedades de una nueva pregunta */
    const form = value<Form>({
      question: { title: '', options: [] },
      htmlElement: ''
    });
    /* opción digitada por el usuario */
    const option = value('');
    /** valores del select «elemento HTML» */
    const selectValues = value<string[]>(['Select', 'Radio']);
    // dialog
    const dialog = value<QuestionAddDialog>({
      editOption: { open: false, text: '', index: -1 },
      deleteOption: false
    });

    /* ----------- methods --------- */
    function addOption(e: KeyboardEvent) {
      e.preventDefault();
      const { options } = form.value.question;
      if (option.value && !options.includes(option.value)) {
        form.value.question.options.push(option.value);
        option.value = '';
      }
    }

    /** abrir modal para editar una opción */
    function openDialogOptionAction(
      option: string,
      index: number,
      action: 'delete' | 'edit'
    ) {
      // pasarle el valor al input
      dialog.value.editOption.text = option;
      // pasarle la posición donde se encuentra
      dialog.value.editOption.index = index;
      // abrir el modal correspondiente
      if (action === 'edit') {
        dialog.value.editOption.open = true;
      } else {
        dialog.value.deleteOption = true;
      }
    }

    /** confirmar la edición de la opción */
    function actionOption(action: 'delete' | 'edit') {
      const { index, text } = dialog.value.editOption;
      // siempre y cuando se encuentre
      if (!form.value.question.options[index]) return;

      if (action === 'edit') {
        form.value.question.options[index] = text;
        dialog.value.editOption.open = false;
      } else {
        // eliminar
        form.value.question.options.splice(index, 1);
        // cerrar modal
        dialog.value.deleteOption = false;
      }
    }

    return {
      form,
      option,
      addOption,
      selectValues,
      dialog,
      openDialogOptionAction,
      actionOption
    };
  }
};
</script>

<style>
</style>