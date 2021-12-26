<template>
  <div>
    <div class="tw-my-3 tw-mx-2">
      <input
        type="search"
        v-model="query"
        autofocus
        id="filter-siblings"
        class="filter-siblings-input tw-border focus:tw-border-2 focus:tw-shadow-md tw-w-full tw-py-1 tw-px-2 tw-rounded-md tw-outline-none"
      >
      <div class="tw-text-xs tw-text-slate-400">{{filteredSiblings.length}} / {{siblings.length}}</div>
    </div>
    <ul class="siblings">
      <li
        v-for="sibling in filteredSiblings"
        :key="sibling.path"
        class="tw-mb-2 tw-text-sm"
      >
        <nuxt-link
          :to="sibling.path"
          :class="{'nuxt-link-exact-active': $route.path === sibling.path}"
        >
          {{sibling.title ? sibling.title : sibling.slug}}
        </nuxt-link>
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
  data() {
    return {
      query: "",
    };
  },
  computed: {
    filteredSiblings() {
      if (this.query) {
        let querySplitArr = [];
        querySplitArr = this.query.split(" ");

        return this.siblings.filter((sibling) => {
          let isSlugThere = false;
          let isTitleThere = false;
          let isTitleLowerThere = false;

          return querySplitArr.every((q) => {
            isSlugThere = sibling.slug.toLowerCase().includes(q);

            if (sibling.title) {
              isTitleThere = sibling.title.includes(q);
              isTitleLowerThere = sibling.title.toLowerCase().includes(q);
            }

            return isSlugThere || isTitleThere || isTitleLowerThere;
          });
        });
      } else return this.siblings;
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
    .filter-siblings-input {
      @apply tw-border-#{$theme-color}-200;
    }
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

