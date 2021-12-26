<template>
  <details
    open
    class="tw-mb-3 md:tw-mb-6 tw-pt-3"
  >
    <summary class="tw-cursor-pointer">
      <h2 class="tw-font-medium tw-text-center tw-text-sm tw-inline-block">Table of Contents</h2>
    </summary>

    <ul class="tw-mt-3 tw-pl-2 md:tw-border-l tw-text-xs tw-pb-4">
      <li
        v-for="heading in post.toc"
        :key="heading.id"
        class="tw-mb-2"
        :class="{'tw-pl-2': heading.depth === 3, 'tw-pl-4' : heading.depth === 4, 'tw-pl-6' : heading.depth === 5}"
      >
        <a
          :href="`#${heading.id}`"
          class="heading-link hover:tw-text-gray-700"
        >
          {{heading.text}}
        </a>
      </li>
    </ul>
  </details>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true
        },
    },
};
</script>

<style lang="scss" scoped>
.heading-link {
  @apply tw-no-underline tw-px-0.5 tw-py-0.5;
}
@each $theme-color in $theme-colors {
  .theme-#{$theme-color} {
    .heading-link {
      @apply hover:tw-bg-#{$theme-color}-50;
    }
  }
}
</style>