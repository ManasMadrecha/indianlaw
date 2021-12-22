<template>
  <div>
    
    <templatesPostBreadcrumbs
      :pathMatch="pathMatch"
      v-if=" pathMatch"
    ></templatesPostBreadcrumbs>

    <div v-if="post">

      <h1>{{post.title ? post.title : post.slug}}</h1>

      <templatesPostChildren :post="post"></templatesPostChildren>

      <NuxtContent :document="post"></NuxtContent>

    </div>
  </div>
</template>

<script>
export default {
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