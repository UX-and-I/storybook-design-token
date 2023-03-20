/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-design-token',
    '@storybook/addon-essentials',
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  core: {
    disableTelemetry: true
  }
};
export default config;
