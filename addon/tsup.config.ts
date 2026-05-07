import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: [
    "src/index.ts",
    "src/preview.ts",
    "src/manager.ts",
    "src/doc-blocks.ts",
  ],
  splitting: true,
  minify: !options.watch,
  format: ["esm"],
  dts: {
    compilerOptions: {
      ignoreDeprecations: "6.0",
    },
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: "browser",
  external: ["react", "react-dom", "@storybook/icons"],
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
}));
