module.exports = {
  // mode: 'jit',
  // purge: {
  // enabled: process.env.NODE_ENV === 'production',
  content: [
    `components/**/*.{vue,js}`,
    `layouts/**/*.vue`,
    `pages/**/*.vue`,
    `plugins/**/*.{js,ts}`,
    `nuxt.config.{js,ts}`,
    'content-indianlaw/**/*.md',
  ],
  // },
  theme: {
  },
  variants: {
    extend: {},
  },
  plugins: [],
  prefix: 'tw-',
}
