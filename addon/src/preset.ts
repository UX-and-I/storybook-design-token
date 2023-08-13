import {
  StorybookDesignTokenPlugin,
  StorybookDesignTokenPluginWebpack4,
  viteStorybookDesignTokenPlugin
} from './plugin';

type AddonOptions = {
  designTokenGlob?: string;
  presets: any;
  preserveCSSVars?: boolean;
};

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export function viteFinalFactory(options?: any) {
  const { mergeConfig } = require('vite');
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
    config.plugins.push(
      new StorybookDesignTokenPluginWebpack4(preserveCSSVars, designTokenGlob)
    );
  }

  return config;
}
