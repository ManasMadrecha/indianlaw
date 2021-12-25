<template>
  <header class="header-container tw-flex tw-justify-around tw-items-center tw-bg-gradient-to-br tw-from-white tw-h-12">
    <div>
      <nuxt-link to="/">Indian Law</nuxt-link>
    </div>
    <div class="tw-flex tw-justify-start tw-items-center tw-gap-4">
      <nuxt-link to="/central">Central Law</nuxt-link>
      <nuxt-link to="/state">State Law</nuxt-link>
    </div>
    <div class="tw-text-slate-400">
      <a
        href="https://github.com/ManasMadrecha/indianlaw"
        target="_blank"
      >
        <span class="tw-sr-only">Indian Law GitHub</span>
        <atomsAppIcon
          icon="mdiGithub"
          class="tw-w-6 tw-h-6"
        ></atomsAppIcon>
      </a>
      <a
        href="https://instagram.com/ManasMadrecha"
        target="_blank"
      >
        <span class="tw-sr-only">Manas Madrecha Instagram</span>
        <atomsAppIcon
          icon="mdiInstagram"
          class="tw-w-6 tw-h-6"
        ></atomsAppIcon>
      </a>
      <a
        href="https://www.linkedin.com/in/manasmadrecha/"
        target="_blank"
      >
        <span class="tw-sr-only">Manas Madrecha Linkedin</span>
        <atomsAppIcon
          icon="mdiLinkedin"
          class="tw-w-6 tw-h-6"
        ></atomsAppIcon>
      </a>
      <a href="mailto:madrechamanas@gmail.com">
        <span class="tw-sr-only">Manas Madrecha Email</span>
        <atomsAppIcon
          icon="mdiEmail"
          class="tw-w-6 tw-h-6"
        ></atomsAppIcon>
      </a>
    </div>
  </header>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@each $theme-color in $theme-colors {
  .theme-#{$theme-color} {
    .header-container {
      @apply tw-to-#{$theme-color}-50;
    }
  }
}
</style>
