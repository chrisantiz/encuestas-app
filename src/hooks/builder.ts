import { value } from 'vue-function-api';

export const useBuilder = () => {
  const name = value('Holias');
  const setName = (value: string) => (name.value = value);

  return { name, setName };
};
