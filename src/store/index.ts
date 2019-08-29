import Vue from 'vue';
import Vuex from 'vuex';

import builder from './modules/builder';

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      builder
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: (process.env.DEV as unknown) as boolean
  });

  return Store;
}
