import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/preset.ts"],
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
  clean: false,
  platform: "node",
  target: "node20.19",
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
}));
