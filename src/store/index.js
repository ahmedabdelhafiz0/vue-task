import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingOverlay: false
  },
  getters: {
    getLoadingStatus(state) {
      return state.loadingOverlay;
    }
  },
  mutations: {
    toggleLoading(state) {
      state.loadingOverlay = !state.loadingOverlay;
    }
  },
  actions: {
    toogleLoading({commit}) {
      commit("toggleLoading");
    }
  },
  modules: {}
});
