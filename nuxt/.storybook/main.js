const path = require('path')

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
    "../components/**/story.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  framework: "@storybook/vue3",
  core: {
    "builder": "storybook-builder-vite"
  },
  viteFinal: (config) => {
    // Add alias
    config.resolve.alias = {
      '@/': `${path.resolve(__dirname, '../')}/`
    };

    // Load global SCSS files
    config.css = {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "../assets/scss/main.scss";`
        }
      }
    };

    return config;
  }
}
