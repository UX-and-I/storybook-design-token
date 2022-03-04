import { StorybookDesignTokenPlugin, StorybookDesignTokenPluginWebpack4 } from './plugin';

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export async function webpackFinal(config: any, { presets }: any) {
  const version = await presets.apply('webpackVersion');

  if (version >= 5) {
    config.plugins.push(new StorybookDesignTokenPlugin());
  } else {
    config.plugins.push(new StorybookDesignTokenPluginWebpack4());
  }

  return config;
}
