import {
  StateBuilderModule,
  QuestionChild,
} from '../../../types/vuex/builder-module.interface';
import { InjectMutationState } from 'src/types/vuex/inject-state.interface';

export const mutations: InjectMutationState<StateBuilderModule> = {
  /** agregar pregunta hija */
  SET_ITEM_CHILD(state, payload: QuestionChild) {
    state.itemChild = payload;
  },
  /** eliminar pregunta hija */
  CLEAR_ITEM_CHILD(state) {
    state.itemChild = null;
  },
};
