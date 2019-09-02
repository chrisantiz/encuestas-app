import Vue from 'vue';
// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    // myOption?: string;
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    /** obtener un getter de Vuex */
    vuexGetter<T>(name: string, module?: string): T;
  }
  // interface VueConstructor<V extends Vue = Vue> {
  //   swal: any;
  // }
}
