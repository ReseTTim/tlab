<template>
  <div :class="['rating', {'small': isSmall}]" v-if="roundedRating > 0" data-testid="rating">
    <div class="rating__container">
      <span class="sr-only">{{ $t("rating") }}: </span>
      <span class="rating__value">{{ roundedRating }}</span>
      <span class="sr-only">/ 10</span>
    </div>
    <div class="rating__label" v-if="!valueOnly" data-testid="rating-label">{{ $t(`rating.${roundedRating}`) }}</div>
  </div>
</template>

<script>
  export default {
    name: 'Rating',
    props: {
      value: {
        type: Number,
        required: true,
      },
      valueOnly: {
        type: Boolean,
        required: false,
        default: false,
      },
      isSmall: {
        type: Boolean,
        required: false,
        default: false,
      }
    },
    data() {
      return {
        roundedRating: Math.round(this.value),
      };
    },
  };
</script>

<style lang="scss" scoped>
  .rating {
    --rating-color: var(--color-4);
    --rating-container-padding: 0 var(--size-1);

    background-color: var(--gray-0);
    border: var(--border-size-1) solid var(--rating-color);
    border-radius: var(--default-radius);
    font-weight: var(--font-weight-7);

    display: inline-flex;
    flex-direction: row;
    align-items: center;
    
    overflow: hidden;
    width: fit-content;

    &:not(:has(.rating__label)) {
      border-color: transparent;
      background-color: transparent;
      border-radius: var(--radius-round);
    }

    &__container {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: var(--rating-color);
      color: var(--white);
      padding: var(--rating-container-padding);

      .rating:not(.small) & {
        font-size: var(--font-size-3);
        height: 2.5rem;
        width: 2.5rem;
      }
    }

    &__label {
      text-transform: uppercase;
      padding: 0 var(--size-3);

      .rating:not(.small) & {
        font-size: var(--font-size-0);
      }
    }
  }
</style>