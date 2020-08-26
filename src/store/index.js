import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from "vuex-persistedstate";

// import example from './module-example'
import firedata from './firedata'


Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      firedata
    },
     // plugins: [createPersistedState()],


    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: true // process.env.DEV
  })

  return Store
}
