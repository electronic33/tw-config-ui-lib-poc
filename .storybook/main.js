module.exports = {
  stories: ['../packages/**/*.stories.@(tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
};
