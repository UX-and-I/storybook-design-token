import { readFileSync } from 'fs';
import glob from 'glob';
import path from 'path';

export class StorybookDesignTokenPlugin {
  public apply(compiler: any) {
    compiler.hooks.emit.tap(
      'StorybookDesignTokenPlugin',
      (compilation: any) => {
        const files = glob.sync(
          path.join(
            compiler.context,
            process.env.DESIGN_TOKEN_GLOB || '**/*.{css,scss,less,svg}'
          )
        );

        compilation.fileDependencies = [
          ...compilation.fileDependencies,
          ...files
        ];

        const tokenFiles = files
          .map((path) => ({
            filename: path,
            content: readFileSync(path, 'utf-8')
          }))
          .filter(
            (file) =>
              file.content.includes('@tokens') || file.filename.endsWith('.svg')
          );

        const sourceString = JSON.stringify(tokenFiles);

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
