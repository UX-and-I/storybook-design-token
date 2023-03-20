import {
  StorybookDesignTokenPlugin,
  viteStorybookDesignTokenPlugin
} from './plugin';

const { mergeConfig } = require('vite');

type AddonOptions = {
  designTokenGlob?: string;
  presets: any;
  preserveCSSVars?: boolean;
};

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./manager')];
}

export function viteFinalFactory(options?: any) {
  return async function viteFinal(config: any) {
    return mergeConfig(config, {
      plugins: [viteStorybookDesignTokenPlugin(options)]
    });
  };
}

export const viteFinal = async (
  viteConfig: Record<string, any>,
  options: any
) => {
  viteConfig.plugins = viteConfig.plugins || [];
  viteConfig.plugins.push(viteStorybookDesignTokenPlugin(options));

  return viteConfig;
};

export async function webpackFinal(
  config: any,
  { designTokenGlob, presets, preserveCSSVars }: AddonOptions
) {
  const version = await presets.apply('webpackVersion');

  if (version >= 5) {
    config.plugins.push(
      new StorybookDesignTokenPlugin(preserveCSSVars, designTokenGlob)
    );
  } else {
    throw Error(
      'Webpack 4 is not supported by the storybook-design-token addon.'
    );
  }

  return config;
}
