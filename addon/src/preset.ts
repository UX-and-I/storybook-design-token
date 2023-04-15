import {
  StorybookDesignTokenPlugin,
  viteStorybookDesignTokenPlugin,
} from "./plugin";

const { mergeConfig } = require("vite");

type AddonOptions = {
  designTokenGlob?: string;
  presets: any;
  preserveCSSVars?: boolean;
};

function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve("./manager")];
}

function viteFinalFactory(options?: any) {
  return async function viteFinal(config: any) {
    return mergeConfig(config, {
      plugins: [viteStorybookDesignTokenPlugin(options)],
    });
  };
}

const viteFinal = async (viteConfig: Record<string, any>, options: any) => {
  viteConfig.plugins = viteConfig.plugins || [];
  viteConfig.plugins.push(viteStorybookDesignTokenPlugin(options));

  return viteConfig;
};

async function webpackFinal(
  config: any,
  { designTokenGlob, presets, preserveCSSVars }: AddonOptions
) {
  const version = await presets.apply("webpackVersion");

  if (version >= 5) {
    config.plugins.push(
      new StorybookDesignTokenPlugin(preserveCSSVars, designTokenGlob)
    );
  } else {
    throw Error(
      "Webpack 4 is not supported by the storybook-design-token addon."
    );
  }

  return config;
}

module.exports = {
  managerEntries,
  viteFinalFactory,
  viteFinal,
  webpackFinal,
};
