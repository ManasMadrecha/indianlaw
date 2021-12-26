<template>
  <details
    open
    class="tw-mb-3"
  >
    <summary class="tw-cursor-pointer tw-pt-2 tw-pb-1 tw-sticky tw-top-0 tw-z-10 tw-bg-white">
      <h2 class="tw-font-medium tw-text-center tw-text-sm tw-inline-block">Table of Contents</h2>
    </summary>

    <component
      :is="$route.hash && /#\d/.test($route.hash) ? 'ul' : 'scrollactive'"
      class="tw-mt-3 tw-pl-2 md:tw-border-l tw-text-xs tw-pb-4"
      tag="ul"
      :offset="50"
      :duration="200"
      bezierEasingValue="0.46,0.03,0.52,0.96"
      active-class="active-scroll"
      :modifyUrl="false"
    >
      <li
        v-for="heading in post.toc"
        :key="heading.id"
        class="tw-mb-2"
        :class="{'tw-pl-2': heading.depth === 3, 'tw-pl-4' : heading.depth === 4, 'tw-pl-6' : heading.depth === 5}"
      >
        <a
          :href="`#${heading.id}`"
          class="heading-link scrollactive-item"
        >
          <!-- :class="{'tw-bg-slate-100' : $route.hash === `#${heading.id}`}" -->
          {{heading.text}}
        </a>
      </li>
    </component>

  </details>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    scrollActiveMethod() {
      // KEEP TOC ITEMS IN VIEW (useful if TOC is too huge)
      let tocNavEl = document.getElementsByClassName(
        "toc-section-scrollactivemethod"
      )[0];
      let tocItemEl = document.getElementsByClassName("active-scroll")[0];

      if (tocItemEl && tocNavEl) {
        tocNavEl.scrollTop = tocItemEl.offsetTop - 100;
      }
    },
  },
  mounted() {
    if (this.post.toc.length > 10) {
      window.addEventListener("scroll", this.scrollActiveMethod);
    }
  },
  destroyed() {
    if (this.post.toc.length > 10) {
      window.removeEventListener("scroll", this.scrollActiveMethod);
    }
  },
};
</script>

<style lang="scss" scoped>
.active-scroll {
  @apply tw-bg-slate-100;
}

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