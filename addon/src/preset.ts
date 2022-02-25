import { StorybookDesignTokenPlugin } from './plugin';

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export async function webpackFinal(config: any) {
  config.plugins.push(new StorybookDesignTokenPlugin());

  return config;
}
