<template>
  <article class="show-card">
    <router-link class="show-card__link"
      :to="{ name: 'show', params: { id: id } }"
      data-testid="link">
      <span class="sr-only">{{ `${$t('visit')}: ${name}` }}</span>
    </router-link>
    <figure class="show-card__cover" data-testid="cover">
      <img :src="image?.medium" :alt="name" />
    </figure>
    <Rating v-if="rating?.average" :value="rating.average" valueOnly isSmall  />
  </article>
</template>

<script>
import Rating from '@/components/rating/rating.vue';

export default {
  name: 'ShowCard',
  props: {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
    genres: {
      type: Array,
      required: false,
    },
    rating: {
      type: Object,
      required: false,
    },
    image: {
      type: Object,
      required: false,
    },
  },
  components: {
    Rating,
  },
}
</script>

<style lang="scss" scoped>
  .show-card {
    width: var(--showcard-width);
    padding: 0 var(--size-px-1);
    box-shadow: var(--shadow-2);
    position: relative;

    &__link {
      background-color: var(--white);
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      transition: background-color 0.3s ease;
      opacity: 0;

      &:focus,
      &:hover {
        opacity: 0.3;
      }
    }
    
    &__cover {
      width: 100%;

      img {
        width: 100%;
      }
    }

    .rating {
      --rating-color: var(--color-7);
      --rating-container-padding: var(--size-px-1) var(--size-px-2);

      position: absolute;
      right: 0;
      top: var(--size-1);
    }
  }
</style>