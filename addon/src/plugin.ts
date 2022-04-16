import { readFileSync } from 'fs';
import glob from 'glob';
import path from 'path';

import { parseCssFiles } from './parsers/postcss.parser';
import { parseSvgFiles } from './parsers/svg-icon.parser';
import { TokenSourceType } from './types/token.types';

function getTokenFilePaths(compiler: any): string[] {
  return glob.sync(
    path.join(
      compiler.context,
      process.env.DESIGN_TOKEN_GLOB || '**/*.{css,scss,less,svg,png,jpeg}'
    ),
    {
      ignore: ['**/node_modules/**', '**/storybook-static/**', '**/*.chunk.*']
    }
  );
}

function addFilesToWebpackDeps(compilation: any, files: string[]) {
  compilation.fileDependencies = [...compilation.fileDependencies, ...files];
}

async function generateTokenFilesJsonString(files: string[]): Promise<string> {
  const tokenFiles = files
    .map((path) => ({
      filename: path,
      content: readFileSync(path, 'utf-8')
    }))
    .filter(
      (file) =>
        file.content.includes('@tokens') || file.filename.endsWith('.svg') || file.filename.endsWith('.jpeg') || file.filename.endsWith('.png')
    );

  const cssTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.css')),
    TokenSourceType.CSS,
    true
  );

  const scssTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.scss')),
    TokenSourceType.SCSS,
    true
  );

  const lessTokens = await parseCssFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.less')),
    TokenSourceType.LESS,
    true
  );

  const svgTokens = await parseSvgFiles(
    tokenFiles.filter((file) => file.filename.endsWith('.svg'))
  );

  // const pngTokens = await parseSvgFiles(
  //   tokenFiles.filter((file) => file.filename.endsWith('.png'))
  // );

  // const jpgTokens = await parseSvgFiles(
  //   tokenFiles.filter((file) => file.filename.endsWith('.jpeg'))
  // );

  return JSON.stringify({
    cssTokens,
    scssTokens,
    lessTokens,
    svgTokens
  });
}

export class StorybookDesignTokenPluginWebpack4 {
  public apply(compiler: any) {
    compiler.hooks.emit.tapAsync(
      'StorybookDesignTokenPlugin',
      async (compilation: any, callback: any) => {
        const files = getTokenFilePaths(compiler);

        addFilesToWebpackDeps(compilation, files);

        const sourceString = await generateTokenFilesJsonString(files);

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
  public apply(compiler: any) {
    compiler.hooks.initialize.tap('StorybookDesignTokenPlugin', () => {
      const files = getTokenFilePaths(compiler);

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
              const sourceString = await generateTokenFilesJsonString(files);

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
