import { InjectGetterState } from '../../../types/vuex/inject-state.interface';
import {
  StateBuilderModule,
  PersonalQuestion,
} from '../../../types/vuex/builder-module.interface';

export const getters: InjectGetterState<StateBuilderModule> = {
  /** obtener la pregunta hija trabajada actualmente */
  getChildItem(state): PersonalQuestion | null {
    return state.itemChild;
  },
};
