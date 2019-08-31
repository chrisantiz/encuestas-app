/** inyectar estado en mutaciones */
export interface InjectMutationState<T> {
  [key: string]: Mutation<T>;
}
/** inyectar estado en getters */
export interface InjectGetterState<T> {
  [key: string]: Getter<T>;
}

export type Mutation<T> = (state: T, payload: any) => void;
export type Getter<T> = (state: T) => void;