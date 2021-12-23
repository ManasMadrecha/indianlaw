<template>
  <div class="tw-text-gray-700 tw-font-['Quicksand',_'Segoe_UI']">

    <templatesTheHeader></templatesTheHeader>

    <div class="tw-sticky tw-top-0 tw-z-10 tw-bg-white tw-flex tw-justify-start tw-items-center tw-gap-2 tw-border-b tw-py-2">
      <div>
        <button @click="showAside = !showAside">🧾</button>
      </div>

      <templatesPostBreadcrumbs
        :pathMatch="pathMatch"
        v-if=" pathMatch"
      ></templatesPostBreadcrumbs>
    </div>

    <div class="tw-grid tw-grid-cols-5" style="scroll-behavior: smooth;" >

      <aside class="tw-transform-gpu tw-duration-300 tw-border-r tw-border-gray-300 tw-max-h-[calc(100vh-3rem)] tw-overflow-auto tw-sticky tw-top-8 tw-pb-6">
        <templatesPostSidebarSiblings
          v-if="siblings.length && post"
          :siblings="siblings"
          :post="post"
          :class="showAside ? 'tw-col-span-1' : 'tw-translate-x-[calc(-100%+1px)] tw-hidden'"
        ></templatesPostSidebarSiblings>
      </aside>

      <main
        class="tw-transform-gpu tw-duration-300 md:tw-pr-4 md:tw-pl-8 md:tw-py-8 tw-pr-2 tw-pl-4 tw-py-4"
        :class="showAside ? 'tw-col-span-4' : 'tw-col-span-5'"
      >
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
      showAside: true,
      post: null,
      siblings: [],
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
  methods: {
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
            dir: this.post.dir,
          })
          .fetch();

        this.siblings.sort(function (a, b) {
          return Collator.compare(a.path, b.path);
        });
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

