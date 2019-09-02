import { VueConstructor } from 'vue';

export default ({ Vue, app: { store } }: { Vue: VueConstructor; app: any }) => {
  Vue.prototype.vuexGetter = <T>(name: string, module?: string) => {
    const str = module ? `${module}/${name}` : name;
    return store.getters[str];
  };
};
