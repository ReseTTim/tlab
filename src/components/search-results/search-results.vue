<template>
  <div class="search-results" v-if="hasValidSearchTerm">
    <div v-if="isLoading" class="container search-results__container">
      <p>{{ $t('results.loading')}}&hellip;</p>
    </div>

    <Shows v-else-if="searchResults.length > 0"
      :shows="searchResults">
      <h2>{{ `${$t('results.header')} (${searchResults.length})` }}</h2>
      <h3>{{ `${$t('results.subheader')} '${searchTerm}'` }}</h3>
    </Shows>

    <div class="container search-results__container" v-else>
      <h2>{{ `${$t('results.header')} (${searchResults.length})` }}</h2>
      <p>{{ $t('results.no-results') }}</p>
    </div>

    <button class="search-results__close" :aria-label="$t('close')"
        @click.prevent="close">&times;</button>
  </div>
</template>

<script>
  import Shows from '@/components/shows/shows.vue';
  
  // stores
  import { useUIStore } from '@/stores/ui';
  import { useShowsStore } from '@/stores/shows';

  export default {
    name: 'SearchResults',
    watch: {
      hasValidSearchTerm(newVal) {
        if (newVal) {
          window.addEventListener('keydown', this.onEscape);
          return;
        }

        window.removeEventListener('keydown', this.onEscape);
      },
    },
    computed: {
      ui () {
        return useUIStore();
      },
      store () {
        return useShowsStore();
      },
      hasValidSearchTerm () {
        return this.ui.hasValidSearchTerm || false;
      },
      searchResults () {
        return this.store.results;
      },
      isLoading () {
        return this.store.isLoading || false;
      },
      searchTerm () {
        return this.hasValidSearchTerm ? this.ui.searchTerm : '';
      },
    },
    methods: {
      onEscape (event) {
        if (event.key === 'Escape') {
          this.close();
        }
      },
      close () {
        this.ui.searchTerm = '';
        this.store.results = [];
      },
    },
    components: {
      Shows,
    }
  }
</script>


<style lang="scss" scoped>
  .search-results {
    --border-height: 12px;

    background-color: var(--white);
    margin: var(--size-4) 0;
    padding: var(--border-height) 0;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;

      left: 0;
      top: 0;

      width: 100%;
      height: var(--border-height);

      background: repeating-linear-gradient(
        45deg,
        transparent 0 6px,
        var(--black) 6px 8px
      );
    }

    &::after {
      top: auto;
      bottom: 0;

      background: repeating-linear-gradient(
        -45deg,
        transparent 0 6px,
        var(--black) 6px 8px
      );
    }

    &__container {
      padding-top: var(--size-4);
    }

    &__close {
      font-size: var(--font-size-8);

      position: absolute;
      right: var(--size-6);
      top: 0;
    }
  }
</style>