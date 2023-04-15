import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["./local-preset.ts", "@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // core: {
  //   builder: {
  //     name: "@storybook/builder-webpack5",
  //     options: {
  //       fsCache: true,
  //       lazyCompilation: true,
  //     },
  //   },
  // },
  docs: {
    autodocs: "tag",
  },
};
export default config;
