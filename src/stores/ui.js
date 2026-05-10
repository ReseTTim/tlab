import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', {
  state: () => ({
    errorMessage: null,
    errorTimeout: null,
    isLoading: false,
    searchTerm: '',
  }),
  getters: {
    hasValidSearchTerm: (state) => {
      return state.searchTerm !== null && state.searchTerm.length >= 3;
    },
  },
  actions: {
    setLoading(loading) {
      this.isLoading = loading;
    },
    setSearchTerm(term) {
      this.searchTerm = encodeURIComponent(term.toLowerCase());
    },
    clearSearchTerm () {
      this.searchTerm = '';
    },
    setErrorMessage (message) {
      this.errorMessage = message;

      if (this.errorTimeout) {
        clearTimeout(this.errorTimeout);
      }

      this.errorTimeout = setTimeout(() => {
        this.errorMessage = null;
        this.errorTimeout = null;
      }, 3000); // show error message for only 3 seconds
    },
  },
});
