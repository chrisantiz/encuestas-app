/** genérico para uso del estado de Vuex */
export type State<T> = { [P in keyof T]: T[P] };
