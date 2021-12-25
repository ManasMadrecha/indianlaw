<template>
  <nav class="tw-flex tw-flex-wrap tw-justify-between tw-items-stretch md:tw-mb-6 tw-mb-3">
    <nuxt-link
      v-if="prev"
      :to="prev.path"
      class="tw-w-[40%] !tw-no-underline tw-bg-slate-50 tw-px-4 tw-py-2 hover:tw-translate-x-[-0.25rem]"
    >
      {{prev.title ? prev.title : prev.slug}}
    </nuxt-link>
    <nuxt-link
      v-if="next"
      :to="next.path"
      :class="{'tw-ml-auto' : this.prev == null}"
      class="tw-w-[40%] !tw-no-underline tw-bg-slate-50 tw-px-4 tw-py-2 hover:tw-translate-x-1"
    >
      {{next.title ? next.title : next.slug}}

    </nuxt-link>
  </nav>
</template>

<script>
export default {
    props: {
        prev: {
            type: Object,
        },
        next: {
            type: Object,
        }
    },
};
</script>

<style lang="scss" scoped>
</style>