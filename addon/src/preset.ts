import {
  StorybookDesignTokenPlugin,
  viteStorybookDesignTokenPlugin,
} from "./plugin";

type AddonOptions = {
  designTokenGlob?: string;
  presets: any;
};

export function managerEntries(entry: any[] = []) {
  return [...entry, require.resolve("./manager")];
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
  { designTokenGlob, presets }: AddonOptions
) {
  const version = await presets.apply("webpackVersion");

  if (version >= 5) {
    config.plugins.push(new StorybookDesignTokenPlugin(designTokenGlob));
  } else {
    throw Error(
      "Webpack 4 is not supported by the storybook-design-token addon."
    );
  }

  return config;
}
