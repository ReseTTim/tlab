<template>
  <div class="show-info">
    <h3>{{ title }}</h3>
    <dl>
      <template v-for="(value, subject) in content" :key="`item-subject`">
        <template v-if="subject === 'officialSite' && value !== null">
          <dt>{{ $t(`show-info.${subject}`) }}</dt>
          <dd>
            <a :href="subject" target="_blank" rel="noopener noreferrer">{{ $t('show-info.visitOfficialPage') }} </a>
          </dd>
        </template>
        <template v-else-if="subject === 'genres' && value !== null">
          <dt>{{ $t(`show-info.${subject}`) }}</dt>
          <dd>{{ value.join(', ') }}</dd>
        </template>
        <template v-else-if="value">
          <dt>{{ $t(`show-info.${subject}`) }}</dt>
          <dd>{{ value }}</dd>
        </template>
      </template>
    </dl>
  </div>
</template>

<script>
  export default {
    name: 'ShowInfo',
    props: {
      title: {
        type: String,
        required: true, 
      },
      content: {
        type: Object,
        required: false,
      },
    },
  }
</script>

<style lang="scss" scoped>
.show-info {
  background-color: var(--stone-3);
  padding: var(--size-3);

  dl {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--size-2) var(--size-3);
  }
}
</style>