import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/preset.ts"],
  splitting: false,
  minify: !options.watch,
  format: ["cjs", "esm"],
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: false,
  platform: "node",
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
}));
