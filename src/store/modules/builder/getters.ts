import { InjectGetterState } from '../../../types/vuex/inject-state.interface';
import {
  StateBuilderModule,
  QuestionChild,
} from '../../../types/vuex/builder-module.interface';

export const getters: InjectGetterState<StateBuilderModule> = {
  /** obtener la pregunta hija trabajada actualmente */
  getItemChild(state): QuestionChild | null {
    return state.itemChild;
  },
};
