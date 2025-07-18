import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import glob from "glob";
import path from "path";

import { parsePngFiles } from "./parsers/image.parser";
import { parseCssFiles } from "./parsers/postcss.parser";
import { parseSvgFiles } from "./parsers/svg-icon.parser";
import { TokenSourceType } from "./types/token.types";

function getTokenFilePaths(context: any, designTokenGlob?: string): string[] {
  const pattern = path
    .join(
      context,
      designTokenGlob ||
        process.env.DESIGN_TOKEN_GLOB ||
        "**/*.{css,scss,less,svg,png,jpeg,gif}"
    )
    .replace(/\\/g, "/");

  return glob.sync(pattern, {
    ignore: ["**/node_modules/**", "**/storybook-static/**", "**/*.chunk.*"],
  });
}

function addFilesToWebpackDeps(compilation: any, files: string[]) {
  compilation.fileDependencies.addAll(files);
}

async function generateTokenFilesJsonString(files: string[]): Promise<string> {
  const tokenFiles = files
    .map((path) => ({
      filename: path,
      content: readFileSync(path, "utf-8"),
    }))
    .filter(
      (file) =>
        file.content.includes("@tokens") ||
        file.filename.endsWith(".svg") ||
        isImageExtension(file.filename)
    );

  const cssTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith(".css")),
    TokenSourceType.CSS,
    true
  );

  const scssTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith(".scss")),
    TokenSourceType.SCSS,
    true
  );

  const lessTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith(".less")),
    TokenSourceType.LESS,
    true
  );

  const svgTokens = await parseSvgFiles(
    tokenFiles.filter((file) => file.filename.endsWith(".svg"))
  );

  const imageTokens = await parsePngFiles(
    tokenFiles.filter((file) => isImageExtension(file.filename))
  );

  return JSON.stringify({
    cssTokens,
    scssTokens,
    lessTokens,
    svgTokens,
    imageTokens,
  });
}

export class StorybookDesignTokenPlugin {
  constructor(private designTokenGlob?: string) {}

  public apply(compiler: any) {
    compiler.hooks.initialize.tap("StorybookDesignTokenPlugin", () => {
      const files = getTokenFilePaths(compiler.context, this.designTokenGlob);

      compiler.hooks.emit.tap(
        "StorybookDesignTokenPlugin",
        (compilation: any) => {
          addFilesToWebpackDeps(compilation, files);
        }
      );

      compiler.hooks.thisCompilation.tap(
        "StorybookDesignTokenPlugin",
        (compilation: any) => {
          compilation.hooks.processAssets.tapAsync(
            {
              name: "HtmlWebpackPlugin",
              stage:
                compiler.webpack.Compilation
                  .PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE,
            },
            async (compilationAssets: any, callback: any) => {
              const sourceString = await generateTokenFilesJsonString(files);

              compilationAssets["design-tokens.source.json"] = {
                source: () => {
                  return sourceString;
                },
                size: () => {
                  return sourceString.length;
                },
              };

              callback();
            }
          );
        }
      );
    });
  }
}

export function viteStorybookDesignTokenPlugin(options: any) {
  let publicDir: string;
  let rootDir: string;
  let files: string[];

  return {
    name: "vite-storybook-design-token-plugin",
    configResolved(resolvedConfig: any) {
      publicDir = resolvedConfig.publicDir;
      rootDir = resolvedConfig.root;
    },
    transform: async function () {
      if (!publicDir) {
        return;
      }

      files = getTokenFilePaths("./", options?.designTokenGlob).map(
        (file) => `./${file}`
      );

      const sourceString = await generateTokenFilesJsonString(files);

      if (!existsSync(publicDir)) {
        mkdirSync(publicDir);
      }

      writeFileSync(
        path.join(publicDir, "design-tokens.source.json"),
        sourceString
      );
    },
  } as any;
}

function isImageExtension(filename: string) {
  return (
    filename.endsWith(".jpeg") ||
    filename.endsWith(".png") ||
    filename.endsWith(".gif")
  );
}
