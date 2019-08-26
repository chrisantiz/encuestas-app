import axios from 'axios';

export default async ({ Vue }: any) => {
  Vue.prototype.$axios = axios;
};
