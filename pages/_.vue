<template>
  <div>
    
    <div
      v-if="$fetchState.pending"
      class="tw-my-48 tw-text-xl tw-text-blue-800 tw-bg-pink-50 tw-p-4 tw-text-center tw-font-medium"
    >
      Fetching... 💖 Wait for a few seconds 😊
    </div>
    
    <article v-else>
      <h1 class="tw-text-center tw-text-2xl md:tw-text-4xl tw-leading-relaxed md:tw-mb-6 tw-mb-3">{{post.title ? post.title : post.slug}}</h1>

      <NuxtContent :document="post"></NuxtContent>
    </article>

  </div>
</template>

<script>
import PostChildren from "~/components/templates/PostChildren.vue"

export default {
  name: "DynamicPage",
  components: {PostChildren},
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

    this.post = posts.length ? posts[0] : {};
  },
};
</script>

<style lang="scss" scoped>
</style>




