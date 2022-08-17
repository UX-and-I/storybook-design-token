import {
    StorybookDesignTokenPlugin, StorybookDesignTokenPluginWebpack4, viteStorybookDesignTokenPlugin
} from './plugin';

const { mergeConfig } = require('vite');

type Options = {
  designTokenGlob?: string;
  presets: any;
  preserveCSSVars?: boolean;
};

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export function viteFinalFactory(options?: any) {
  return async function viteFinal(config: any) {
    return mergeConfig(config, {
      plugins: [viteStorybookDesignTokenPlugin(options)]
    });
  };
}

export async function webpackFinal(
  config: any,
  { designTokenGlob, presets, preserveCSSVars }: Options
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
