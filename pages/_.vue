<template>
  <article v-if="post">
    <h1
      v-if="post.showtitle !== false"
      class="tw-px-4 tw-text-center tw-text-2xl md:tw-text-4xl tw-leading-relaxed md:tw-mb-6 tw-mb-3"
    >
      {{post.title ? post.title : post.slug}}
    </h1>

    <div
      v-if="post.showtoc !== false && post.toc && post.toc.length > 1"
      class="md:tw-flex tw-flex-row-reverse"
    >
      <section class="toc-section-scrollactivemethod md:tw-w-[20%] tw-shrink-0 md:tw-sticky md:tw-top-10 md:tw-max-h-[90vh] tw-max-h-40 tw-overflow-auto md:tw-px-1 tw-px-2 md:tw-pb-8">
        <templatesPostToc :post="post"></templatesPostToc>
      </section>

      <NuxtContent
        :document="post"
        class="md:tw-pr-4 md:tw-pl-6 tw-px-2"
      >
      </NuxtContent>
    </div>
    <NuxtContent
      v-else
      :document="post"
      class="md:tw-pr-4 md:tw-pl-6 tw-px-2"
    >
    </NuxtContent>

  </article>
</template>

<script>
import PostChildren from "~/components/templates/PostChildren.vue";

export default {
  name: "DynamicPage",
  components: { PostChildren },
  transition: "slide-bottom",
  data() {
    return {
      post: null,
    };
  },
  computed: {
    pathMatch() {
      if (this.$route && this.$route.params && this.$route.params.pathMatch) {
        return this.$route.params.pathMatch.endsWith("/")
          ? this.$route.params.pathMatch
          : `${this.$route.params.pathMatch}/`;
      }
    },
  },
  async fetch() {
    let posts = await this.$content({ deep: true })
      .where({
        path: {
          $regex: [
            this.pathMatch.slice(0, this.pathMatch.length - 1) + "$",
            "gi",
          ],
        },
      })
      .fetch();

    this.post = posts.length ? posts[0] : null;
  },
};
</script>

<style lang="scss" scoped>
.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>

<style lang="scss">
.amend {
  &-ins {
    @apply tw-bg-emerald-100/50;
  }
  &-omit {
    @apply tw-line-through;
    @apply tw-bg-red-100/50;
  }
  &-subs {
    @apply tw-bg-yellow-100/50;
  }
}

.nuxt-content {
  details {
    --spacing: 1rem;
    @apply tw-border;
    summary {
      @apply tw-bg-gradient-to-br tw-from-white;
      @apply tw-px-[var(--spacing)] tw-py-2 tw-cursor-pointer;
      h2,
      h3,
      h4,
      h5,
      h6 {
        @apply tw-text-base tw-my-0 tw-inline-block tw-border-0 tw-pb-0;
      }
    }
  }
  details[open] {
    @apply tw-px-[var(--spacing)];
    summary {
      @apply tw-mb-[var(--spacing)] tw-mx-[calc(var(--spacing)_*_-1)];
    }
  }
}
@each $theme-color in $theme-colors {
  .theme-#{$theme-color} {
    .nuxt-content {
      details {
        summary {
          @apply tw-to-#{$theme-color}-50 marker:tw-text-#{$theme-color}-700;
        }
      }
    }
  }
}
</style>

