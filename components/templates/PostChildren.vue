<template>
  <div class="post-children">
    <div
      class="tw-mb-3"
      v-if="$scopedSlots.header"
    >
      <slot name="header"></slot>
    </div>
    <div v-if="children.length">
      <ul
        v-if="childrenGrouped"
        class="!tw-list-none !tw-pl-0"
      >
        <li
          v-for="(groupedArray) in childrenGrouped"
          :key="groupedArray[0].path"
        >
          <details open>
            <summary v-if="group"><span class="tw-capitalize">{{groupby}}</span> {{Object.keys(group).find(item => item == groupedArray[0][groupby])}}</summary>
            <ul>
              <li
                v-for="child in groupedArray"
                :key="child.path"
                class="tw-mb-2"
              >
                <nuxt-link
                  :to="`${child.path}`"
                  class="child-link"
                >
                  <component :is="child.omit ? 'del' : 'span'">
                    {{ child.title ? child.title : child.slug }}
                  </component>
                </nuxt-link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      <ul v-else>
        <li
          v-for="child in children"
          :key="child.path"
          class="tw-mb-3"
        >
          <nuxt-link
            :to="`${child.path}`"
            class="child-link"
          >
            <component :is="child.omit ? 'del' : 'span'">
              <span v-if="child.chapter">Chapter {{child.chapter}} - </span>{{ child.title ? child.title : child.slug }}
            </component>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div
      class="tw-mb-3"
      v-if="$scopedSlots.default"
    >
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script>
const Collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export default {
  props: {
    groupby: {
      type: String,
      required: false,
    },
    group: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      children: [],
      childrenGrouped: null,
    };
  },
  computed: {
    postPath() {
      return this.$route.path.endsWith("/")
        ? this.$route.path.slice(0, -1)
        : this.$route.path;
    },
  },
  async fetch() {
    this.children = await this.$content({ deep: true })
      .without(["body"])
      .where({ $and: [{ dir: this.postPath }, { show: { $ne: false } }] })
      .fetch();

    if (this.children.length) {
      this.children.sort(function (a, b) {
        return Collator.compare(a.path, b.path);
      });
    }
    if (this.groupby) {
      const _groupBy = require("lodash.groupby");
      const groupByProp = this.groupby;

      if (this.group) {
        this.children = this.children.map((child) => {
          child[groupByProp] = child[groupByProp] ? child[groupByProp] : "Na";
          return child;
        });

        this.childrenGrouped = _groupBy(
          this.children,
          (child) => child[groupByProp]
        );

        // console.log(Object.keys(this.childrenGrouped));
        // console.log(this.group);
      } else {
        this.children = this.children.map((child) => {
          child[groupByProp] = child[groupByProp]
            ? String(child[groupByProp])
            : "Na";
          return child;
        });

        this.childrenGrouped = _groupBy(
          this.children,
          (child) => child[groupByProp]
        );

        // this.childrenGrouped.sort((groupedA, groupedB) => {
        //   return Collator.compare(groupedA[0][groupByProp], groupedB[0][groupByProp]);
        // })
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.post-children {
  .child-link {
    @apply tw-no-underline hover:tw-underline;
  }
}
@each $theme-color in $theme-colors {
  .theme-#{$theme-color} {
    .post-children {
      .child-link {
        @apply tw-text-#{$theme-color}-700 hover:tw-text-#{$theme-color}-500;
      }
    }
  }
}
</style>

