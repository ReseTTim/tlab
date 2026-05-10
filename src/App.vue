<template>
  <header class="header">
    <Search />
  </header>
  <SearchResults />
  <RouterView />
  <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
</template>

<script>
import Search from '@/components/search/search.vue';
import SearchResults from '@/components/search-results/search-results.vue';
// stores
import { useShowsStore } from '@/stores/shows';
import { useUIStore } from './stores/ui';

export default {
  name: 'App',
  created() {
    const store = useShowsStore();

    store.collectCache();
  },
  computed: {
    ui() {
      return useUIStore();
    },
    errorMessage() {
      return this.ui.errorMessage;
    },
  },
  components: {
    Search,
    SearchResults,
  },
};
</script>  

<style lang="scss">
  @use 'styles/app';

  .error-message {
    display: inline-block;
    background-color: var(--color-8);
    border-radius: var(--default-radius);
    color: var(--white);
    padding: var(--size-2);

    position: fixed;
    bottom: var(--size-3);
    right: var(--size-3);
  }
</style>