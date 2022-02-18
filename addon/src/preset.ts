import { readFileSync } from 'fs';
import glob from 'glob';

function defineStorybookDesignTokens(webpackConfig: any, configDir: string) {
  const tokenFiles = [] as { filename: string; content: string }[];

  const matches = glob.sync(`${configDir}/../**/*.{css,less,scss,svg}`, {
    ignore: 'node_modules'
  });

  for (const match of matches) {
    const file = readFileSync(match).toString();
    const isTokenFile = match.endsWith('.svg') || file.includes('@tokens');

    if (isTokenFile) {
      tokenFiles.push({ filename: match, content: file });
    }
  }

  const definePlugin = webpackConfig.plugins.find(
    ({ constructor }: any) => constructor && constructor.name === 'DefinePlugin'
  );

  if (definePlugin) {
    definePlugin.definitions = {
      ...definePlugin.definitions,
      'process.env': {
        ...(definePlugin.definitions['process.env'] || {}),
        STORYBOOK_DESIGN_TOKEN: JSON.stringify(tokenFiles)
      }
    };
  }

  return webpackConfig;
}

export function managerEntries(entry = []) {
  return [...entry, require.resolve('./register')];
}

export async function managerWebpack(config: any, { configDir }: any) {
  return defineStorybookDesignTokens(config, configDir);
}

export async function webpackFinal(config: any, { configDir }: any) {
  return defineStorybookDesignTokens(config, configDir);
}
