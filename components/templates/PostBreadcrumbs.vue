<template>
  <div>
    <div v-if="posts.length">
      <div
        v-for="post in posts"
        :key="post.text"
      >
        <nuxt-link :to="post.to">{{ post.text }}</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    pathMatch: {
      type: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    posts() {
      let breadcrumbs = [];

      let titles = this.pathMatch.split("/");
      titles.pop(); // This removes last item which is falsy --> ''.

      let urls = [...titles]; // Create new array of URLs

      if (urls && urls.length) {
        urls.forEach((url, i) => {
          i > 0
            ? (urls[i] = `${urls[i - 1]}/${urls[i]}`)
            : (urls[0] = `/${urls[0]}`);
        });
      }

      titles.forEach((item, i) => {
        breadcrumbs[i] = [{ text: titles[i], to: urls[i], exact: true }];
      });
      breadcrumbs.unshift([{ text: "🏠", to: "/", exact: true }]);
      breadcrumbs = breadcrumbs.flat(2);
      return breadcrumbs;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>