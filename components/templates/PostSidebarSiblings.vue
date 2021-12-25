<template>
  <div>
    <div>.</div>
    <ul class="siblings">
      <li
        v-for="sibling in siblings"
        :key="sibling.path"
        class="tw-mb-2 tw-text-sm"
      >
        <nuxt-link
          :to="sibling.path"
          :class="{'nuxt-link-exact-active': $route.path === sibling.path}"
        >
          {{sibling.title ? sibling.title : sibling.slug}}
        </nuxt-link>
        <ul
          v-if="post && post.path === sibling.path && post.toc && post.toc.length"
          class="tw-mt-1 tw-pl-2 tw-text-sm tw-border-b tw-pb-2"
        >
          <li
            v-for="heading in post.toc"
            :key="heading.id"
            class="tw-mb-1"
            :class="{'tw-pl-2': heading.depth === 3, 'tw-pl-4' : heading.depth === 4}"
          >
            <a
              :href="`#${heading.id}`"
              class="hover:tw-text-gray-700"
            >
              {{heading.text}}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    siblings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.siblings {
  a {
    @apply tw-inline-block tw-py-2 tw-px-2 tw-no-underline;
  }
  .nuxt-link-exact-active {
    @apply tw-font-medium;
  }
}

@each $theme-color in $theme-colors {
  .theme-#{$theme-color} {
    .siblings {
      a {
        @apply hover:tw-bg-#{$theme-color}-50;
      }
      .nuxt-link-exact-active {
        @apply tw-text-#{$theme-color}-700 tw-bg-#{$theme-color}-50;
      }
    }
  }
}
</style>

