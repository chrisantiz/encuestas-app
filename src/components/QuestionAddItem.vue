<template>
  <q-card class="bg-white" style="overflow: hidden;">
    <q-toolbar>
      <q-avatar>
        <q-icon name="add" />
      </q-avatar>

      <q-toolbar-title>
        <!-- personalizar el título -->
        {{ title }}
      </q-toolbar-title>

      <q-btn flat round dense icon="close" v-close-popup />
    </q-toolbar>

    <!-- contenido -->
    <q-card-section>
      <q-form ref="form">
        <div class="column q-gutter-md">
          <!-- información de la pregunta (y respuesta) padre -->
          <div
            v-if="$props.type === 'child'"
            class="col bg-teal-1 border-radius"
          >
            <p class="text-center text-body1 text-weight-light">
              Pregunta padre
            </p>
            <p class="text-center text-body2 q-my-none">
              {{ $props.questionParent.question }}
            </p>
            <p class="text-center text-weight-light">
              {{ $props.questionParent.answer }}
            </p>
          </div>
          <div class="col">
            <q-input
              v-model="form.question.title"
              autofocus
              autogrow
              label="Ingrese la pregunta a realizar"
              :rules="[v => !!v || 'Campo obligatorio']"
            />
          </div>
          <div class="col">
            <q-input
              v-model="option"
              label="Opciones para responder la pregunta"
              hint="Digite una opción seguida de «enter» para agregarla"
              @keydown.enter.prevent="addOption($event)"
              autogrow
              :rules="[validateOptions]"
            />
          </div>
          <!-- opciones añadidas -->
          <div class="col q-mt-md" v-if="form.question.options.length">
            <q-list bordered>
              <transition-group appear name="lightSpeed">
                <q-item
                  dense
                  v-ripple
                  v-for="(option, index) in form.question.options"
                  :key="index"
                  :class="{
                    'border-bottom': index + 1 !== form.question.options.length
                  }"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-overline text-grey-8 text-weight-light"
                      >Opción #{{ index + 1 }}</q-item-label
                    >
                    <q-item-label
                      caption
                      lines="2"
                      class="text-grey-9"
                      style="font-size: 14px;"
                      >{{ option }}</q-item-label
                    >
                  </q-item-section>

                  <!-- acciones a ejecutar en las opciones -->
                  <!-- añadir hijo (solo en preguntas no filtrables) -->
                  <q-item-section side top v-if="$props.type === 'default'">
                    <q-item-label caption>
                      <q-btn
                        flat
                        icon="add"
                        round
                        size="sm"
                        color="teal"
                        @click="$emit('addchild')"
                      >
                        <q-tooltip>Añadir pregunta hija</q-tooltip>
                      </q-btn>
                    </q-item-label>
                  </q-item-section>
                  <!-- editar -->
                  <q-item-section side top style="padding-left: 0;">
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
                  <!-- fin acciones a ejecutar en las opciones -->
                </q-item>
              </transition-group>
            </q-list>
          </div>
          <!-- fin opciones añadidas -->
        </div>
      </q-form>
    </q-card-section>
    <!-- fin contenido -->

    <q-card-section>
      <q-btn
        label="Agregar"
        icon="add_circle_outline"
        @click="onClickAddItem"
      />
    </q-card-section>

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
  </q-card>
</template>

<script lang="ts">
import { value, onCreated, PropType, computed } from 'vue-function-api';
import { Context } from 'vue-function-api/dist/types/vue';
import {
  Form,
  QuestionAddDialog,
  QuestionAddProps,
  PropsQuestionAdd
} from '../types/components/question-add-item.interface';
import { PropValidator, RecordPropsDefinition } from 'vue/types/options';

export default {
  props: {
    type: { type: String, required: true },
    questionParent: { type: Object, required: false }
  },
  setup(props: any, ctx: Context) {
    /* ------------ state --------- */
    /** propiedades de una nueva pregunta */
    const form = value<Form>({
      question: { title: '', options: [] }
    });
    /* opción digitada por el usuario */
    const option = value('');
    // dialog
    const dialog = value<QuestionAddDialog>({
      parent: false,
      editOption: { open: false, text: '', index: -1 },
      deleteOption: false
    });

    /* ------------ computed --------- */
    const title = computed(() => {
      let str = '';
      switch ((props as PropsQuestionAdd).type) {
        case 'filter':
          str = 'filtrable';
          break;

        case 'default':
          str = 'encuesta';
          break;

        case 'child':
          str = 'hija';
          break;
      }

      return `Agregar nueva pregunta (${str})`;
    });

    /* ----------- cycle life ------- */

    /* ----------- methods --------- */
    /** validar que se hayan ingresado opciones */
    function validateOptions(value: string) {
      return (
        form.value.question.options.length > 1 ||
        'Debe añadir por lo menos 2 opciones por pregunta'
      );
    }
    /** evento click al guardar un ítem */
    async function onClickAddItem() {
      const success = await (ctx.refs.form as any).validate();
      if (!success) return;

      switch ((props as PropsQuestionAdd).type) {
        case 'filter':
          break;

        case 'default':
          break;

        case 'child':
          break;
      }
    }
    /** añadir una nueva opción */
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
      dialog,
      openDialogOptionAction,
      actionOption,
      title,
      onClickAddItem,
      validateOptions
    };
  }
};
</script>

<style lang="stylus" scoped>
.border-bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.border-radius {
  border-radius: 5px;
}
</style>