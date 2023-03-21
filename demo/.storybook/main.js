/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['storybook-design-token', '@storybook/addon-essentials'],
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  core: {
    // builder: '@storybook/builder-vite',
    disableTelemetry: true
  }
};
export default config;
