<template>
  <div class="show">
    <div v-if="currentShow"
      class="container show__container">
      <h1>{{ currentShow.name }}</h1>
      <Rating v-if="currentShow.rating?.average" :value="currentShow.rating.average" />

      <div class="show__layout">
        <main>
          <div class="show__summary" v-html="currentShow.summary"></div>
          <figure v-if="currentShow?.image"
            class="show__cover">
            <img 
              :src="currentShow.image.medium"
              :srcset="`
                ${currentShow.image.medium} 210w,
                ${currentShow.image.original} 680w
              `"
              sizes="(min-width: 768px) 50vw, 100vw" />
          </figure>
        </main>
        <aside>
          <ShowInfo 
              :title="$t('show.showInfo')"
              :content="showMetadata" />
        </aside>
      </div>
    </div>

    <Shows v-if="showsWithSameGenre.length > 0"
        :title="$t('show.alternateShows')"
        :shows="showsWithSameGenre" />
    
    <footer class="footer">
      <div class="container">
        <router-link class="btn btn--secondary" :to="{ name: 'home'}">&#10094; {{ $t('show.back') }}</router-link> 
      </div>
    </footer>
  </div>
</template>

<script>
import Rating from '@/components/rating/rating.vue';
import Shows from '@/components/shows/shows.vue';
import ShowInfo from '@/components/show-info/show-info.vue';

import { useShowsStore } from '@/stores/shows';

export default {
  name: 'PageShow',
  watch: {
    showId: {
      handler: async function (id) {
        if (!id) return

        const showId = Number(id);
        if (isNaN(showId)) {
          this.$router.push({ name: 'not-found' });
        }

        if (!this.store.currentShow(showId)) {
          await this.store.getSingleShowById(showId);
        }
      },
      immediate: true
    },
  },
  computed: {
    currentShow() {
      return this.store.currentShow(this.showId) || false;
    },
    store() {
      return useShowsStore();
    },
    showId() {
      const id = Number(this.$route.params.id);
      if (isNaN(id)) {
        this.$router.push({ name: 'not-found' });
      }

      return id;
    },
    showsWithSameGenre () {
      return this.store.showsWithSameGenre(this.currentShow);
    },
    showMetadata () {
      const { genres, language, type, officialSite } = this.currentShow;

      return {
        genres,
        language,
        type,
        officialSite,
      }
    }
  },
  components: {
    Rating,
    Shows,
    ShowInfo,
  },
}
</script>

<style lang="scss">  
  .show {
    &__layout {
      display: grid;
      gap: var(--size-6);

      @media (min-width: $breakpoint-lg) {
        grid-template-columns: 1fr 320px;
      }

      @media (min-width: $breakpoint-sm) {
        main {
          display: grid;
          gap: var(--size-4);
          grid-template-columns: 200px 1fr;
        }
      }
    }

    &__cover {
      @media (min-width: $breakpoint-sm) {
        order: -1;
      }

      img {
        width: 100%;
        display: block;
        object-fit: cover;
        object-position: center;
      }
    }

    &__container {
      display: flex;
      flex-direction: column;
      gap: var(--size-3);
      padding-top: var(--size-6);
      padding-bottom: var(--size-6);
    }
  }
</style>