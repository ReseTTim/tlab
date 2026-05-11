<template>
  <main class="home">    
    <Shows v-for="(genre, index) in genres" :key="genre"
      :title="`\ ${translateGenre(genre)}`"
      :shows="store.byGenre(genre)">
      <template v-if="index === 0">
        <h1>{{ $t("home.showsByGenre")  }}</h1>

        <div class="sorting">
          <label class="sr-only">{{ $t('sort-by.label') }}</label>
          <button v-for="(sortMethod, index) in sorters"
            :key="`sort-${index}`"
            :class="['btn', `btn--${(sortMethod === sortBy ? 'primary': 'secondary')}`]"
            @click="store.updateSortBy(sortMethod)">
            {{ $t(`sort-by.${sortMethod}`) }}
          </button>
        </div>
      </template>
    </Shows>
  </main>
</template>

<script>
  import Shows from '@/components/shows/shows.vue';
  import { SORTERS } from '@/helpers/showHelper';

  import { useShowsStore } from '@/stores/shows';

  export default {
    name: 'PageHome',
    data() {
      return {
        sorters: Object.keys(SORTERS)
      }
    },
    computed: {
      store () {
        return useShowsStore();
      },
      shows () {
        return this.store.shows || [];
      },
      sortBy () {
        return this.store.sortBy || 'highestRating';
      },
      genres () {
        return this.store.genres || [];
      },
    },
    mounted() {
      if (!this.store.shows.length) {
        this.store.loadInitialShows();
      }
    },
    methods: {
      translateGenre (genre) {
        return this.$t(`genre.${genre.toLowerCase()}`);
      },
    },
    components: {
      Shows,
    },     
  };
</script>

<style>
  .sorting {
    display: flex;
    width: 100%;
    gap: var(--size-2);
    margin-bottom: var(--size-4);
    justify-content: flex-start;
    flex-wrap: wrap;
  }
</style>