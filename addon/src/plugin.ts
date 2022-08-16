import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import glob from 'glob';
import path from 'path';

import { parsePngFiles } from './parsers/image.parser';
import { parseCssFiles } from './parsers/postcss.parser';
import { parseSvgFiles } from './parsers/svg-icon.parser';
import { TokenSourceType } from './types/token.types';

function getTokenFilePaths(context: any): string[] {
  return glob.sync(
    path.join(
      context,
      process.env.DESIGN_TOKEN_GLOB || '**/*.{css,scss,less,svg,png,jpeg,gif}'
    ),
    {
      ignore: ['**/node_modules/**', '**/storybook-static/**', '**/*.chunk.*']
    }
  );
}

function addFilesToWebpackDeps(compilation: any, files: string[]) {
  if ('addAll' in compilation.fileDependencies) {
    // In webpack5, fileDependencies is a LazySet.
    compilation.fileDependencies.addAll(files);
  } else {
    // If webpack4, fileDependencies will be an array
    compilation.fileDependencies = [...compilation.fileDependencies, ...files];
  }
}

async function generateTokenFilesJsonString(
  files: string[],
  preserveCSSVars?: boolean
): Promise<string> {
  const tokenFiles = files
    .map((path) => ({
      filename: path,
      content: readFileSync(path, 'utf-8')
    }))
    .filter(
      (file) =>
        file.content.includes('@tokens') ||
        file.filename.endsWith('.svg') ||
        isImageExtension(file.filename)
    );

  const cssTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.css')),
    TokenSourceType.CSS,
    true,
    preserveCSSVars
  );

  const scssTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.scss')),
    TokenSourceType.SCSS,
    true,
    preserveCSSVars
  );

  const lessTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.less')),
    TokenSourceType.LESS,
    true,
    preserveCSSVars
  );

  const svgTokens = await parseSvgFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.svg'))
  );

  const imageTokens = await parsePngFiles(
    tokenFiles.filter((file) => isImageExtension(file.filename))
  );

  return JSON.stringify({
    cssTokens,
    scssTokens,
    lessTokens,
    svgTokens,
    imageTokens
  });
}

export class StorybookDesignTokenPluginWebpack4 {
  constructor(private preserveCSSVars?: boolean) {}

  public apply(compiler: any) {
    compiler.hooks.emit.tapAsync(
      'StorybookDesignTokenPlugin',
      async (compilation: any, callback: any) => {
        const files = getTokenFilePaths(compiler.context);

        addFilesToWebpackDeps(compilation, files);

        const sourceString = await generateTokenFilesJsonString(
          files,
          this.preserveCSSVars
        );

        compilation.assets['design-tokens.source.json'] = {
          source: () => {
            return sourceString;
          },
          size: () => {
            return sourceString.length;
          }
        };

        callback();
      }
    );
  }
}

export class StorybookDesignTokenPlugin {
  constructor(private preserveCSSVars?: boolean) {}

  public apply(compiler: any) {
    compiler.hooks.initialize.tap('StorybookDesignTokenPlugin', () => {
      const files = getTokenFilePaths(compiler.context);

      compiler.hooks.emit.tap(
        'StorybookDesignTokenPlugin',
        (compilation: any) => {
          addFilesToWebpackDeps(compilation, files);
        }
      );

      compiler.hooks.thisCompilation.tap(
        'StorybookDesignTokenPlugin',
        (compilation: any) => {
          compilation.hooks.processAssets.tapAsync(
            {
              name: 'HtmlWebpackPlugin',
              stage:
                compiler.webpack.Compilation
                  .PROCESS_ASSETS_STAGE_OPTIMIZE_INLINE
            },
            async (compilationAssets: any, callback: any) => {
              const sourceString = await generateTokenFilesJsonString(
                files,
                this.preserveCSSVars
              );

              compilationAssets['design-tokens.source.json'] = {
                source: () => {
                  return sourceString;
                },
                size: () => {
                  return sourceString.length;
                }
              };

              callback();
            }
          );
        }
      );
    });
  }
}

export function viteStorybookDesignTokenPlugin() {
  let publicDir: string;

  return {
    name: 'vite-storybook-design-token-plugin',
    configResolved(resolvedConfig: any) {
      publicDir = resolvedConfig.publicDir;
    },
    buildStart: async function () {
      if (!publicDir) {
        return;
      }

      const watchFiles = this.getWatchFiles();
      const files = getTokenFilePaths('./').map((file) => `./${file}`);

      for (const file of files.filter((f) => !watchFiles.includes(f))) {
        this.addWatchFile(file);
      }

      const sourceString = await generateTokenFilesJsonString(files);

      if (!existsSync(publicDir)) {
        mkdirSync(publicDir);
      }

      writeFileSync(
        path.join(publicDir, 'design-tokens.source.json'),
        sourceString
      );
    }
  } as any;
}

function isImageExtension(filename: string) {
  return (
    filename.endsWith('.jpeg') ||
    filename.endsWith('.png') ||
    filename.endsWith('.gif')
  );
}
