<template>
  <q-card class="bg-white" style="overflow-x: hidden;">
    <q-toolbar class="bg-primary text-white">
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
            v-if="$props.type === 'child' && $props.questionParent"
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
              v-model="form.question"
              autofocus
              autogrow
              label="Ingrese la pregunta a realizar"
              :rules="[v => !!v || 'Campo obligatorio']"
            />
          </div>
          <div class="col">
            <q-input
              v-model="optionLabel"
              label="Opciones para responder la pregunta"
              hint="Digite una opción seguida de «enter» para agregarla"
              @keydown.enter.prevent="
                addOption($event, {
                  id: optionId,
                  label: optionLabel,
                  count: 0,
                  children: [],
                })
              "
              autogrow
              :rules="[validateOptions]"
            />
          </div>
          <!-- opciones añadidas -->
          <div class="col q-mt-md" v-if="form.options.length">
            <q-list>
              <transition-group appear name="lightSpeed">
                <q-item
                  dense
                  v-for="(option, index) in form.options"
                  :key="index"
                  :class="{
                    'border-bottom': index + 1 !== form.options.length,
                  }"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-overline text-grey-8 text-weight-light"
                      >Opción #{{ index + 1 }}
                      <span v-if="index === 0" class="text-weight-bold"
                        >Respuesta personalizada</span
                      ></q-item-label
                    >
                    <q-item-label
                      caption
                      lines="2"
                      class="text-grey-9"
                      style="font-size: 14px;"
                      >{{ option.label }}
                    </q-item-label>
                  </q-item-section>

                  <!-- acciones a ejecutar en las opciones -->
                  <q-item-section side>
                    <q-btn-group flat>
                      <!-- respuesta personalizada (última opción) -->
                      <q-btn
                        v-if="
                          $props.type === 'default' &&
                            index + 1 === form.options.length
                        "
                        icon="insert_comment"
                        size="sm"
                        class="q-px-sm text-blue"
                        color="blue-1"
                        @click="addCustomAnswer"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          content-style="font-size: 12px"
                          content-class="bg-blue"
                          >Respuesta personalizada</q-tooltip
                        >
                      </q-btn>
                      <!-- añadir hijo (solo en preguntas no filtrables) -->
                      <q-btn
                        v-if="$props.type === 'default'"
                        icon="add"
                        size="sm"
                        class="q-px-sm text-orange"
                        color="orange-1"
                        @click="addChildren(index, option.label)"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          content-style="font-size: 12px"
                          content-class="bg-orange"
                          >Añadir pregunta hija</q-tooltip
                        >
                      </q-btn>
                      <!-- editar -->
                      <q-btn
                        icon="edit"
                        size="sm"
                        class="q-px-sm text-teal"
                        color="teal-1"
                        @click="openDialogOptionAction(option, index, 'edit')"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          content-style="font-size: 12px"
                          content-class="bg-teal"
                          >Editar opción</q-tooltip
                        >
                      </q-btn>
                      <!-- eliminar -->
                      <q-btn
                        icon="delete"
                        size="sm"
                        class="q-px-sm text-red"
                        color="red-1"
                        @click="openDialogOptionAction(option, index, 'delete')"
                      >
                        <q-tooltip
                          anchor="top middle"
                          self="bottom middle"
                          :offset="[10, 10]"
                          content-style="font-size: 12px"
                          content-class="bg-red"
                          >Eliminar opción</q-tooltip
                        >
                      </q-btn>
                    </q-btn-group>
                    <!-- fin acciones a ejecutar en las opciones -->
                  </q-item-section>
                </q-item>
              </transition-group>
            </q-list>
          </div>
          <!-- fin opciones añadidas -->
        </div>
      </q-form>
    </q-card-section>
    <!-- fin contenido -->

    <pre>{{ form }}</pre>

    <q-card-section class="bg-blue-1 q-pa-none q-mt-xs">
      <div class="row justify-between">
        <div class="col">
          <q-btn
            label="confirmar"
            flat
            @click="onClickAddItem"
            v-close-popup="closeDialog"
          >
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
              content-style="font-size:12px;"
              >Añadir pregunta actual a la encuesta</q-tooltip
            >
          </q-btn>
        </div>
        <div class="col text-right">
          <q-btn icon="visibility" flat @click="onClickAddItem">
            <q-tooltip
              anchor="top middle"
              self="bottom middle"
              :offset="[10, 10]"
              content-style="font-size:12px;"
              >Previsualizar</q-tooltip
            >
          </q-btn>
        </div>
      </div>
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
import { value, onCreated, PropType, computed, watch } from 'vue-function-api';
import { Context } from 'vue-function-api/dist/types/vue';
import {
  Form,
  QuestionAddDialog,
  QuestionAddProps,
  PropsQuestionAdd,
  QuestionParent,
} from '../types/components/question-add-item.interface';
import { PropValidator, RecordPropsDefinition } from 'vue/types/options';
import {
  PollData,
  Question,
  OptionChildren,
  QuestionChild,
} from '../types/vuex/builder-module.interface';

export default {
  props: {
    type: { type: String, required: true },
    questionParent: { type: Object, required: false },
  },
  // { refs, emit, root: { vuexGetter, $store } }
  setup(props: any, ctx: Context) {
    /* ------------ state --------- */
    /** propiedades de una nueva pregunta */
    const form = value<Question>({
      id: 0,
      question: '',
      options: [],
      others: [],
    });

    /* opción digitada por el usuario */
    const optionLabel = value('');

    // dialog
    const dialog = value<QuestionAddDialog>({
      parent: false,
      editOption: { open: false, text: '', index: -1 },
      deleteOption: false,
    });

    /** cerrar dialog (HIJA) */
    const closeDialog = value(false);

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

    /** colocar un id autoincrementable a cada opción añadida */
    const optionId = computed(() => form.value.options.length + 1);

    /** pregunta hija agregada (HIJA) */
    const itemChild = computed(
      () =>
        ctx.root.vuexGetter<QuestionChild>('builder/getItemChild'),
    );

    /** --------- watchers --------- */
    // HIJA
    watch(
      () => itemChild.value,
      (newVal, oldval) => {
        if ((props as PropsQuestionAdd).type === 'default' && newVal) {
          // agregar hijo a la opción espeficicada

          // la propiedad ID es el índice de la opción a la cual añadir hijo
          const { id: index } = newVal;

          // si no se encuentra la opción impedir que continúe
          if (!form.value.options[index]) return;

          // nuevo ID a asignar a la pregunta
          const increment = form.value.options[index].children.length + 1;

          // agregar
          form.value.options[index].children.push({ ...newVal, id: increment });
          // eliminar el hijo recibido
          ctx.root.$store.commit('builder/CLEAR_ITEM_CHILD');
        }
      },
    );

    /* ----------- cycle life ------- */
    onCreated(() => {});

    /* ----------- methods --------- */
    /** añadir respuesta personalizada (solo en la última opción) */
    function addCustomAnswer() {
      console.log('¡AÑADIR RESPUESTA PERSONALZADA!');
    }
    /** agregar preguntas hijas (evento) */
    function addChildren(index: number, answer: string) {
      const question: QuestionParent = {
        index,
        question: form.value.question,
        answer,
      };
      // emitir evento
      ctx.emit('addchild', question);
    }

    /** validar que se hayan ingresado opciones */
    function validateOptions(value: string) {
      return (
        form.value.options.length > 1 ||
        'Debe añadir por lo menos 2 opciones por pregunta'
      );
    }
    /** evento click al guardar un ítem */
    async function onClickAddItem() {
      // validar el formulario
      const success = await (ctx.refs.form as any).validate();
      if (!success) return;

      switch ((props as PropsQuestionAdd).type) {
        case 'filter':
          break;

        case 'default':
          break;

        case 'child':
          console.log('Entró');
          const child: QuestionChild = {
            // ID será el índice de la opción padre
            id: (props.questionParent as QuestionParent).index,
            question: form.value.question,
            count: 0,
            options: form.value.options,
          };
          ctx.root.$store.commit('builder/SET_ITEM_CHILD', child);
          closeDialog.value = true;
          break;
      }
    }
    /** añadir una nueva opción */
    function addOption(e: KeyboardEvent, option: OptionChildren) {
      e.preventDefault();
      console.log(option);
      const { options } = form.value;
      console.log(options);
      if (
        optionLabel.value &&
        !options.some(
          val => val.label.toLowerCase() === option.label.toLowerCase(),
        )
      ) {
        form.value.options.push(option);
        // borrar lo escrito
        optionLabel.value = '';
      }
    }

    /** abrir modal para editar una opción */
    function openDialogOptionAction(
      option: string,
      index: number,
      action: 'delete' | 'edit',
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
      if (!form.value.options[index]) return;

      if (action === 'edit') {
        form.value.options[index].label = text;
        dialog.value.editOption.open = false;
      } else {
        // eliminar
        form.value.options.splice(index, 1);
        // cerrar modal
        dialog.value.deleteOption = false;
      }
    }

    return {
      form,
      optionLabel,
      addOption,
      dialog,
      openDialogOptionAction,
      actionOption,
      title,
      onClickAddItem,
      validateOptions,
      addChildren,
      addCustomAnswer,
      optionId,
      closeDialog,
      itemChild,
    };
  },
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