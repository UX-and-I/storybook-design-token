import {
  StorybookDesignTokenPlugin,
  StorybookDesignTokenPluginWebpack4
} from './plugin';

type Options = {
  presets: any;
  preserveCSSVars?: boolean;
};

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export async function webpackFinal(
  config: any,
  { presets, preserveCSSVars }: Options
) {
  const version = await presets.apply('webpackVersion');

  if (version >= 5) {
    config.plugins.push(new StorybookDesignTokenPlugin(preserveCSSVars));
  } else {
    config.plugins.push(
      new StorybookDesignTokenPluginWebpack4(preserveCSSVars)
    );
  }

  return config;
}
