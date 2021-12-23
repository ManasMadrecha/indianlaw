<template>
  <nav>
    <ul v-if="posts.length" class="tw-max-w-[95vw] tw-overflow-x-auto tw-whitespace-nowrap">
      <li
        v-for="(post, i) in posts"
        :key="post.text"
        class="tw-capitalize tw-inline-block"
      >
        <nuxt-link :to="post.to"
        class="tw-mx-1 tw-border-gray-100 tw-text-sm md:tw-text-lg"
        :class="{'tw-text-gray-400 tw-border-none hover:tw-text-gray-400 hover:tw-no-underline' : i === posts.length - 1}">{{ post.text }}</nuxt-link>
        <span
          class="tw-text-gray-400 tw-text-sm md:tw-text-lg"
          v-if="i < posts.length - 1"
        >⇒&nbsp;
        </span>
      </li>
    </ul>

  </nav>
</template>

<script>
export default {
  props: {
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