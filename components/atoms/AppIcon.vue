<template>
  <svg
    viewBox="0 0 24 24"
    v-if="iconPath"
    class="tw-inline tw-fill-current"
  >
    <path :d="iconPath"></path>
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconPath() {
      return require("@mdi/js")[this.icon];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>