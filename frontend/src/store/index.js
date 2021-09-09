import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// eslint-disable-next-line no-unused-vars
import Api from '../services/api'
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
      allClients: [],
      allProviders: [],
      allClientDataLoading: false
  },
  mutations: {
      SET_ALL_CLIENTS_IN_STATE (state, data) {
          state.allClients = data
      },
      SET_ALL_PROVIDERS_IN_STATE (state, data) {
          state.allProviders = data
      },
      SET_ALL_CLIENTS_DATA_LOADING_IN_STATE (state, data) {
          state.allClientDataLoading = data
      },
  },
  actions: {
      getAllClients ({ commit }) {
          commit('SET_ALL_CLIENTS_DATA_LOADING_IN_STATE', true)
          Api().get('client/all').then((response) => {
              commit('SET_ALL_CLIENTS_IN_STATE', response.data.clients)
              commit('SET_ALL_CLIENTS_DATA_LOADING_IN_STATE', true)
          }).catch((error) => {
              console.log(error)
          })
      },
      getAllProviders ({ commit }) {
          Api().get('provider/all').then((response) => {
              commit('SET_ALL_PROVIDERS_IN_STATE', response.data.providers)
          }).catch((error) => {
              console.log(error)
          })
      },
  },
  modules: {},
});
