<template>
  <div>
    <div v-if="children.length">

      <div
        v-for="child in children"
        :key="child.path"
      >
        <nuxt-link :to="`/${child.path}`">
          <component :is="child.omit ? 'del' : 'span'">
            <span v-if="child.chapter">Chapter {{child.chapter}} - </span>{{ child.title ? child.title : child.slug }}
          </component>
        </nuxt-link>
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
  },
  data() {
    return {
      children: [],
    };
  },
  async fetch() {
    this.children = await this.$content({ deep: true })
      .without(["body"])
      .where({ $and: [{ dir: this.post.path }, { show: { $ne: false } }] })
      .fetch();
  },
};
</script>

<style lang="scss" scoped>
</style>