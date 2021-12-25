<template>
  <div class="header-container">
    <div>
      <nuxt-link to="/">Indian Law</nuxt-link>
    </div>
    <div class="tw-flex tw-justify-start tw-items-center tw-gap-4">
      <nuxt-link to="/central">Central Law</nuxt-link>
      <nuxt-link to="/state">State Law</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header-container {
  @apply tw-flex tw-justify-around tw-items-center tw-bg-gradient-to-br tw-from-white tw-h-12;
}

@each $theme-color in $theme-colors {
  .theme-#{$theme-color} {
    .header-container {
      @apply tw-to-#{$theme-color}-50; 
    }
  }
}
</style>
