<template>
  <section class="shows">
    <div class="container">
      <slot></slot>
      <h2 v-if="title" class="shows__title">{{ title }} ({{ shows.length }})</h2>
    </div>
    <div class="shows__container" 
      @mouseleave="() => cardTitle = null">
      <ul class="shows__list list-unstyled" ref="showsRef">
        <li v-for="show in shows" :key="show.id"
          class="shows__item"
          data-testid="show-item">
          <ShowCard v-bind="show"
            @mouseover="() => cardTitle = show.name" />
        </li>
      </ul>
      <div class="shows__tools container">
        <div class="h1">{{ cardTitle }}</div>
        <div class="shows__navigation" v-if="navigationVisible">
          <button class="shows__navigation-left btn btn--primary" 
            @click.prevent="scrollLeft"
            :aria-label="$t('shows.navigation-left-btn')">&#10094;</button>
          <button class="shows__navigation-right btn btn--primary" 
            @click.prevent="scrollRight"
            :aria-label="$t('shows.navigation-right-btn')">&#10095;</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ShowCard from '@/components/show-card/show-card.vue';

export default {
  name: 'Shows',
  props: {
    title: {
      type: String,
      required: false,
    },
    shows: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      navigationVisible: false,
      cardTitle: null,
    }
  },
  methods: {
    checkNavigation () {
      try {
        const el = this.$refs.showsRef;

        this.navigationVisible = el.scrollWidth > el.clientWidth;
      } catch (_e) {
        this.navigationVisible = false;
      }
    },
    scrollLeft () {
      this.$refs.showsRef.scrollBy({
        left: -300,
        behavior: 'smooth',
      })
    },
    scrollRight () {
      this.$refs.showsRef.scrollBy({
        left: 300,
        behavior: 'smooth',
      })
    },
  },
  mounted() {
    this.checkNavigation()

    window.addEventListener('resize', this.checkNavigation)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.checkNavigation)
  },
  components: {
    ShowCard,
  },
};
</script>

<style lang="scss" scoped>
  .shows {
    padding: var(--size-6) 0 var(--size-8);
    overflow-x: hidden;

    &:nth-child(even) {
      background-color: var(--stone-2);
    }

    &__container {
      overflow: hidden;
      width: 100%;
      position: relative;
    }

    &__list {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      max-width: 100%; 
      width: fit-content;
      scroll-snap-type: x mandatory;
    }

    &__item {
      flex: 0 0 auto;
      scroll-snap-align: end;
      width: var(--showcard-width);
    }

    &__tools {
      display: flex;
      padding-top: var(--size-4);
      justify-content: space-between;

      min-height: var(--size-px-10);
    }

    &__navigation {
      display: inline-flex;
      gap: var(--size-1);
      height: fit-content;
    }
  }
</style>