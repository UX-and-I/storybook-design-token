import { readFileSync } from 'fs';
import glob from 'glob';
import path from 'path';

function getTokenFilePaths(compiler: any): string[] {
  return glob.sync(
    path.join(
      compiler.context,
      process.env.DESIGN_TOKEN_GLOB || '**/*.{css,scss,less,svg}'
    )
  );
}

function addFilesToWebpackDeps(compilation: any, files: string[]) {
  compilation.fileDependencies = [...compilation.fileDependencies, ...files];
}

function generateTokenFilesJsonString(files: string[]): string {
  const tokenFiles = files
    .map((path) => ({
      filename: path,
      content: readFileSync(path, 'utf-8')
    }))
    .filter(
      (file) =>
        file.content.includes('@tokens') || file.filename.endsWith('.svg')
    );

  // TODO: move parsing from React components to here

  return JSON.stringify(tokenFiles);
}

export class StorybookDesignTokenPluginWebpack4 {
  public apply(compiler: any) {
    compiler.hooks.emit.tap(
      'StorybookDesignTokenPlugin',
      (compilation: any) => {
        const files = getTokenFilePaths(compiler);

        addFilesToWebpackDeps(compilation, files);

        const sourceString = generateTokenFilesJsonString(files);

        compilation.assets['design-tokens.source.json'] = {
          source: () => {
            return sourceString;
          },
          size: () => {
            return sourceString.length;
          }
        };

        return true;
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
            (compilationAssets: any, callback: any) => {
              const sourceString = generateTokenFilesJsonString(files);

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
