<template>
  <div
    class="tw-text-gray-800 tw-font-['Quicksand',_'Segoe_UI']"
    :class="`theme-${themeColorIs}`"
  >

    <templatesTheHeader></templatesTheHeader>

    <div class="tw-sticky tw-top-0 tw-z-10 tw-bg-white tw-flex tw-justify-between tw-items-center tw-gap-2 tw-border-b tw-py-2">
      <div>
        <button @click="showAside = !showAside">🧾</button>
      </div>

      <templatesPostBreadcrumbs
        :pathMatch="pathMatch"
        v-if=" pathMatch"
      ></templatesPostBreadcrumbs>

      <div>
        <select
          v-model="themeColorIs"
          class="tw-border tw-border-blue-300"
        >
          <option
            v-for="color in themeColors"
            :key="color"
            :value="color"
            class="tw-capitalize"
          >{{color}}</option>
        </select>
      </div>
    </div>

    <div
      class="tw-grid tw-grid-cols-5"
      style="scroll-behavior: smooth;"
    >

      <aside class="tw-transform-gpu tw-duration-300 tw-border-r tw-border-gray-300 tw-max-h-[calc(100vh-3rem)] tw-overflow-auto tw-sticky tw-top-8 tw-pb-6">
        <templatesPostSidebarSiblings
          v-if="siblings.length && post"
          :siblings="siblings"
          :post="post"
          :class="showAside ? 'tw-col-span-1' : 'tw-hidden'"
        ></templatesPostSidebarSiblings>
      </aside>

      <main
        class="tw-transform-gpu tw-duration-300 tw-px-4 md:tw-px-8 md:tw-py-8 tw-py-4"
        :class="showAside ? 'tw-col-span-4' : 'tw-col-span-5'"
      >
        <div
          v-if="prev || next"
          class="tw-flex tw-flex-wrap tw-justify-between tw-items-stretch md:tw-mb-6 tw-mb-3"
        >
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
        </div>
        <Nuxt
          keep-alive
          :keep-alive-props="{ max: 10 }"
        ></Nuxt>
      </main>

    </div>
  </div>
</template>

<script>
const Collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: "base",
});

export default {
  name: "DefaultLayout",
  data() {
    return {
      // Theme
      themeColors: [
        "amber",
        "emerald",
        "cyan",
        "sky",
        "purple",
        "pink",
      ],
      themeColorIs: "sky",

      // Sidebar
      showAside: true,

      // Fetch Content
      post: null,
      siblings: [],
      prev: null,
      next: null,
    };
  },
  computed: {
    themeColor() {
      let theme = "pink";
      return (this.themeColorIs = theme);
    },
    pathMatch() {
      if (this.$route && this.$route.params && this.$route.params.pathMatch) {
        return this.$route.params.pathMatch.endsWith("/")
          ? this.$route.params.pathMatch
          : `${this.$route.params.pathMatch}/`;
      }
    },
  },
  beforeMount() {
    window.addEventListener("keydown", this.handleKeydown, null);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    // https://stackoverflow.com/questions/52997529/vue-js-arrowkey-binding-issues
    handleKeydown(e) {
      switch (e.keyCode) {
        case 37: // Left arrow
          if (this.prev) {
            this.$router.push({ path: this.prev.path });
          } else return;
          break;
        case 39: // Right arrow
          if (this.next) {
            this.$router.push({ path: this.next.path });
          } else return;
          break;
      }
    },
    async fetchPost() {
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

      if (this.post) {
        this.siblings = await this.$content({ deep: true })
          .without(["body"])
          .where({
            $and: [
              {
                dir: this.post.dir,
              },
              { show: { $ne: false } },
            ],
          })
          .fetch();

        if (this.siblings.length) {
          this.siblings.sort(function (a, b) {
            return Collator.compare(a.path, b.path);
          });

          // NEIGHBOURS
          const postIndex = this.siblings.findIndex((sibling) => {
            return sibling.path === this.post.path;
          });

          if (postIndex > 0) {
            this.prev = this.siblings.filter((sibling, i) => {
              return i === postIndex - 1;
            });
            this.prev = this.prev && this.prev.length ? this.prev[0] : null;
          } else this.prev = null;

          if (postIndex < this.siblings.length) {
            this.next = this.siblings.filter((sibling, i) => {
              return i === postIndex + 1;
            });
            this.next = this.next && this.next.length ? this.next[0] : null;
          } else this.next = null;
        }
      }
    },
  },
  async fetch() {
    await this.fetchPost();
  },
  watch: {
    pathMatch() {
      this.fetchPost();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>

