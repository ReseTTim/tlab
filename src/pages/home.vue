<template>
  <main class="home">    
    <Shows v-for="(genre, index) in genres" :key="genre"
      :title="`\ ${translateGenre(genre)}`"
      :shows="store.byGenre(genre)">
      <h1 v-if="index === 0">{{ $t("home.showsByGenre")  }}</h1>
    </Shows>
  </main>
</template>

<script>
  import Shows from '@/components/shows/shows.vue';

  import { useShowsStore } from '@/stores/shows';

  export default {
    name: 'PageHome',
    computed: {
      store () {
        return useShowsStore();
      },
      shows () {
        return this.store.shows || [];
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